// Content.js
import React, { useState, useEffect } from 'react';
import './Content.css';
import 'animate.css';
import Firebase from '../../firebase/Firebase';
import Server from '../../server';
import 'flag-icons/css/flag-icons.min.css';


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

  //State för att se ifall man är kund.
  const [customer, setCustomer] = useState(false);
  
  //State för att se ifall användaren har blivit frågad om de vill bli kund
  const [askToBecomeCustomer, setAskToBecomeCustomer] = useState(false);
  

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
    if(!customer){
      setAskToBecomeCustomer(false)
    }
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
      setIsStopped(false);
      setIsStarted(true);
    };
    

  
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


  const handleVersionClick = (e) => {
    const value = e.target.value;
    if(value === 'guest'){
      setCustomer(false)
      setAskToBecomeCustomer(true)
    }else {
      setCustomer(true);
    }  
  }

   const handleEmailSubmit = (e) => {
    e.preventDefault();
    firebase.addUserToDB(email, name, age);
    document.cookie = `email=${email}; max-age=86400; path=/`;
    setAskToBecomeCustomer(true)
  };

//useEffect to check if the user is a customer and if their email exists in the database
useEffect(() => {
  const emailCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('email='))
  if (emailCookie) {
    const email = emailCookie.split('=')[1];
    setEmail(email);
    setCustomer(true);
    setAskToBecomeCustomer(true);

    // Check if the email exists in the database
    firebase.checkIfEmailIsInDB(email)
      .then(exists => {
        if (exists) {
          // Email exists in the database
          console.log(`User with email ${email} exists in the database.`);
        } else {
          // Email does not exist in the database
          console.log(`User with email ${email} does not exist in the database.`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}, []);



  
return (
  <div className="container">
        <div className='reading-box'>

          {!languageSelected &&
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='fi fi-se' style={{ fontSize: '4rem', marginRight: '10rem' }} onClick={() => handleLanguageClick('SE')}></span>
              <span className='fi fi-gb' style={{ fontSize: '4rem' }} onClick={() => handleLanguageClick('GB')}></span>
            </div>
          </div>
          }

          {languageSelected && !askToBecomeCustomer &&

          <div style={{   display: "flex", flexDirection: "column", alignitems: "center", overflow: "auto", maxWidth: "80%" }}>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>{language === "GB" ? "imviLabs Reading & ReadingComprehension Test" : "imviLabs Läs & Läsförståelse Test" }</h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", textAlign: "center", lineHeight: "1.5em" }}>
              {language === "GB" ?
              "Welcome to our reading test! This test aims to evaluate your reading comprehension and speed in words per minute. " +
              "You will be able to select a difficulty level ranging from Easy to Hard, followed by a passage that you will need to read. "+
              "Once you have finished reading the text, you will be required to answer questions based on the passage."
              : 
              "Välkommen till vårat lästtest! Detta test kommer att utvärdera din läsförståelse och din mäta din läshastighet i antal ord per minut. " +
              "Du kommer att kunna välja en svårighetsnivå som sträcker sig från Lätt till Svår, följt av ett textstycke som du behöver läsa. " +
              "När du har läst klart texten kommer du att behöva svara på frågor baserade på stycket."
              }

            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", textAlign: "center", lineHeight: "1.5em" }}>
            {language === "GB" ?
              "You have the option to take the test as a guest, but this will limit you to selecting only 'Easy' as the difficulty level" +
              "and you will only be presented with a single text. Alternatively, you can sign up with your email to access the full version of the test,"+
              "which includes a wide range of difficulty levels, multiple language options, and a variety of texts and questions." +
              "Additionally, signing up will allow you to track your progress over time."
              : 
              "Du har möjlighet att göra testet som gäst, men detta begränsar dig till att endast välja 'Lätt' som svårighetsnivå " +
              "och du kommer bara att ha tillgång till en enda text. Alternativt kan du registrera dig med din e-post för att få tillgång till våran fullständiga versionen av testet " +
              "som inkluderar ett brett utbud av svårighetsgrader, flera språkalternativ och en mängd olika texter och frågor. " +
              "Genom att registrera dig kan du dessutom följa dina framsteg över tiden."
              }

            </p>

            {!customer ? (
              <>
                <button value='guest' style={{ 
                  backgroundColor: "#4379b8",
                  backgroundImage: "linear-gradient(-180deg, #37aee2 0%, #4379b8 100%)",
                  borderRadius: "0.5rem",
                  boxSizing: "border-box",
                  color: "#ffffff",
                  fontSize: "1rem",
                  justifyContent: "center",
                  padding: "0.5rem 1.75rem",
                  textDecoration: "none",
                  border: "0",
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "manipulation",
                  marginLeft: "4%",
                  marginTop: "2%",  }} onClick={handleVersionClick}>{language === "ENG" ? "CONTINUE AS GUEST" : "FORTSÄTT SOM GÄST" }</button>

                <button style={{
                  backgroundColor: "#4379b8",
                  backgroundImage: "linear-gradient(-180deg, #37aee2 0%, #4379b8 100%)",
                  borderRadius: "0.5rem",
                  boxSizing: "border-box",
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  justifyContent: "center",
                  padding: "0.5rem 1.75rem",
                  textDecoration: "none",
                  border: "0",
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "manipulation",
                  marginLeft: "4%",
                  marginTop: "2%",
                }} value='customer' onClick={handleVersionClick}>{language === "ENG" ? "SIGN UP WITH EMAIL" : "REGISTRERA MED EMAIL" }</button>
              </>
            ) : (
            <form onSubmit={handleEmailSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <input 
                style={{
                  width: "100%",
                  height: "2rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  margin: "1rem 0",
                  fontSize: "1rem",
                }} 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                placeholder="Email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <input 
                style={{
                  width: "100%",
                  height: "2rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  margin: "1rem 0",
                  fontSize: "1rem",
                }} 
                pattern="[a-zA-Z]+" 
                placeholder="Name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
              <input 
              style={{
                width: "100%",
                height: "2rem",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                margin: "1rem 0",
                fontSize: "1rem",
              }} 
              pattern="[0-9]*" 
              min="1" 
              max="99" 
              placeholder="Age" 
              type="number" 
              value={age || ''}
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
              <button 
                type="submit" 
                style={{
                  width: "100%",
                  height: "2.5rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  margin: "1rem 0",
                  fontSize: "1rem",
                  backgroundColor: "#4379b8",
                  backgroundImage: "linear-gradient(-180deg, #37aee2 0%, #4379b8 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Submit
              </button>
            </form>
            )}
            </div>
          
           }

          
          {!introQuestionsDone && languageSelected && askToBecomeCustomer &&
            <div className='intro-questions'>
            <label>{language === "GB" ? "Who is doing the test?" : "Vem är det som gör testet?"}</label>
            <div class="panel" align="center">
              <p onClick={handleIntroAnswerClick}  className={selectedAnswer === 'JAG GÖR TESTET SJÄLV' ? 'selected':'notselected'}>{language === "GB" ? "I DO THE TEST MYSELF" : "JAG GÖR TESTET SJÄLV"}</p>
              <p onClick={handleIntroAnswerClick}  className={selectedAnswer === 'JAG GÖR TESTET TILLSAMMANS MED MITT BARN' ? 'selected':''}>{language === "GB" ?  "I DO THE TEST TOGETHER WITH MY CHILD" : "JAG GÖR TESTET TILLSAMMANS MED MITT BARN"}</p>
            </div>
          </div>
          }
          {!isStarted && !isStopped && !hasSubmitedQuestions && introQuestionsDone && 
          <div className="level-selector">
            <div className='level-div'> 
            {!customer ? <select className='level' onChange={handleLevelChange} required>
            <option value="1">{language === "GB" ? "Easy" :"Lätt"}</option>
            </select>
            :            
            <select className='level' onChange={handleLevelChange} required>
            <option value="1">{language === "GB" ? "Easy" :"Lätt"}</option>
            <option value="2">{language === "GB" ? "Medium" :"Medel"}</option>
            <option value="3">{language === "GB" ? "Hard" :"Svår"}</option>
            </select>
            }

            </div>

            <div className="age-container">
            <input 
              type="number" 
              className='age' 
              value={age}
              min="1" 
              max="99" 
              placeholder={
                selectedAnswer === (language === "GB" ? "I DO THE TEST MYSELF" : "JAG GÖR TESTET SJÄLV")
                  ? (language === "GB" ? "Age" : "Ålder")
                  : (language === "GB" ? "Childs Age" : "Barns Ålder")
              } 
              required 
              pattern="[0-9]*" 
              onChange={handleAgeChange} 
              onMouseOver={() => setShowInfo(true)}
              onMouseOut={() => setShowInfo(false)}
            />
            {showInfo && (
              <div className="info-tooltip">
                <label >{language === "GB" ? "We need to know your age to be able to customize the test for you." :"Vi behöver veta ålder för att kunna anpassa testet för dig."}</label>
              </div>
            )}
          </div>
          <button className='start-button' onClick={handleStartClick}>{language === "GB" ? "TAKE THE TEST":"TA TESTET"}</button>

    </div>
          }
             
       {isStarted && !isStopped && introQuestionsDone && !hasSubmitedQuestions ? (
        <>
        <div className='test'>
        <div className='readingTextDiv'>
            <p className='readingText' dangerouslySetInnerHTML={createMarkupText()} />
            <button className='stop-button' onClick={handleStopClick}>{language === "GB" ? "STOP":"STOPP" }</button>
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
                <button className='submitQuestions' type="submit">{language === "GB" ? "SUBMIT":"SVARA" }</button>
              </form>
            }
            { hasSubmitedQuestions && !validToSaveContactInfo &&
          <div className='statisticsDiv'>
                    <div className='statisticsContent'>
                      <div className='testStatistics'>
                      <div className='statisticsRow'>
                        <h2>{language === "GB" ? "READING SPEED":"LÄSHASTIGHET"}</h2>
                        <p className='statisticsValueWPM'>{wpm}</p>
                        <h2>{language === "GB" ? "WORDS PER MINUT":"ORD PER MINUT"}</h2>
                      </div>
                      <div className='statisticsRow'>
                        <h2>{language === "GB" ? "COMPREHENSION":"LÄSFÖRSTÅELSE"}</h2>
                        <p className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</p>
                        <h2>{language === "GB" ? "OF QUESTIONS ANSWERED CORRECTLY":"RÄTT PÅ FRÅGORNA"}</h2>
                      </div>
                      </div>
                      <div className='testStatistics'> 
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>
                      {language === "GB"
                        ? `Average words per minute` +  `for your age is ${averageWpm}`
                        : `Genomsnitt ord per minut` +  `för din ålder är ${averageWpm}`}
                    </h2>
                      </div>
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>
                      {language === "GB"
                        ? `You had ${Math.round(amountOfRightQuestions)}% correct answers`
                        : `Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`}
                      <br />
                      {language === "GB"
                        ? `Reading at ${wpm} words per minute, you comprehend ${Math.round(wpmComprehended)} of the words.`
                        : `Läser du ${wpm} ord per minut, så förstår du ${Math.round(wpmComprehended)} av de orden.`}
                    </h2>
                      </div>
                      </div>
                      <div className='statisticsFunFact'>
                      <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
                      </div>
                    </div>
                    
                    <button className='restart-button' onClick={handleRestartClick}>{language === "GB" ? "RESTART TEST" : "STARTA OM TEST"}</button>
                    </div>
                }
                {hasSubmitedQuestions && validToSaveContactInfo && !showForm &&
                  <div className='statisticsDiv'>
                    <div className='statisticsContent'>
                      <div className='testStatistics'>
                      <div className='statisticsRow'>
                        <h2>{language === "GB" ? "READING SPEED":"LÄSHASTIGHET"}</h2>
                        <p className='statisticsValueWPM'>{wpm}</p>
                        <h2>{language === "GB" ? "WORDS PER MINUT":"ORD PER MINUT"}</h2>
                      </div>
                      <div className='statisticsRow'>
                        <h2>{language === "GB" ? "COMPREHENSION":"LÄSFÖRSTÅELSE"}</h2>
                        <p className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</p>
                        <h2>{language === "GB" ? "OF QUESTIONS ANSWERED CORRECTLY":"RÄTT PÅ FRÅGORNA"}</h2>
                      </div>
                      </div>
                      <div className='testStatistics'> 
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>
                      {language === "GB"
                        ? `Average words per minute` + `for your age is ${averageWpm}`
                        : `Genomsnitt ord per minut` + `för din ålder är ${averageWpm}`}
                    </h2>
                      </div>
                      <div className='statisticsInfo'>
                      <h2 className='statisticsValue'>
                      {language === "GB"
                        ? `You had ${Math.round(amountOfRightQuestions)}% correct answers`
                        : `Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`}
                      <br />
                      {language === "GB"
                        ? `Reading at ${wpm} words per minute, you comprehend ${Math.round(wpmComprehended)} of the words.`
                        : `Läser du ${wpm} ord per minut, så förstår du ${Math.round(wpmComprehended)} av de orden.`}
                    </h2>
                      </div>
                      </div>
                      <div className='statisticsFunFact'>
                      <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
                      </div>
                    </div>
                    <div className='SaveOrRestartButtonsDiv'>
                    <div>
                      <button className='save-result-button first-button' onClick={() => setShowForm(true)}>{language === "GB" ? "SAVE RESULT?" : "SPARA RESULTAT?" }</button>
                      <button className='save-result-button second-button' onClick={handleRestartClick}>{language === "GB" ? "RESTART TEST" : "STARTA OM TESTET" }</button>
                    </div>  
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
