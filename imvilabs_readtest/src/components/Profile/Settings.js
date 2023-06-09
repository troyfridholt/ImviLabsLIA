import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import NavbarR from '../NavbarR/NavbarR';
import { Link } from "react-router-dom";
import Firebase from '../../firebase/Firebase';
import { getDoc, doc } from 'firebase/firestore';
const Settings = () => {
    const firebase = new Firebase();
    const [activeButton, setActiveButton] = useState("Profil");
    const [successText, showSuccessText] = useState(false)
    const { uid } = useParams()
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const db = firebase.db

    useEffect(() => {
      async function getUserInfo() {
        const docRef = doc(db, 'users', uid, 'userinfo', 'info');
        const userDocSnapshot = await getDoc(docRef);
        if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data();
          setName(data.name);
          setAge(data.age);
          setEmail(data.email);
        } else {
        }
      }

  
      getUserInfo();
    }, [uid]);

    const resetPassword = () => {
        firebase.resetPassword(email)
        showSuccessText(true)
    }



  return (
    <div>
     <NavbarR email={email} uid={uid} name={name} age={age} />
     <div className='settings-container'>
        <div className='settings-container-header'>
        <h2>Kontoinformation</h2>
        <p>Granska eller redigera kontoinformation</p>
        </div>

        <div className='settings-div'>
            <div className='settings-div-header'>
                <button 
                className={activeButton === "Profil" ? "active" : ""}
                onClick={() => setActiveButton("Profil")}
                >Profil</button>
                <button 
                className={activeButton === "Lösenord" ? "active" : ""}
                onClick={() => setActiveButton("Lösenord")}
                >Lösenord</button>
            </div>
        
            {activeButton === "Profil" ? (
            <div className='settings-div-content'>
                <div className='content'>
                    <label htmlFor="">Namn</label>
                    <h3>{name}</h3>       
                </div>
                <div className='content'>
                    <label htmlFor="">E-post</label>
                    <h3>{email}</h3>       
                </div>
                <div className='content'>
                    <label htmlFor="">Ålder</label>
                    <h3>{age}</h3>       
                </div>
            </div>
            ) : (
            <div className='settings-div-content2'>
                <div className='content'>
                <div className="settings-input-div">
                    <h2 className={successText ? "" : "hidden"} style={{color: "green", marginBottom: "2%", fontSize: "14px"}}>Ett mail med instruktioner för att återställa lösenord har skickats.</h2>
                    <h2>Återställ lösenord</h2>
              <input
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                type="email"
                value={email}
                disabled
              />
              <button className="settings-button" type="button" onClick={() => resetPassword()}>
                Skicka
              </button>
            </div>
                </div>
            </div>
            )}
            <div className='settings-buttons-div'>
            <Link className='settings-button2' to={`/profile/${uid}`}>Spara</Link>
            </div>
            
        

     </div>
    </div>
    </div>
  )
}

export default Settings
