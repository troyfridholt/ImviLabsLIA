import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [results, setResults] = useState([]);
    const [selectedFuture, setSelectedFuture] = useState('');
    const [sortBy, setSortBy] = useState('level');

    useEffect(() => {
        fetchResults()
    }, []);

    const fetchResults = async () => {
        try {
            const response = await fetch('https://your-api-url.com/results');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleFutureChange = event => {
        setSelectedFuture(event.target.value);
    }

    const handleSortChange = event => {
        setSortBy(event.target.value);
    }

    const filteredResults = results.filter(result => {
        return result.future === selectedFuture || selectedFuture === '';
    });

    const sortedResults = filteredResults.sort((a, b) => {
        if (sortBy === 'level') {
            return a.level - b.level;
        } else {
            return a.age - b.age;
        }
    });
    const handleFilter = () => {
        setResults(results.filter(result => result.level === selectedFuture));
    }
    

    return (
        <div className="profile-container">
            <h1>Dina resultat</h1>
            <div className="filter-container">
                <label>Välj nivå:</label>
                <select value={selectedFuture} onChange={handleFutureChange}>
                    <option value="">Alla</option>
                    <option value="level1">Level 1</option>
                    <option value="level2">Level 2</option>
                    <option value="level3">Level 3</option>
                    <option value="level4">Level 4</option>
                    <option value="level5">Level 5</option>
                </select>
            
                <label>Sortera efter:</label>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="level">Nivå</option>
                </select>
                <button onClick={handleFilter}>Sök</button>
            </div>
            

            <div className="results-container">
                {results.length === 0 ? <p>Inga resultat att visa</p> :
                  sortedResults.map((result, index) => (
                    <div key={index} className="result-item">
                        <h2>{result.name}</h2>
                        <p>Nivå: {result.level}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
