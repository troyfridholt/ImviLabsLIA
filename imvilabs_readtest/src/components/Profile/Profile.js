import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        // hämta resultaten från datakällan
        fetchResults()
    }, []);

    const fetchResults = async () => {
        try {
            // hämta resultaten från datakällan, får vi tillgång till deras firebase?
            const response = await fetch('https://your-api-url.com/results');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profile-container">
            <h1>Dina resultat</h1>
            <div className="results-container">
                {results.length === 0 ? <p>Inga resultat att visa</p> :
                  results.map((result, index) => (
                    <div key={index} className="result-item">
                        <h2>{result.name}</h2>
                        <p>{result.score}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
