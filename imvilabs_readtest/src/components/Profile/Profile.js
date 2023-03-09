import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebase from '../../firebase/Firebase'; 
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState('');
  const [results, setResults] = useState([]);

  const db = getFirestore(firebase);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleSearch = async () => {
    const q = query(collection(db, 'users', user, 'results'));
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });
    setResults(res);
  };

  return (
    <div>
      <input type="text" value={user} onChange={handleUserChange} />
      <button onClick={handleSearch}>Search</button>
      {results.map((result, index) => (
        <div key={index}>
          <p>Level: {result.level}</p>
          <p>Date: {result.date}</p>
          <p>WPM: {result.wpm}</p>
          <p>Amount of right questions: {result.amountOfRightQuestions}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
