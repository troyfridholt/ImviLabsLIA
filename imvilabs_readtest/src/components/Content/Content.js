// Content.js
import React, { useState } from 'react';
import axios from 'axios';
import './Content.css';

function Content() {

  //States för level och text.
  const [level, setLevel] = useState(1);
  const [text, setText] = useState('');

  //States för start och sluttid samt "WPM" för att kunna räkna ut wpm.
  const [wpm, setWpm] = useState(0);



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

  //State för att reseta allting ifall användaren vill börja om testet
  const handleRestartClick = () => {
    //Gör så att man kan klicka på startknappen igen när man klickat på starta om test
    document.querySelector(".start-button").disabled = false
    setIsStarted(false);
    setHasSubmitedQuestions(false);
    setWpm(0);
    setAmountOfRightQuestions(0);
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
        const response = await axios.get(`http://localhost:3001/stop-timer?level=${level}`);
        console.log(response.data)
        setWpm(response.data.wpm);
    } catch (error) {
      console.error(error);
    }
  };

    //När man klickar start knappen skickas en request till servern med "level" som parameter och sätter text och questions statesen från vad som hämats från servern/databasen.
    const handleStartClick = async () => {
        setIsStopped(false);
        setIsStarted(true);
        handleStartTimer();
        try {
          const response = await axios.get(`http://localhost:3001/text?level=${level}`);
          setText(response.data.text);
          setQuestions(response.data.questions);
        } catch (error) {
          console.log(error);
        }
      };
    
      //Sätter staten isStopped till true för att kunna veta att användaren har klickat på stopp så vi kan ändra deras html och rendera ny html kod som displayar frågor iställer för texten
      //Sätter IsStarted till false för att ändra stoppknappen till en startknapp igen.
      //Sätter endTime till new Date så att vi kan räkna ut wpm med start och endTime. Sedan sätter vi variablen wpm med SetWpm till användaren wpm
      const handleStopClick = async () => {
        setIsStopped(true);
        setIsStarted(false);
        handleStopTimer();
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
        await axios.post('http://localhost:3001/submitQuestions', { level: level, answers })
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
              //Gör så att man inte kan klicka på startknappen igen när man gjort färdigt testet
              document.querySelector(".start-button").disabled = true
              //Sätter staten antal rätt frågor till uträkningen av antal rätt frågor i %
              setAmountOfRightQuestions(percentageCorrect);
              //Sätter isStopped till false för att kunna visa wpm/antal rätt frågor i min reading-box div
              setIsStopped(false);
              //Sätter has submitted questions till true för att visa min div med wpm etc..
              setHasSubmitedQuestions(true)
            });
        }   catch (error) {
            console.log(error);
        }
    };


  //Hanterar när man ändrar level så kan level parametern skickas till servern
  const handleLevelChange = event => {
    setLevel(event.target.value);
  };




  return (

    <div className="container">
      <div className="level-selector">
        <label>Nivå:</label>
        <select value={level} onChange={handleLevelChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>

        
        {!isStarted ? (<button className='start-button' onClick={handleStartClick}>Start</button>
        )
        
        : (
        <button className='stop-button' onClick={handleStopClick}>Stop</button>
        )}
      </div>


      {isStopped ? (
        <form className='reading-box' onSubmit={handleFormSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="questions">
            <p>{question.prompt}</p>
            {question.options.map((option, i) => (
              <div key={i} className="questionsRadioAndLabel">
                <input required type="radio" id={`option-${i}`} name={`question-${index}`} value={option} />
                <label for={`option-${i}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button className='submitQuestions' type="submit">Submit</button>
      </form>
      ) 
      :
      <div className='reading-box'>

      {isStarted ? (
        <div>
          <p>{text}</p>
        </div>
      ) 
      
      : (
        <p>Click start to begin the reading test</p>
      )}
    {hasSubmitedQuestions ? (
                <div className='reading-box'>
                    <p>Ord per minut: {wpm}</p>
                    <p>Noggranhet på frågor: {amountOfRightQuestions}%</p>
                    <button className='restart-button' onClick={handleRestartClick}>Restart Test</button>
                </div>
            ) : null}
    </div>
      }
    </div>
    );
  }

    
  
 

export default Content;
