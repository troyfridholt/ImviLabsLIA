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
import { useLocation, useNavigate  } from 'react-router-dom';
import useVerifyEmailRedirect from './useVerifyEmailRedirect';

//Importing components
import Login from './Login.js'
import Register from './Register.js'
import QuestionsForm from './QuestionsForm.js'
import WelcomePage from './WelcomePage.js';
import LevelSelector from './LevelSelector.js';
import Statistics from './Statistics';
import ReadingText from './ReadingText';
import NavbarR from '../NavbarR/NavbarR';

function Content() {
  const firebase = new Firebase();
  const server = new Server();
  const location = useLocation();
  const navigate = useNavigate();

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
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('Not Provided');

  //State för att se ifall man är kund.
  const [customer, setCustomer] = useState(false);
  //State för att se ifall kunden vill Regstrirera sig, Logga in, Göra testet som gäst.
  const [RegisterLogin, setRegisterLogin] = useState("Guest")
  
  //State för att se ifall användaren har blivit frågad om de vill bli kund
  const [askToBecomeCustomer, setAskToBecomeCustomer] = useState(false);

  //State för att se om man är inloggad
  const [signedIn, setSignedIn] = useState(false);

  //State för att se ifall användaren har godkänt imvis terms
  const [agreement, setAgreement] = useState(false);
  
  //Fråga användare svarar på vid start
  const [introQuestionsDone, setIntroQuestionsDone] = useState(false)

  //State för val av språk
  const [language, setLanguage] = useState('SV');
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

  //State för rolig fakta efter testet
  const [funStatistics, setFunStatistics] = useState("");

  //State för rolig fakta efter testet med ett ökat WPM i %
  const [improvedFunStatistics, setImprovedFunStatistics] = useState("");

  //State för average wpm
  const [averageWpm, setAverageWpm] = useState("");

  //State för att visa hur många ord av det dem läser som de förstår
  const [wpmComprehended, setwpmComprehended] = useState("");

  //State för att visa en text om att användarens resultat har sparats!
  const [formSubmitted, setFormSubmitted] = useState(false);

  //State för att generera ett random nummer för att slumpa text mellan 1-5
  const [randomNr, setRandomNr] = useState(1);

  //Login error if the password is incorrect
  const [loginError, setLoginError] = useState(false);
  const handleLoginError = () => {
    setLoginError(true);
  };

  

  //Error if email exists when trying to register
  const [emailExists, setEmailExists] = useState(false);

  //
  const[resetSuccessMessage,setResetSuccessMessage] = useState("");
  const[resetErrorMessage,setResetErrorMessage] = useState("");

  //State for resetting forgotten password 
  const [resetEmail, setResetEmail] = useState("");

  //State för att reseta allting ifall användaren vill börja om testet
  const handleRestartClick = () => {
    if(!customer){
      setAgeRange(ageRange);
      setAskToBecomeCustomer(false)
      setIntroQuestionsDone(false)
    }
    if(customer){
      setSignedIn(true)
      setAskToBecomeCustomer(true);
      setAge(age)
      setAgeRange(ageRange);
      setIntroQuestionsDone(true)
      setRegisterLogin("Login")
      setIntroQuestionsDone(false)
      setHasSubmitedQuestions(false)
      setLanguageSelected(false);
    }
    setIsStarted(false);
    setIsStopped(false);
    setHasSubmitedQuestions(false);
    setWpm(0);
    setLevel("level1")
    setAverageWpm("");
    setFunStatistics("");
    setQuestions([]);
    setCorrectAnswers([]);
    setAmountOfRightQuestions(0);
    if(age > 18){
      setValidToSaveContactInfo(true);
    }else{
      setValidToSaveContactInfo(false);
    }
    setShowForm(false);
  }

//Reset password method 
const handleResetPassword = async (e) => {
  e.preventDefault();
  if (!resetEmail || !resetEmail.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")) {
    alert("Ange en giltig e-postadress för att återställa lösenordet.");
    return;
  }
  try {
    const exists = await firebase.checkIfEmailExists(resetEmail);
    
    if (exists) {
      await firebase.resetPassword(resetEmail);
      setResetSuccessMessage("En återställning länk har skickats till din e-postadress! Kontrollera skräppost.");
      setResetErrorMessage(null);
    } else {
      setResetErrorMessage("E-postadressen finns inte i vår databas!");
      setResetSuccessMessage(null);
    }
  } catch (error) {
    console.error(error);
    setResetErrorMessage("Ett fel uppstod vid återställning av lösenordet!");
    setResetSuccessMessage(null);
  }
};
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
  }

    //skickar request till severn.js som startar tiden
    const handleStartTimer = () => {
      server.startTimer();
    }
    
    //skickar request till server.js som stoppar tiden och räknar ut wpm samt returnerar wpm
    const handleStopTimer = async () => {
      const wpm = await server.stopTimer(level, ageRange, randomNr, language);
      setWpm(wpm);
    };

    //Metod för att generera ett nummer mellan 1-5 för att texten som användaren ska läsa ska vara slumpad.
    const generateRandomNumber = (callback) => {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      callback(randomNumber);
    };

    //Metod för att hantera start av testet.
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
      
      const text = await firebase.getText(level, ageRange, ""+randomNr, language);
      const [answerValues] = [Object.values(await firebase.getCorrectAnswers(level, ageRange, ""+randomNr, language))];
      const [questionsValues] = [Object.values(await firebase.getQuestions(level, ageRange, ""+randomNr, language))];
      setText(text);
      setQuestions(questionsValues);
      setCorrectAnswers(answerValues)
      if(parseInt(age) >= 16 && setAgreement){
        setValidToSaveContactInfo(true)
      }
      setIntroQuestionsDone(true)
      setIsStopped(false);
      scrollToTop();
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
      scrollToTop();
      handleStopTimer();
    };

  //Metod för att visa rolig statistik beroende på ålder
  const displayStatistics = async () => {
    const response = await server.statistics(wpm,age)
      setFunStatistics(response[1])
      setImprovedFunStatistics(response[2])
      setAverageWpm(response[0])
  };

  //Metod för att hantera när användaren svarar på frågorna i formuläret den sparar ner svaren från användaren i en array sedan skickar den en post till servern som hämtar rättsvar
  //från databasen med "Level parametern" sedan returnerar servern de rätta svaren och vi jämnför användarens svar med de rätta svaren och räknar ut hur många % rätt användaren hade.  
  const handleFormSubmit = async ( answers) => {
    let amountOfQuestions = questions.length;
    let amountCorrect = 0;
    for (let i = 0; i < amountOfQuestions; i++) {
      if (correctAnswers.includes(answers[i])) {
        amountCorrect++;
      }
    }
    let percentageCorrect = (amountCorrect / amountOfQuestions) * 100;
    setwpmComprehended(wpm * (percentageCorrect / 100));
    setAmountOfRightQuestions(Math.round(percentageCorrect));
    setIsStopped(false);
    setHasSubmitedQuestions(true);
    scrollToTop();
    if (customer && signedIn) {
      firebase.saveResultCustomer(uid,level,wpm,Math.round(percentageCorrect))
    }
    displayStatistics();
  };
  
//Metod för att se vilken nivå som är vald
  const handleLevelChange = (event) => {
    const value = parseInt(event.target.value);
    if (value === 1) {
      setLevel("level1");
    } else if (value === 2) {
      setLevel("level2");
    } else if (value === 3) {
      setLevel("level3");
    }
    setFormSubmitted(false);
  };

  //Metod för att hantera användarens valda ålder
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


  //Metod för att se vilket språk som är valt
  const handleLanguageClick = (language) => {
    setLanguage(language);
    setLanguageSelected(true)
  };


  //Cheeks if user chooses to continue as guest or to register
  const handleVersionClick = (e) => {
    const value = e.target.value;
    if(value === 'Guest'){
      setRegisterLogin("Guest")
      setCustomer(false)
      setAskToBecomeCustomer(true)
    }
    if(value === "Register"){
      setRegisterLogin("Register")
    } 
    if(value === "Login"){
      setRegisterLogin("Login")
    }
  }

  //See if the user has checked the terms of agreement when starting a test.
  const handleAgreeChange = (event) => {
    setAgreement(event.target.checked);
  }

  //If user chooses to continue with register it will add user to DB and create a cookie with users email.
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (RegisterLogin === "Login") {
      try {
        const user = await firebase.loginUser(email, password);
        if (user) {
          setUid(user.uid);
          const { name, age, email } = await firebase.getUserDetails(user.uid);
          setName(name);
          setAge(age);
          setEmail(email)
          document.cookie = `email=${email}; max-age=86400; path=/`;
          document.cookie = `id=${user.uid}; max-age=86400; path=/`;
          document.cookie = `name=${name}; max-age=86400; path=/`;
          document.cookie = `age=${age}; max-age=86400; path=/`;
          document.cookie = `language=${language}; max-age=86400; path=/`;
          setSignedIn(true);
          setCustomer(true);
          setAskToBecomeCustomer(true);
          navigate(`/profile/${user.uid}`);
        } else {
          handleLoginError();
        }
      } catch (error) {
        console.error(error);
        // handle login error
      }
    } else {
      try {
        const user = await firebase.registerUser(email, password);
        if (user) {
          firebase.sendEmailVerification(user)
          setEmail(email)
          setName(name)
          setAge(age)
          setUid(user.uid);
          document.cookie = `email=${email}; max-age=86400; path=/`;
          document.cookie = `id=${user.uid}; max-age=86400; path=/`;
          document.cookie = `name=${name}; max-age=86400; path=/`;
          document.cookie = `age=${age}; max-age=86400; path=/`;
          document.cookie = `language=${language}; max-age=86400; path=/`;
          setSignedIn(true);
          setAskToBecomeCustomer(true);
          setCustomer(true);
          redirectToVerify(name,email,user.uid, age, language)
        } else {
          setEmailExists(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Metod för att skicka vidare användaren till att verifiera sin email vid registrering
  const redirectToVerify = (name, email, uid, age, language) => {
    navigate('/verify?redirected=true', {
      state: { name, email, uid, age, language }
    });
  };

//This function checks the url for the query signout if its true it will try to sign them out and then navigate back to "/"
async function handleSignout() {
  const searchParams = new URLSearchParams(location.search);
  const signout = searchParams.get("signout");
  if (signout === "true") {
    try {
      const success = await firebase.signOut();
      if (success) {
        setEmail("")
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "age=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setCustomer(false);
        setSignedIn(false);
        setRegisterLogin("Guest")
        setIsStarted(false);
        setIsStopped(false);
        setHasSubmitedQuestions(false);
        setWpm(0);
        setLevel("level1")
        setAverageWpm("");
        setFunStatistics("");
        setAgeRange("7-12");
        setQuestions([]);
        setCorrectAnswers([]);
        setAmountOfRightQuestions(0);
        setAskToBecomeCustomer(false)
        setIntroQuestionsDone(false)
        navigate("/")
        setTimeout(() => {
          document.location.reload();
        }, 100);   
      }
    } catch (error) {
      console.error(error);
    }

  }
}

//When user gets to "/" it will check if user has clicked on signout by calling the signout method.
useEffect(() => {
  handleSignout();
}, [location]);

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();


//useEffect to check if the user is a customer and if their email exists in the database
useEffect(() => {
async function getUserData() {
  //If all theese cookies exists it will set the states according to the cookies values.
  const ageCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('age='));
  const emailCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('email='));
  const idCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('id='));
  const nameCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('name='));
  if (ageCookie && emailCookie && idCookie && nameCookie) {
    const age = ageCookie.split('=')[1];
    const email = emailCookie.split('=')[1];
    const id = idCookie.split('=')[1];
    const name = nameCookie.split('=')[1];
    setRegisterLogin("Login");
    setEmail(email);
    setName(name);
    setAge(age);
    setUid(id);
    setCustomer(true);
    setAskToBecomeCustomer(true);
    setSignedIn(true);
    
  } else {
    //If only the uid cookie exists it will get the userinfo from DB
    const uidCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('id='));
    if (uidCookie && uidCookie.split('=')[1]) {
      const uid = uidCookie.split('=')[1];
      try {
        const exists = await firebase.checkIfUserExists(uid);
        if (exists) {
          const { name, age, email, id } = await firebase.getUserDetails(uid);
          setRegisterLogin("Login")
          setEmail(email)
          setName(name);
          setAge(age);
          setUid(id);
          setCustomer(true);
          setAskToBecomeCustomer(true);
          setSignedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

  getUserData();
}, []);



//useEffect för att uppdatera åldersspannet när åldern uppdateras 
useEffect(() => {
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
  setAgeRange(ageRange);
}, [handleRestartClick]);


  
return (
  <div >
    {signedIn && customer &&(
      <NavbarR uid={uid} email={email} name={name} />
    )}

    {!signedIn && !customer &&(
      <NavbarR uid={"Not provided"} email={"Not provided"}/>
    )}
    
  
  <div className='container'>
        <div className='reading-box'>

        {!languageSelected &&
            <div >              
              <div style={{display: "flex"}}>
              <img src={SE} alt="Swedish flag" style={{ marginRight: '10%' }} onClick={() => handleLanguageClick('SV')} />
              <img src={GB} alt="British flag" style={{ }} onClick={() => handleLanguageClick('ENG')} />
              </div>

            </div>
          }

        {languageSelected && !askToBecomeCustomer && RegisterLogin == "Guest" &&
         <WelcomePage handleVersionClick={handleVersionClick} customer={customer} checkIcon={checkIcon} readingIcon={readingIcon} language={language}/>
        }
           
        {RegisterLogin === "Register" && !signedIn &&(
        <Register handleEmailSubmit={handleEmailSubmit} email={email} handleVersionClick={handleVersionClick} setEmail={setEmail} setName={setName} setAge={setAge} age={age} name={name} setPassword={setPassword} emailExists={emailExists} language={language}/>
        )}

        {RegisterLogin === "Login" && !signedIn &&(
          <Login handleEmailSubmit={handleEmailSubmit} email={email} handleVersionClick={handleVersionClick} setEmail={setEmail} setPassword={setPassword} password={password} loginError={loginError} handleResetPassword={handleResetPassword} setResetEmail={setResetEmail} resetEmail={resetEmail} resetErrorMessage={resetErrorMessage} resetSuccessMessage={resetSuccessMessage} language={language}/>
        )}
    

        {!isStarted && !isStopped && !hasSubmitedQuestions && !introQuestionsDone && languageSelected && askToBecomeCustomer &&
          <LevelSelector selectedAnswer={selectedAnswer} handleIntroAnswerClick={handleIntroAnswerClick} age={age} handleAgeChange={handleAgeChange} customer={customer} handleLevelChange={handleLevelChange} handleAgreeChange={handleAgreeChange} handleStartClick={handleStartClick} language={language} />
        }
             
       {isStarted && !isStopped && introQuestionsDone && !hasSubmitedQuestions && 
        <ReadingText handleStopClick={handleStopClick} text={text} language={language}/>
        }


        { isStopped && !hasSubmitedQuestions &&
          <QuestionsForm handleFormSubmit={handleFormSubmit} questions={questions} language={language} />
         } 


        { hasSubmitedQuestions  && 
          <Statistics wpm={wpm} averageWpm={averageWpm} amountOfRightQuestions={amountOfRightQuestions} wpmComprehended={wpmComprehended} handleRestartClick={handleRestartClick} funStatistics={funStatistics} improvedFunStatistics={improvedFunStatistics} speakerIcon={speakerIcon} language={language} />
        }



                  </div>   
                </div>      
            </div>
            );
                    
  
  }
export default Content;
