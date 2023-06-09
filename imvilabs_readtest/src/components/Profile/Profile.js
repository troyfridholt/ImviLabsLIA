import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc, } from 'firebase/firestore';
import Firebase from '../../firebase/Firebase'; 
import { useParams } from 'react-router-dom';
import './Profile.css';
import NavbarR from '../NavbarR/NavbarR';
import sortIcon from '../../Images/sort-solid.svg'
import { useNavigate } from 'react-router-dom';
import MyLineChart from './LineChart.js'
import useVerifyEmailRedirect from '../Content/useVerifyEmailRedirect';
const firebase = new Firebase();
const db = firebase.db

function Profile() {
  const navigate = useNavigate();
  const { uid } = useParams()
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [results, setResults] = useState([]);
  const [level,setLevel] = useState("level1")
  const [ageRange, setAgeRange] = useState("7-12")
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false)
  const [language, setLanguage] = useState("SV")
  const [showContent, setShowContent] = useState(false);

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();

  //State to sort by date
  const [sortDirectionDate, setSortDirectionDate] = useState("desc");

  //State to sort by wpm
  const [sortDirectionWpm, setSortDirectionWpm] = useState("desc"); 
  
  //State to sort by Comprehension
  const [sortDirectionComprehension, setSortDirectionComprehension] = useState("desc");

  //State to sort by level'
  const [levelFilter, setLevelFilter] = useState("All");
  

    //Sort by date function
    const handleSortByDate = () => {
        const sortedResults = [...results].sort((a, b) => {
          return sortDirectionDate === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
        });
        setResults(sortedResults);
        setSortDirectionDate(sortDirectionDate === "asc" ? "desc" : "asc");
      };


   //Sort by WPM
   const handleSortByWpm = () => {
    setSortDirectionWpm(sortDirectionWpm === "desc" ? "asc" : "desc");
    setResults(prevResults => prevResults.sort((a, b) => sortDirectionWpm === "desc" ? b.wpm - a.wpm : a.wpm - b.wpm));
   };   


    //Sort by comprehension
    const handleSortByComprehension = () => {
    setSortDirectionComprehension(sortDirectionComprehension === "desc" ? "asc" : "desc");
    setResults(prevResults => prevResults.sort((a, b) => sortDirectionComprehension === "desc" ? b.amountOfRightQuestions - a.amountOfRightQuestions : a.amountOfRightQuestions - b.amountOfRightQuestions));
    };   


    //Sort by Level
    function handleLevelFilterChange(event) {
        setLevelFilter(event.target.value);
      }


      useEffect(() => {
        const filterByLevel = async () => {
          let choosenLevel = "";
          switch(levelFilter){
      
            case "Alla":
                choosenLevel = "all"
                break;
            
            case "Lätt":
                choosenLevel = "level1"
                break;  
                
            case "Medel":
                choosenLevel = "level2"
                break; 
      
            case "Svår":
                choosenLevel = "level3"
                break; 
          }
          const userDocRef = doc(db, "users", uid);
          const resultsColRef = collection(userDocRef, "results");
          const resultsSnapshot = await getDocs(resultsColRef);
          const results = [];
          setResults([])
      
          if(choosenLevel === "all"){
            resultsSnapshot.forEach((doc) => {
                const { amountOfRightQuestions, date, level, wpm } = doc.data();
                const levelStr = level === "level1" ? "Lätt" : level === "level2" ? "Medel" : "Svår";
                results.push({ amountOfRightQuestions, date, level: levelStr, wpm });
              });
              setResults(results)
          }
      
          if (choosenLevel !== "all") {
            resultsSnapshot.forEach((doc) => {
              const { amountOfRightQuestions, date, level, wpm } = doc.data();
              if (choosenLevel === level) {
                const levelStr = level === "level1" ? "Lätt" : level === "level2" ? "Medel" : "Svår";
                  results.push({ amountOfRightQuestions, date, level: levelStr, wpm });
                }
               });
               setResults(results)
          }
      
        };  
          
        filterByLevel();
      }, [levelFilter]);


      useEffect(() => {
        async function getUserInfo() {
          try {
            const { name, age, email, id } = await firebase.getUserDetails(uid);
            setName(name);
            setAge(age);
            setEmail(email)
            let ageRange;
            switch (true) {
              case age >= 0 && age <= 12:
                ageRange = "7-12";
                break;
              case age >= 13 && age <= 16:
                ageRange = "13-16";
                break;
              case age >= 17 && age <= 21:
                ageRange = "17-21";
                break;
              case age >= 22:
                ageRange = "22+";
                break;
              default:
                ageRange = "22+";
                break;
            }
            setAgeRange(ageRange)
          } catch (error) {
            console.error("Error getting user info:", error);
          }
        }
      
        if (db && uid) {
          getUserInfo();
        }
      }, [db, uid]);
      

  useEffect(() => {
    async function getResults() {
      // Create document for the user with the specified email
      const userDocRef = doc(db, "users", uid);
  
      // Check if the user document already exists in the "users" collection
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        console.log("No results found.")
      } else {
  
        // Find the number of existing test documents
        const resultsColRef = collection(userDocRef, "results");
        const resultsSnapshot = await getDocs(resultsColRef);
        const numTestDocs = resultsSnapshot.docs.length;
  
        // Return each test amountOfRightQuestions, date, level, wpm
        const results = [];
        resultsSnapshot.forEach((doc) => {
          const { amountOfRightQuestions, date, level, wpm } = doc.data();
          const levelStr = level === "level1" ? "Lätt" : level === "level2" ? "Medel" : "Svår";
          results.push({ amountOfRightQuestions, date, level: levelStr, wpm });
        });
  
        // Sort results array in reverse chronological order based on the date property
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        setResults(results);
      }
    }
  
    getResults();
  }, [db, uid]);


  useEffect(() => {
    // Introduce a delay of 0.5 seconds before showing the content
    const delay = 300; // milliseconds
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, delay);
  
    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);


  const handleStartClick = () => {
    navigate("/", {
    })
  };


  return (
    <div>
      <NavbarR email={email} uid={uid} name={name} age={age} />
  
      {showContent && (
          <div className="profile-container">
            <div className='profile-child-container'>
              <div className="profile-info-container">
                <h2 className="profile-header">{language === "SV" ? `Hej ${name}!👋` : `Hello ${name}!👋`}</h2>
                <p className='profile-message'>{language === "SV" ? `Välkommen! Är du redo att testa din läsförståelse?` : `Welcome! Are you ready to test your reading comprehension?`}</p>
                <button className='start-button2' onClick={() => handleStartClick()}>{language === "SV" ? `Ta ett test!` : `Take a test!`}</button>
              </div>
  
              <div className='chart-container'>
                <MyLineChart results={results}/>
              </div>
  
              <div className='profile-results-container'>
                <div className="profile-subheaders">
                  <h2 className='subheader' onClick={handleSortByDate}>{language === "SV" ? "Datum" : "Date"}<img className='sortIcon' src={sortIcon} alt="" /></h2>
                  <h2 className='subheader' onClick={handleSortByWpm}>{language === "SV" ? "Läshastighet" : "Readingspeed"}<img className='sortIcon' src={sortIcon} alt="" /></h2>
                  <h2 className='subheader' onClick={handleSortByComprehension}>{language === "SV" ? "Läsförståelse" : "Reading comprehension"}<img className='sortIcon' src={sortIcon} alt="" /></h2>
                  <select className='select-subheader' title='testSelect' value={levelFilter} onChange={handleLevelFilterChange}>
                    <option value="Alla">{language === "SV" ? "Alla" : "All"}</option>
                    <option value="Lätt">{language === "SV" ? "Lätt" : "Easy"}</option>
                    <option value="Medel">{language === "SV" ? "Medel" : "Medium"}</option>
                    <option value="Svår">{language === "SV" ? "Svår" : "Hard"}</option>
                  </select>
                </div>
  
                <div className="profile-results-div">
                  {results.length > 0 ? (
                    results.map((result, index) => (
                      <div key={index} className="profile-result">
                        <h3 style={{fontWeight: 500}} className="profile-result-info">{result.date}</h3>
                        <h3 className="profile-result-info wpm">{result.wpm} <span>wpm</span></h3>
                        <h3 className="profile-result-info amountOfRightQuestions">{result.amountOfRightQuestions}% <span>{language === "SV" ? "rätt" : "correct"}</span></h3>
                        <h3 style={{fontWeight: 500, backgroundColor: result.level === 'Lätt' ? '#DFF7E8' : result.level === 'Medel' ? '#FFF7DD' : '#ECDADA'}} className="profile-result-info">{result.level}</h3>
                      </div>
                    ))
                  ) : (
                    <h1 className='emptyText'>{language === "SV" ? "Här var det tomt." : "Here it was empty"}</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
  
}

export default Profile