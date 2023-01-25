// Content.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';
import 'animate.css';

function Content() {

  //State för att se ifall vi kan fråga efter kundens kontakt uppgifter (Ifall kunden är över 16 år)
  const [validToSaveContactInfo, setValidToSaveContactInfo] = useState(false);
  //State för att visa ett formulär ifall användaren vill spara sitt resultat
  const [showForm, setShowForm] = useState(false);

  //States för level och text.
  const [level, setLevel] = useState(0);
  const [age, setAge] = useState(0);
  const [text, setText] = useState('');

  //States för start och sluttid samt "WPM" för att kunna räkna ut wpm.
  const [wpm, setWpm] = useState(0);

  //State för namn,email,efternamn
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');

  //Fråga användare svarar på vid start
  const [introQuestionsDone, setIntroQuestionsDone] = useState(false)

  //State för frågor där det skall komma in frågor som en array
  const [questions, setQuestions] = useState([]);

  //Används för att när man klickar på startknappen så ändaras det till en stoppknapp.
  const [isStarted, setIsStarted] = useState(false);

  //State för att ändra antalrätt på frågor
  const [amountOfRightQuestions, setAmountOfRightQuestions] = useState(0);

  //Används för att rendera frågor ifall isStopped = true och text ifall isStopped = false
  const [isStopped, setIsStopped] = useState(false);

  //State för att se ifall användaren har submitat vårat question form
  const [hasSubmitedQuestions, setHasSubmitedQuestions] = useState(false);

  //State för att kunna lagra användarens alternativ vid intro frågorna för testet
  const [selectedAnswer, setSelectedAnswer] = useState('JAG GÖR TESTET SJÄLV');
  //State för att visa info varför vi behöver åldern när man har musen på ålder input
  const [showInfo, setShowInfo] = useState(false);

  //State för rolig faktiga efter testet
  const [funStatistics, setFunStatistics] = useState("");

  //State för average wpm
  const [averageWpm, setAverageWpm] = useState("");

  //State för att visa hur många ord av det dem läser som de förstår
  const [wpmComprehended, setwpmComprehended] = useState("")

  //State för att ha en counter innan testet börjar
  const [countdown, setCountdown] = useState(3);
  const [resetTimer, setResetTimer] = useState(true);



  //State för att reseta allting ifall användaren vill börja om testet
  const handleRestartClick = () => {
    setIsStarted(false);
    setHasSubmitedQuestions(false);
    setWpm(0);
    setLevel(0)
    setAverageWpm("");
    setFunStatistics("");
    setQuestions([]);
    setAmountOfRightQuestions(0);
    setIntroQuestionsDone(true)
    setValidToSaveContactInfo(false);
    setShowForm(false);
    setResetTimer(true);
  }

//skickar request till severn som startar tiden
const handleStartTimer = async () => {
    try {
      const response = await axios.get('http://localhost:3001/start-timer');
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  
  //skickar request till servern som stoppar tiden och räknar ut wpm samt return wpm
  const handleStopTimer = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/stop-timer?level=${level}&age=${age}`);
        console.log(response.data)
        console.log("age  istop timer" + age)
        setWpm(response.data.wpm);
    } catch (error) {
      console.error(error);
    }
  };

    //När man klickar start knappen skickas en request till servern med "level" som parameter och sätter text och questions statesen från vad som hämats från servern/databasen.
    const handleStartClick = async () => {
      if (level === null || level === 0 || age === null || age === 0) {
        alert("Please enter both level and age before starting.");
        return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/text?level=${level}&age=${age}`);
      setText(response.data.text);
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
        setIsStopped(false);
        setIsStarted(true);
        
      };


      //Till för tidtagaren som räknar ner från 3
      useEffect(() => {
        if(isStarted && countdown > 0 && resetTimer){
          let interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
          }, 1000);
          return () => clearInterval(interval);
        }
        if(countdown === 0){
          handleStartTimer();
          setResetTimer(false);
        }
      }, [isStarted, countdown]);


      //
      const handleIntroAnswerClick = (e) => {
        if (!selectedAnswer) {
          alert("Please select an answer before proceeding.");
          return;
        }
        setSelectedAnswer(e.target.innerText);
        setIntroQuestionsDone(true)
      }


      //Sätter staten isStopped till true för att kunna veta att användaren har klickat på stopp så vi kan ändra deras html och rendera ny html kod som displayar frågor iställer för texten
      //Sätter IsStarted till false för att ändra stoppknappen till en startknapp igen.
      //Sätter endTime till new Date så att vi kan räkna ut wpm med start och endTime. Sedan sätter vi variablen wpm med SetWpm till användaren wpm
      const handleStopClick = async () => {
        setIsStopped(true);
        setIsStarted(false);
        handleStopTimer();
      };

      //Metod för att visa rolig statistik beroende på ålder
      const displayStatistics = async () => {

        try {
          await axios.post('http://localhost:3001/statistics', { wpm: wpm, age: age })
              .then(response => {
                setFunStatistics(response.data.text[1])
                setAverageWpm(response.data.text[0])
              });
          }   catch (error) {
              console.log(error);
          }
      };


  //Metod för att hantera när användaren svarar på frågorna i formuläret den sparar ner svaren från användaren i en array sedan skickar den en post till servern som hämtar rättsvar
  //från databasen med "Level parametern" sedan returnerar servern de rätta svaren och vi jämnför användarens svar med de rätta svaren och räknar ut hur många % rätt användaren hade.  
  const handleFormSubmit = async event => {
    event.preventDefault();
    const answers = {};
    const questionsElements = event.target.elements;
    for (let i = 0; i < questionsElements.length; i++) {
        const question = questionsElements[i];
        if (question.checked) {
            answers[question.name] = question.value;
        }
    }
        try {
        await axios.post('http://localhost:3001/submitQuestions', { level: level, answers, age: age })
            .then(response => {
              const result = response.data.result;
              let amountOfQuestions = Object.keys(result).length;
              let amountCorrect = 0;
              for (const key of Object.keys(result)) {
                if (result[key] === true) {
                  amountCorrect++;
                }
              }
              let percentageCorrect = (amountCorrect / amountOfQuestions) * 100;
              //Sätter staten antal rätt frågor till uträkningen av antal rätt frågor i %
              setwpmComprehended(wpm * (percentageCorrect / 100));
              setAmountOfRightQuestions(Math.round(percentageCorrect));
            
              //Sätter isStopped till false för att kunna visa wpm/antal rätt frågor i min reading-box div
              setIsStopped(false);
              //Sätter has submitted questions till true för att visa min div med wpm etc..
              setHasSubmitedQuestions(true)
              displayStatistics();
            });
        }   catch (error) {
            console.log(error);
        }
    };

    //Funktion som sparar ner email, namn, efternamn. sedan skickar den med namn,efternamn,email,ålder,wpm,antalrättfrågor,nivå till våran backend som sedan ska kunna hantera detta
    //När vi fixat en databas.
    function handleSaveInfoFormSubmit(e) {
      e.preventDefault();
      const data = {
        email: email,
        name: name,
        lastname: lastname,
        wpm: wpm,
        age: age,
        level: level,
        amountOfRightQuestions: amountOfRightQuestions
      }
    
      try{
        axios.post('http://localhost:3001/save-result', data)
        .then(res => {
            console.log(res.data.result)
            handleRestartClick()
        });
    }   catch (error) {
        console.log(error);
    }
};

      //Hanterar när man ändrar level så kan level parametern skickas till servern
      const infoChange = event => {
        if(event.target.placeholder === "Email"){
          setEmail(event.target.value)
        }
        if(event.target.placeholder === "Förnamn"){
          setName(event.target.value)
        }
        if(event.target.placeholder === "Efternamn"){
          setLastName(event.target.value) 
        }
      };


  //Hanterar när man ändrar level så kan level parametern skickas till servern
  const handleLevelChange = event => {
    const min = event.target.min;
    const max = event.target.max;
    let value = parseInt(event.target.value);
    if (value < min) {
      event.target.value = min;
    } else if (value > max) {
      event.target.value = max;
    }
    value = parseInt(event.target.value);
    setLevel(value);
  };

  const handleAgeChange = event => {
    const min = event.target.min;
    const max = event.target.max;
    let value1 = parseInt(event.target.value);
    if (value1 < min) {
      event.target.value = min;
    } else if (value1 > max) {
      event.target.value = max;
    }
    value1 = parseInt(event.target.value);
    setAge(value1);
    if(parseInt(value1) >= 16){
      setValidToSaveContactInfo(true)
    }else{
      setValidToSaveContactInfo(false)
    }
  };



return (
  <div className="container">
        <div className='reading-box'>
          
          {!introQuestionsDone &&
            <div className='intro-questions'>
            <label>Vem är det som gör testet?</label>
            <div class="panel" align="center">
              <p onClick={handleIntroAnswerClick} className={selectedAnswer === 'JAG GÖR TESTET SJÄLV' ? 'selected':''}>JAG GÖR TESTET SJÄLV</p>
              <p onClick={handleIntroAnswerClick} className={selectedAnswer === 'JAG GÖR TESTET TILLSAMMANS MED MITT BARN'? 'selected':''}>JAG GÖR TESTET TILLSAMMANS MED MITT BARN</p>
            </div>
          </div>
          }
          {!isStarted && !isStopped && !hasSubmitedQuestions && introQuestionsDone && 
          <div className="level-selector">
            <div> 
            <input type="number" className='level' min="1" max="5" placeholder="Välj en nivå mellan 1-5" pattern="[0-9]*" required onChange={handleLevelChange}/>
            </div>

            <div className="age-container">
            <input 
              type="number" 
              className='age' 
              value={age === 0 ? `` : age}
              min="1" 
              max="99" 
              placeholder={selectedAnswer === "JAG GÖR TESTET SJÄLV" ? "Ålder" : "Barns ålder"} 
              required 
              pattern="[0-9]*" 
              onChange={handleAgeChange} 
              onMouseOver={() => setShowInfo(true)}
              onMouseOut={() => setShowInfo(false)}
            />
            {showInfo && (
              <div className="info-tooltip">
                <label>Vi behöver veta ålder för att kunna anpassa testet för dig.</label>
              </div>
            )}
          </div>
          <button className='start-button' onClick={handleStartClick}>TA TESTET</button>

    </div>
          }
             
      { isStarted && !isStopped && introQuestionsDone && !hasSubmitedQuestions && countdown > 0 ? (
        <div className='reading-box'>
            <h2 className={`countdown-child${countdown}`}>{countdown}</h2>
        </div>
      ) : isStarted && !isStopped && introQuestionsDone && !hasSubmitedQuestions && countdown === 0 ? (
        <>
          <div className='readingTextDiv'>
            <p className='readingText'>{text}</p>
            <button className='stop-button' onClick={handleStopClick}>STOPP</button>
          </div>
        </>
      ) : null }
       { isStopped && !hasSubmitedQuestions &&
                <form className='question-form' onSubmit={handleFormSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="questions">
                            <p>{question.prompt}</p>
                            {question.options.map((option, i) => (
                                <div key={i} className="questionsRadioAndLabel">
                                    <input required type="radio" id={`option-${i}`} name={`question-${index}`} value={option} />
                                    <label htmlFor={`option-${i}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className='submitQuestions' type="submit">SVARA</button>
                </form>
            }
            { hasSubmitedQuestions && !validToSaveContactInfo &&
          <div className='statisticsDiv'>
              <div className='statisticsContent'>
                  <div className='statisticsRow'>
                      <p className='statisticsValue'>Antal ord per minut: {wpm}</p>
                  </div>
                  <div className='statisticsRow'>
                      <p className='statisticsValue'>{averageWpm}</p>
                  </div>
                  <div className='statisticsRow'>
                  <p className='statisticsValue'>{`Du hade ${Math.round(amountOfRightQuestions)}% rätt på kontrollfrågorna vilket betyder att om du läser ${wpm} ord så förstår du ${Math.round(wpmComprehended)} av de orden`}</p>
                  </div>
                  <div className='statisticsRow'>
                      <p className='statisticsValue'>{funStatistics}</p>
                  </div>
              </div>
              <button className='restart-button' onClick={handleRestartClick}>STARTA OM TEST</button>
        </div>
            }
                {hasSubmitedQuestions && validToSaveContactInfo && !showForm &&
                  <div className='statisticsDiv'>
                    <div className='statisticsContent'>
                      <div className='statisticsRow'>
                        <p className='statisticsValue'>Antal ord per minut: {wpm}</p>
                      </div>
                      <div className='statisticsRow'>
                        <p className='statisticsValue'>{averageWpm}</p>
                      </div>
                      <div className='statisticsRow'>
                        <p className='statisticsValue'>{`Du hade ${Math.round(amountOfRightQuestions)}% rätt på kontrollfrågorna vilket betyder att om du läser ${wpm} ord så förstår du ${Math.round(wpmComprehended)} av de orden`}</p>
                      </div>
                      <div className='statisticsRow'>
                        <p className='statisticsValue'>{funStatistics}</p>
                      </div>
                    </div>
                    <div className='SaveOrRestartButtonsDiv'>
                    <button className='save-result-button first-button' onClick={() => setShowForm(true)}>SPARA RESULTAT?</button>
                    <button className='save-result-button second-button' onClick={handleRestartClick}>STARTA OM TEST</button>
                    </div>
                  </div>
                }

                {hasSubmitedQuestions && validToSaveContactInfo && showForm &&
                <div className='form-container'>
                  <form className='form' onSubmit={handleSaveInfoFormSubmit}>
                  <input type="email" onChange={infoChange} placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                  <input type="text" onChange={infoChange} placeholder="Förnamn" pattern="[a-zA-Z]+" required />
                  <input type="text" onChange={infoChange} placeholder="Efternamn" pattern="[a-zA-Z]+" required />
                    <button type="submit">SPARA</button>
                  </form>
                  <button className='CANCEL-FORM-BUTTON' onClick={handleRestartClick}>AVBRYT</button>
                  </div>
                }
                </div>   
                </div>      

            );
                    
  
  }


export default Content;
