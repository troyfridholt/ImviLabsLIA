// Content.js
import React, { useState } from 'react';
import axios from 'axios';
import './Content.css';

function Content() {

  //States för level och text.
  const [level, setLevel] = useState(1);
  const [text, setText] = useState('');

  //States för start och sluttid samt "WPM" för att kunna räkna ut wpm.
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);

  //State för frågor där det skall komma in frågor som en array
  const [questions, setQuestions] = useState([]);
  //Används för att när man klickar på startknappen så ändaras det till en stoppknapp.
  const [isStarted, setIsStarted] = useState(false);

  //Används för att rendera frågor ifall isStopped = true och text ifall isStopped = false
  const [isStopped, setIsStopped] = useState(false);


  //Hanterar när man ändrar level så kan level parametern skickas till servern
  const handleLevelChange = event => {
    setLevel(event.target.value);
  };


  //När man klickar start knappen skickas en request till servern med "level" som parameter och sätter text och questions statesen från vad som hämats från servern/databasen.
  const handleStartClick = async () => {
    setIsStopped(false);
    setIsStarted(true);
    setStartTime(new Date());
    try {
      const response = await axios.get(`http://localhost:3001/text?level=${level}`);
      setText(response.data.text);
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  //Sätter statsen isStopper till true för att kunna veta att användaren har klickat på stopp så vi kan ändra deras html och rendera ny html kod som displayar frågor iställer för texten
  //Sätter IsStarted till false för att ändra stoppknappen till en startknapp igen.
  //Sätter endTime till new Date så att vi kan räkna ut wpm med start och endTime. Sedan sätter vi variablen wpm med SetWpm till användaren wpm
  const handleStopClick = () => {
    setIsStopped(true);
    setIsStarted(false);
    setEndTime(new Date());
    const minutes = (endTime - startTime) / 60000;
    setWpm((text.split(' ').length / minutes).toFixed(2));
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
        <form className='reading-box'>
        {questions.map((question, index) => (
          <div key={index} className="questions">
            <p>{question.prompt}</p>
            {question.options.map((option, i) => (
              <div key={i} className="questionsRadioAndLabel">
                <input type="radio" id={`option-${i}`} name={`question-${index}`} value={option} />
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
    </div>
      }
    </div>
 );
  }


export default Content;
