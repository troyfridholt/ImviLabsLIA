// Content.js
import React, { useState, useEffect } from 'react';
import './Content.css';
import 'animate.css';
import Firebase from '../../firebase/Firebase';
import Server from '../../server';

function Content() {
  const firebase = new Firebase();
  const server = new Server();
  //State för att se ifall vi kan fråga efter kundens kontakt uppgifter (Ifall kunden är över 16 år)
  const [validToSaveContactInfo, setValidToSaveContactInfo] = useState(false);
  //State för att visa ett formulär ifall användaren vill spara sitt resultat
  const [showForm, setShowForm] = useState(false);

  //States för level och text.
  const [level, setLevel] = useState("level1");
  const [age, setAge] = useState(0);
  const [ageRange, setAgeRange] = useState("");
  const [text, setText] = useState('');

  //States för start och sluttid samt "WPM" för att kunna räkna ut wpm.
  const [wpm, setWpm] = useState(0);

  //State för namn,email,efternamn
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');

  //State för att se ifall man är kund.
  const [customer, setCustomer] = useState(false);

  //Fråga användare svarar på vid start
  const [introQuestionsDone, setIntroQuestionsDone] = useState(false)

  //State för frågor där det skall komma in frågor som en array
  const [questions, setQuestions] = useState([]);
  //State för de rätta svaren
  const [correctAnswers, setCorrectAnswers] = useState([]);

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

  const [resetTimer, setResetTimer] = useState(true);

  //State för att visa en text om att användarens resultat har sparats!
  const [formSubmitted, setFormSubmitted] = useState(false);

  //State för att generera ett random nummer för att slumpa text mellan 1-5
  const [randomNr, setRandomNr] = useState(1);

  //State för att reseta allting ifall användaren vill börja om testet
  const handleRestartClick = () => {
    setIsStarted(false);
    setHasSubmitedQuestions(false);
    setWpm(0);
    setLevel("level1")
    setAverageWpm("");
    setFunStatistics("");
    setAgeRange(ageRange);
    setQuestions([]);
    setCorrectAnswers([]);
    setAmountOfRightQuestions(0);
    setIntroQuestionsDone(true)
    setValidToSaveContactInfo(false);
    setShowForm(false);
    setResetTimer(true);
  }

  //Metod för att göra breaklines i funStatistics texten.
  const createMarkup = () => {
    return {__html: funStatistics.replace(/\n+/g, "<br/>")};
  };

  const createMarkupText = () => {
    return { __html: text.replace(/</g, "<br/> <br/>") };
  };

    //skickar request till severn som startar tiden
    const handleStartTimer = () => {
      server.startTimer();
    }
    
    //skickar request till servern som stoppar tiden och räknar ut wpm samt return wpm
    const handleStopTimer = async () => {
      const wpm = await server.stopTimer(level, ageRange, randomNr);
      setWpm(wpm);
    };

    const generateRandomNumber = (callback) => {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      callback(randomNumber);
    };

    const handleStartClick = async () => {
      if (level === null || level === 0 || age === null || age === 0) {
        alert("Please enter both level and age before starting.");
        return;
      } 
      handleStartTimer();
      const randomNr = await new Promise(resolve => generateRandomNumber(resolve));
      //Ifall en kund gör testet så slumpas text (Det blir varierad text) ifall inte kund gör test så blir det en och samma text.
      if (!customer) {
        setRandomNr(randomNr);
      }
      
      const text = await firebase.getText(level, ageRange, ""+randomNr);
      const [answerValues] = [Object.values(await firebase.getCorrectAnswers(level, ageRange, ""+randomNr))];
      const [questionsValues] = [Object.values(await firebase.getQuestions(level, ageRange, ""+randomNr))];
      setText(text);
      setQuestions(questionsValues);
      setCorrectAnswers(answerValues)
      if(parseInt(age) >= 16){
        setValidToSaveContactInfo(true)
      }
      setIsStopped(false);
      setIsStarted(true);
    };
    

    




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
    const response = await server.statistics(wpm,age)
    console.log(response[1])
      setFunStatistics(response[1])
      setAverageWpm(response[0])
  };

  //Metod för att hantera när användaren svarar på frågorna i formuläret den sparar ner svaren från användaren i en array sedan skickar den en post till servern som hämtar rättsvar
  //från databasen med "Level parametern" sedan returnerar servern de rätta svaren och vi jämnför användarens svar med de rätta svaren och räknar ut hur många % rätt användaren hade.  
  const handleFormSubmit = async event => {
    event.preventDefault();
    const answers = [];
    const questionsElements = event.target.elements;
    for (let i = 0; i < questionsElements.length; i++) {
      const question = questionsElements[i];
      if (question.checked) {
          answers.push(question.value);
      }
    }
    let amountOfQuestions = Object.keys(correctAnswers).length;
    let amountCorrect = 0;
    for (let i = 0; i < amountOfQuestions; i++) {
      if (correctAnswers.includes(answers[i])) {
          amountCorrect++;
      } else {
      }
    }
    let percentageCorrect = (amountCorrect / amountOfQuestions) * 100;
    setwpmComprehended(wpm * (percentageCorrect / 100));
    setAmountOfRightQuestions(Math.round(percentageCorrect));
    setIsStopped(false);
    setHasSubmitedQuestions(true)
    displayStatistics();
};

    //Funktion som sparar ner email, namn, efternamn. sedan skickar den med namn,efternamn,email,ålder,wpm,antalrättfrågor,nivå till våran backend som sedan ska kunna hantera detta
    //När vi fixat en databas.
      function handleSaveInfoFormSubmit(e) {
        e.preventDefault();
        firebase.saveResult(email, name, lastname, wpm, age, level, amountOfRightQuestions);
        setFormSubmitted(true)
        handleRestartClick();
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

      const handleLevelChange = (event) => {
        const value = parseInt(event.target.value);
        console.log(value)
        if (value === 1) {
          setLevel("level1");
        } else if (value === 2) {
          setLevel("level2");
        } else if (value === 3) {
          setLevel("level3");
        }
        setFormSubmitted(false);
      };

  const handleAgeChange = event => {
    const min = event.target.min;
    const max = event.target.max;
    let value = parseInt(event.target.value);
    if (value < min) {
      event.target.value = min;
    } else if (value > max) {
      event.target.value = max;
    }
    value = parseInt(event.target.value);
    if (value >= 16) {
      setValidToSaveContactInfo(true);
    } else {
      setValidToSaveContactInfo(false);
    }
  
    let ageRange;
    switch (true) {
      case value >= 0 && value <= 12:
        ageRange = "7-12";
        break;
      case value >= 13 && value <= 16:
        ageRange = "13-16";
        break;
      case value >= 17 && value <= 21:
        ageRange = "17-21";
        break;
      case value >= 22:
        ageRange = "22+";
        break;
      default:
        ageRange = "22+";
        break;
    }
  
    setAgeRange(ageRange);
    setAge(value);
  };
  
return (
  <div className="container">
        <div className='reading-box'>
          
          {!introQuestionsDone &&
            <div className='intro-questions'>
            <label>Vem är det som gör testet?</label>
            <div class="panel" align="center">
              <p onClick={handleIntroAnswerClick}  className={selectedAnswer === 'JAG GÖR TESTET SJÄLV' ? 'selected':'notselected'}>JAG GÖR TESTET SJÄLV</p>
              <p onClick={handleIntroAnswerClick}  className={selectedAnswer === 'JAG GÖR TESTET TILLSAMMANS MED MITT BARN'? 'selected':''}>JAG GÖR TESTET TILLSAMMANS MED MITT BARN</p>
            </div>
          </div>
          }
          {!isStarted && !isStopped && !hasSubmitedQuestions && introQuestionsDone && 
          <div className="level-selector">
            {formSubmitted && <p className='form-submitted-message'>Dina resultat har sparats</p>}
            <div className='level-div'> 
            <select className='level' onChange={handleLevelChange} required>
              <option value="1">Lätt</option>
              <option value="2">Medel</option>
              <option value="3">Svår</option>
            </select>
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
                <label >Vi behöver veta ålder för att kunna anpassa testet för dig.</label>
              </div>
            )}
          </div>
          <button className='start-button' onClick={handleStartClick}>TA TESTET</button>

    </div>
          }
             
       {isStarted && !isStopped && introQuestionsDone && !hasSubmitedQuestions ? (
        <>
        <div className='test'>
        <div className='readingTextDiv'>
            <p className='readingText' dangerouslySetInnerHTML={createMarkupText()} />
            <button className='stop-button' onClick={handleStopClick}>STOPP</button>
          </div>
          
        </div>

        </>
      ) : null }
       { isStopped && !hasSubmitedQuestions &&
                <form className='question-form' onSubmit={handleFormSubmit}>
                {questions.map((question, index) => (
                  <div key={index} className="questions">
                    <p>{question.question_text}</p>
                    <div className="questionsRadioAndLabel">
                      <input required type="radio" id={`option-a`} name={`question-${index}`} value={question.a} />
                      <label htmlFor={`option-a`}>{question.a}</label>
                    </div>
                    <div className="questionsRadioAndLabel">
                      <input required type="radio" id={`option-b`} name={`question-${index}`} value={question.b} />
                      <label htmlFor={`option-b`}>{question.b}</label>
                    </div>
                    <div className="questionsRadioAndLabel">
                      <input required type="radio" id={`option-c`} name={`question-${index}`} value={question.c} />
                      <label htmlFor={`option-c`}>{question.c}</label>
                    </div>
                  </div>
                ))}
                <button className='submitQuestions' type="submit">SVARA</button>
              </form>
            }
            { hasSubmitedQuestions && !validToSaveContactInfo &&
          <div className='statisticsDiv'>
                    <div className='statisticsContent'>
                      <div className='testStatistics'>
                      <div className='statisticsRow'>
                        <h2>LÄSHASTIGHET</h2>
                        <p className='statisticsValueWPM'>{wpm}</p>
                        <h2>ORD PER MINUT</h2>
                      </div>
                      <div className='statisticsRow'>
                        <h2>LÄSFÖRSTÅELSE</h2>
                        <p className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</p>
                        <h2>RÄTT PÅ FRÅGORNA</h2>
                      </div>
                      </div>
                      <div className='testStatistics'> 
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>{`Genomsnitt ord per minut`} <br/> {`för din ålder är ${averageWpm}`}</h2>
                      </div>
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>{`Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`} <br/> {`Läser du ${wpm} ord`} <br/> {`så förstår du ${Math.round(wpmComprehended)} av de orden.`}</h2>
                      </div>
                      </div>
                      <div className='statisticsFunFact'>
                      <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
                      </div>
                    </div>
              <button className='restart-button' onClick={handleRestartClick}>STARTA OM TEST</button>
        </div>
            }
                {hasSubmitedQuestions && validToSaveContactInfo && !showForm &&
                  <div className='statisticsDiv'>
                    <div className='statisticsContent'>
                      <div className='testStatistics'>
                      <div className='statisticsRow'>
                        <h2>LÄSHASTIGHET</h2>
                        <p className='statisticsValueWPM'>{wpm}</p>
                        <h2>ORD PER MINUT</h2>
                      </div>
                      <div className='statisticsRow'>
                        <h2>LÄSFÖRSTÅELSE</h2>
                        <p className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</p>
                        <h2>RÄTT PÅ FRÅGORNA</h2>
                      </div>
                      </div>
                      <div className='testStatistics'> 
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>{`Genomsnitt ord per minut`} <br/> {`för din ålder är ${averageWpm}`}</h2>
                      </div>
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>{`Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`} <br/> {`Läser du ${wpm} ord`} <br/> {`så förstår du ${Math.round(wpmComprehended)} av de orden.`}</h2>
                      </div>
                      </div>
                      <div className='statisticsFunFact'>
                      <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
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
                    <div>
                    <input type="email" onChange={infoChange} placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                    <input type="text" onChange={infoChange} placeholder="Förnamn" pattern="[a-zA-Z]+" required />
                    <input type="text" onChange={infoChange} placeholder="Efternamn" pattern="[a-zA-Z]+" required />
                    </div>
                  <div>
                  <button className='SAVE-RESULT-BUTTON'type="submit">SPARA</button>
                  <button className='CANCEL-FORM-BUTTON' onClick={handleRestartClick}>AVBRYT</button>
                  </div>
                  </form>
                  
                  </div>
                }
                </div>   
                </div>      

            );
                    
  
  }
export default Content;
