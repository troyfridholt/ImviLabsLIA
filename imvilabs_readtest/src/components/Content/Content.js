// Content.js
import React, { useState, useEffect } from 'react';
import './Content.css';
import Firebase from '../../firebase/Firebase';
import Server from '../../server';
import SE from '../../Images/se.png'
import GB from '../../Images/gb.png'
import readingIcon from '../../Images/ReadingIMG.svg'
import checkIcon from '../../Images/checkIcon.svg'
import speakerIcon from '../../Images/speakerIcon.png'


function Content() {
  const firebase = new Firebase();
  const server = new Server();
  //State för att se ifall vi kan fråga efter kundens kontakt uppgifter (Ifall kunden är över 16 år)
  const [validToSaveContactInfo, setValidToSaveContactInfo] = useState(false);
  //State för att visa ett formulär ifall användaren vill spara sitt resultat
  const [showForm, setShowForm] = useState(false);

  //States för level,ålder,text
  const [level, setLevel] = useState("level1");
  const [age, setAge] = useState(0);
  const [ageRange, setAgeRange] = useState("");
  const [text, setText] = useState('');

  //States för start och sluttid samt "WPM" för att kunna räkna ut wpm.
  const [wpm, setWpm] = useState(0);

  //State för namn,email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailRegistered, setIsEmailRegistered] = useState(true);

  //State för att se ifall man är kund.
  const [customer, setCustomer] = useState(false);
  //State för att se ifall kunden vill Regstrirera sig, Logga in, Göra testet som gäst.
  const [RegisterLogin, setRegisterLogin] = useState("Guest")
  
  //State för att se ifall användaren har blivit frågad om de vill bli kund
  const [askToBecomeCustomer, setAskToBecomeCustomer] = useState(false);

  //State för att se om man är inloggad
  const [signedIn, setSignedIn] = useState(false);
  

  //Fråga användare svarar på vid start
  const [introQuestionsDone, setIntroQuestionsDone] = useState(false)

  //State för val av språk
  const [language, setLanguage] = useState('SE');
  //State för att se ifall användaren har valt ett språk
  const [languageSelected, setLanguageSelected] = useState(false);

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
    setIntroQuestionsDone(false)
    setValidToSaveContactInfo(false);
    setShowForm(false);
    setResetTimer(true);
    setLanguageSelected(false);
    setIsEmailRegistered(true)
    if(!customer){
      setAskToBecomeCustomer(false)
    }
  }


  const handleCancelRegisterFormClick = () =>{
    console.log(email)
    setIsEmailRegistered(true)
    setCustomer(false)
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
      if (customer) {
        setRandomNr(randomNr);
      }else{
        setRandomNr(1);
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
      setIntroQuestionsDone(true)
      setIsStopped(false);
      setIsStarted(true);
    };
    

  
    const handleIntroAnswerClick = (e) => {
      setSelectedAnswer(e.target.value);
    };

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

    //Funktion som sparar ner email, namn,  sedan skickar den med namn,email,ålder,wpm,antalrättfrågor,nivå till våran backend som sedan ska kunna hantera detta
    //När vi fixat en databas.
    function handleSaveInfoFormSubmit(e) {
      e.preventDefault();
      firebase.saveResult(email, name, wpm, age, level, amountOfRightQuestions);
      const emailCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('email='));
      if (!emailCookie) {
        document.cookie = `email=${email}; max-age=86400; path=/`;
      }
      setCustomer(true)
      setFormSubmitted(true);
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

  const handleLanguageClick = (language) => {
    setLanguage(language);
    setLanguageSelected(true)
    console.log(language)
  };


  //Cheeks if user chooses to continue as guest or to register
  const handleVersionClick = (e) => {
    const value = e.target.value;
    if(value === 'Guest'){
      setCustomer(false)
      setAskToBecomeCustomer(true)
    }
    if(value === "Register"){
      setRegisterLogin("Register")
      setCustomer(true)
    } 
    if(value === "Login"){
      setRegisterLogin("Login")
      setCustomer(true)
    }
  }

  //If user chooses to continue with register it will add user to DB and create a cookie with users email.
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (RegisterLogin === "Login") {
      const emailExists = await firebase.checkIfEmailIsInDB(email);
      if (emailExists) {
        document.cookie = `email=${email}; max-age=86400; path=/`;
        setSignedIn(true)
        setAskToBecomeCustomer(true);
      } else {
        setIsEmailRegistered(false);
      }
    } else {
      firebase.addUserToDB(email, name, age);
      document.cookie = `email=${email}; max-age=86400; path=/`;
      setSignedIn(true)
      setAskToBecomeCustomer(true);
    }
  };

//useEffect to check if the user is a customer and if their email exists in the database
useEffect(() => {
  const emailCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('email='))
  if (emailCookie) {
    const email = emailCookie.split('=')[1];
    setEmail(email);

    // Check if the email exists in the database
    firebase.checkIfEmailIsInDB(email)
      .then(exists => {
        if (exists) {
          setCustomer(true);
          setAskToBecomeCustomer(true);
          setSignedIn(true)
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}, []);



  
return (
  <div className='container'>
        <div className='reading-box'>

          {!languageSelected &&
            <div>
            <img src={SE} alt="Swedish flag" style={{ marginRight: '10rem' }} onClick={() => handleLanguageClick('SE')} />
            <img src={GB} alt="British flag" style={{ }} onClick={() => handleLanguageClick('GB')} />
            </div>
          }

          {languageSelected && !askToBecomeCustomer && RegisterLogin == "Guest" &&

          <div className='welcomePageContainer'>
            <img src={readingIcon}  className="readingImg" alt="" />
            <div className='welcomePageDiv'>
              <div>
              <div className='welcomeTextHeader'>
              <h1 className='welcomeText1'>Välkommen till imvis</h1>
              <h1 className='welcomeText2'>Läshastighetstest</h1>
            </div>

            <div className='welcomePageDiv2'>
            <p>
              Testet utvärderar din läsförståelse och mäter din
              lästhastighet i antal ord per minut. Du kommer att få
              läsa en text och sen kommer du svara på frågor. Om
              du testar gratis har du bara tillgång till den lätta nivån
              </p>
            <p >
              Få den fullständiga testversionen som inkluderar:
            </p>
            </div>
            <div className='checkBoxDiv'>
              <div>
              <img src={checkIcon} alt="" />
              <p>Tre svårighetsgrader</p>
              </div>

              <div>
              <img src={checkIcon} alt="" />
              <p>Flera språkalternativ</p>
              </div>

              <div>
              <img src={checkIcon} alt="" />
              <p>Mängd olika läsinnehåll</p>
              </div>
            </div>
            </div>
              </div>
            
            <div className='welcomePageDiv3'>
            <p>
              Registrera dig med din e-post och följ dina framsteg över tid!
            </p>
            </div>
            
            {!customer ? (
              <>
              <div className='welcomePageButtonsDiv'>
              <div className='RegisterGuestDiv'>
                  <button onClick={handleVersionClick} className='registerButton' value="Register">
                  Registrera
                  </button>
                  <button onClick={handleVersionClick} className='guestButton' value="Guest">
                    Testa som gäst
                    </button>
                </div>
              </div>     
              <div className='AlreadyRegisterdDiv'>
                <button onClick={handleVersionClick} class="alreadyRegisredButton" value="Login"><span style={{color: "#606060"}}>Redan Registrerad?</span> Logga in</button>
                </div>  
                
              </>
            ) :
             (

          null
            )}
            </div>
          
           }
           
           {RegisterLogin === "Register" && !signedIn && (

            <div className='RegisterLoginContainer'> 
              <h1 className='RegisterHeader'>Vad kul att du vill registrera dig!</h1>

              <p className='RegisterParagraph1'>Nu kan du ha fler alternativ för testet och följa dina framsteg över tid!</p>
              
              <div className='RegisterForm'>
              <form onSubmit={handleEmailSubmit}>

                <div className='RegisterFormDiv'>
                  <label htmlFor="">E-post <span>*</span></label>
                  <input 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                  placeholder="Email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                 />
                </div>

                <div className='RegisterFormDiv'>
                  <label htmlFor="">Namn</label>
                  <input 
                  pattern="[a-zA-Z]+" 
                  placeholder="Name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                   />
                </div>
                
                <div className='RegisterFormDiv'>
                  <label htmlFor="">Ålder</label>
                  <input 
                  pattern="[0-9]*" 
                  min="1" 
                  max="99" 
                  placeholder="Age" 
                  type="number" 
                  value={age || ''}
                  onChange={(e) => setAge(e.target.value)} 
                  required 
                   />
                </div>

                <div className='RegisterFormCheckBoxParagraph'>
                  <input type="checkbox" name="" id="" />
                  <p>Jag är minst 18 år och jag godkänner <a href=''>imvis vilkorn</a></p>
                </div>

                <button className='RegisterFormButton' type='submit'>Registrera</button>
                
                <p className='registerParagraph2'>Har du redan ett konto? <button value="Login" onClick={handleVersionClick} >Logga in</button></p>
              </form>
              </div>
              


              </div>
           )}
            {RegisterLogin === "Login" && !signedIn &&(

              <div className='RegisterLoginContainer'> 
              <div className='LoginContainer'>
              <h1 className='RegisterHeader'>Logga in</h1>

              <div className='RegisterForm'>
              <form onSubmit={handleEmailSubmit}>

                <div className='RegisterFormDiv'>
                  <label htmlFor="">E-post <span>*</span></label>
                  <input 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                  placeholder="Email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  />
                </div>

                <button className='LoginFormButton' type='submit'>Logga in</button>
                
                <p className='LoginParagraph2'>Inget konto? <button value="Register" onClick={handleVersionClick}>Registrera</button></p>
              </form>
              </div>
              </div>


              </div>
            )}
      

          {!isStarted && !isStopped && !hasSubmitedQuestions && !introQuestionsDone && languageSelected && askToBecomeCustomer &&
            <div className="level-selector">
            
            <div className="panel">
              <div className='panelLabelDiv'>
              <label className='panelLabel'>Vem är det som gör testet?</label>
              </div>
            
              <div className='panel1'>
              <input
                  type="radio"
                  name="introAnswer"
                  value="JAG GÖR TESTET SJÄLV"
                  checked={selectedAnswer === 'JAG GÖR TESTET SJÄLV'}
                  onChange={handleIntroAnswerClick}
                />
              <label>
                Jag gör testet själv
              </label>
              </div>

              <div className='panel2'>
              <input
                  type="radio"
                  name="introAnswer2"
                  value="JAG GÖR TESTET TILLSAMMANS MED MITT BARN"
                  checked={selectedAnswer === 'JAG GÖR TESTET TILLSAMMANS MED MITT BARN'}
                  onChange={handleIntroAnswerClick}
                />
              <label>
              Jag gör testet tillsammans med mitt barn
              </label>
              </div>

            </div>

              <div className='level-div'>
              <div className="age-container">
                <label>Testtagarens ålder <span>*</span></label>
                <input
                  type="number"
                  className='age'
                  value={age}
                  min="1"
                  max="99"
                  required
                  pattern="[0-9]*"
                  onChange={handleAgeChange}
                />
              </div>
              <div className='level-container'>
              <label>Svårighetsgrad</label>
              {!customer ? (
                  <select className='level' onChange={handleLevelChange} required>
                    <option value="1">{language === "GB" ? "Easy" : "Lätt"}</option>
                  </select>
                ) : (
                  <select className='level' onChange={handleLevelChange} required>
                    <option value="1">{language === "GB" ? "Easy" : "Lätt"}</option>
                    <option value="2">{language === "GB" ? "Medium" : "Medel"}</option>
                    <option value="3">{language === "GB" ? "Hard" : "Svår"}</option>
                  </select>
                )}
              </div>

              </div>
              <div className="AgreeDiv">
              <input
                  type="checkbox"
                  name="AgreeBox"
                  value="Agree"
                />
              <label>
              Jag samtycker till <a >Imvis vilkor</a>
              </label>
              </div>
              <button className='start-button' onClick={handleStartClick}>Starta testet</button>
            </div>
          }
             
       {isStarted && !isStopped && introQuestionsDone && !hasSubmitedQuestions && 
        <div className='test'>
        <div class="parent-container">
          <div className='readingTextDiv'>
            <p className='readingText' dangerouslySetInnerHTML={createMarkupText()} />
          </div>
          <div className='stop-buttonDiv'>
            <button className='stop-button' onClick={handleStopClick}>Stopp</button>
          </div>
          </div>
        </div>
       }
       { isStopped && !hasSubmitedQuestions &&
               <div className='questionsContainer'>
                  <div className='questionsContainerHeader'>
                    <h1>Frågor</h1>
                    <p>Välj rätt svar på frågan.</p>
                  </div>
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
                <button className='submitQuestions' type="submit">Svara och se resultat</button>
              </form>
               </div>
                
            }
            { hasSubmitedQuestions && !validToSaveContactInfo &&
          <div className='statisticsDiv'>
                    <div className='statisticsContent'>
                      <div className='testStatistics'>


                      <div className='statisticsRow'>
                        <div className='statisticsInfo1'>
                        <h2>{language === "GB" ? "READING SPEED":"LÄSHASTIGHET"}</h2>
                        <h1 className='statisticsValueWPM'>{wpm}</h1>
                        <p>{language === "GB" ? "WORDS PER MINUT":"ORD PER MINUT"}</p>
                        </div>

                        <div className='statisticsInfo2'>
                          <p className='statisticsValue'>
                          {language === "GB"
                            ? `Average words per minute` +  ` for your age is ${averageWpm}`
                            : `Genomsnitt ord per minut` +  ` för din ålder är ${averageWpm}`}
                        </p>
                      </div>
                      </div>

                      <div className='statisticsRow'>
                        <div className='statisticsInfo1'>
                          <h2>{language === "GB" ? "COMPREHENSION":"LÄSFÖRSTÅELSE"}</h2>
                          <h1 className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</h1>
                          <p>{language === "GB" ? "OF QUESTIONS ANSWERED CORRECTLY":"RÄTT PÅ FRÅGORNA"}</p>
                        </div>

                        <div className='statisticsInfo2'>
                        <p className='statisticsValue'>
                        {language === "GB"
                          ? `You had ${Math.round(amountOfRightQuestions)}% correct answers`
                          : `Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`}
                        <br />
                        {language === "GB"
                          ? `Reading at ${wpm} words per minute, you comprehend ${Math.round(wpmComprehended)} of the words.`
                          : `Läser du ${wpm} ord per minut, så förstår du ${Math.round(wpmComprehended)} av de orden.`}
                      </p>
                        </div>
                      </div>
                                        
                      </div>
                      <div className='statisticsFunFactHeader'>
                        <div>
                        <img src={speakerIcon} className='SpeakerIcon' alt="" />
                        <label >Visste du</label>
                        </div>
                      </div>

                      <div className='statisticsFunFact'>
                      <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
                      </div>


                    </div>
                    
                    <button className='restartTestButton' onClick={handleRestartClick}>{language === "GB" ? "RESTART TEST" : "STARTA OM" }</button>
                    </div>
                }
                {hasSubmitedQuestions && validToSaveContactInfo && !showForm &&
                  <div className='statisticsDiv'>
                      <div className='statisticsContent'>
                      <div className='testStatistics'>


                      <div className='statisticsRow'>
                        <div className='statisticsInfo1'>
                        <h2>{language === "GB" ? "READING SPEED":"LÄSHASTIGHET"}</h2>
                        <h1 className='statisticsValueWPM'>{wpm}</h1>
                        <p>{language === "GB" ? "WORDS PER MINUT":"ORD PER MINUT"}</p>
                        </div>

                        <div className='statisticsInfo2'>
                          <p className='statisticsValue'>
                          {language === "GB"
                            ? `Average words per minute` +  ` for your age is ${averageWpm}`
                            : `Genomsnitt ord per minut` +  ` för din ålder är ${averageWpm}`}
                        </p>
                      </div>
                      </div>

                      <div className='statisticsRow'>
                        <div className='statisticsInfo1'>
                          <h2>{language === "GB" ? "COMPREHENSION":"LÄSFÖRSTÅELSE"}</h2>
                          <h1 className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</h1>
                          <p>{language === "GB" ? "OF QUESTIONS ANSWERED CORRECTLY":"RÄTT PÅ FRÅGORNA"}</p>
                        </div>

                        <div className='statisticsInfo2'>
                        <p className='statisticsValue'>
                        {language === "GB"
                          ? `You had ${Math.round(amountOfRightQuestions)}% correct answers`
                          : `Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`}
                        <br />
                        {language === "GB"
                          ? `Reading at ${wpm} words per minute, you comprehend ${Math.round(wpmComprehended)} of the words.`
                          : `Läser du ${wpm} ord per minut, så förstår du ${Math.round(wpmComprehended)} av de orden.`}
                      </p>
                        </div>
                      </div>
                                        
                      </div>
                      <div className='statisticsFunFactHeader'>
                        <div>
                        <img src={speakerIcon} className='SpeakerIcon' alt="" />
                        <label >Visste du</label>
                        </div>
                      </div>

                      <div className='statisticsFunFact'>
                      <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
                      </div>




                    </div>
                      <div className='restartButtonDiv'>
                      <button className='restartTestButton' onClick={handleRestartClick}>{language === "GB" ? "RESTART TEST" : "STARTA OM" }</button>
                      </div>
                       
                    
                      <div className='registerButtonDiv'>
                      <button className={signedIn ? "hidden" : "RegisterButton"} onClick={() => setShowForm(true)}>{"Registrera"} <span>{"dig för att få den fullständiga versionen"}</span></button>
                      </div>

                
                       
                    
                    
                  </div>
                }

                {hasSubmitedQuestions && validToSaveContactInfo && showForm &&
                <div className='form-container'>
                  {!customer
                  ?
                  <form className='form' onSubmit={handleSaveInfoFormSubmit}>
                  <div>
                  <input type="email" onChange={infoChange} placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                  <input type="text" onChange={infoChange} placeholder="Förnamn" pattern="[a-zA-Z]+" required />
                  </div>
                <div>
                <button className='SAVE-RESULT-BUTTON'type="submit">{language === "GB" ?"SAVE" : "SPARA" }</button>
                <button className='CANCEL-FORM-BUTTON' onClick={handleRestartClick}>{language === "GB" ?"CANCEL" : "AVBRYT" }</button>
                </div>
                </form>
                  :
                  <form className='form' onSubmit={handleSaveInfoFormSubmit}>
                  <div>
                  <input type="email" onChange={infoChange} placeholder="Email" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                  </div>
                <div>
                <button className='SAVE-RESULT-BUTTON'type="submit">{language === "GB" ?"SAVE" : "SPARA" }</button>
                <button className='CANCEL-FORM-BUTTON' onClick={handleRestartClick}>{language === "GB" ?"CANCEL" : "AVBRYT" }</button>
                </div>
                </form>
                  }

                  
                  </div>
                }
                </div>   
                </div>      

            );
                    
  
  }
export default Content;
