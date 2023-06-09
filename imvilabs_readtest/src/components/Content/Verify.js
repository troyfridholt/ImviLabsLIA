import React, { useState, useEffect } from 'react';
import Firebase from '../../firebase/Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Verify = () => {
  const firebase = new Firebase();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, uid, age, language } = location.state || {};

  const [verificationStatus, setVerificationStatus] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  //Method that gets the value of the provided cookie name
  const getCookieValue = (cookieName) => {
    return Cookies.get(cookieName) || '';
  };



  const handleSendVerify = async () => {
    const user = await firebase.getCurrentUser();
    firebase.sendEmailVerification(user);
    setVerificationStatus('success');
    setVerificationMessage(language === "SV" ? `Vi har skickat ett verifierings mail till ${email}` : `We have sent a verification email to ${email}`);
  };

  const handleCheckVerified = async () => {
    const user = await firebase.getCurrentUser();

    try {
      const isVerified = await firebase.checkIfEmailIsVerified(user);
      let updatedEmail = getCookieValue('email') || email;
      let updatedName = getCookieValue('name') || name;
      let updatedAge = getCookieValue('age') || age;
      let updatedUid = getCookieValue('id') || uid;
      let updatedLanguage = getCookieValue('language') || language;
      console.log(updatedEmail,updatedAge,updatedName,updatedUid,updatedLanguage)
      if (isVerified) {
        firebase.addUserToDB(updatedEmail, updatedName, updatedAge, updatedUid, updatedLanguage);
        Cookies.set('verifyEmail', 'true', { path: '/' });
        Cookies.remove('verifyEmail', { path: '/' });
        navigate(`/`);
      } else {
        setVerificationStatus('error');
        setVerificationMessage(language === "SV" ? 'Du har inte verifierat din mail' : 'You have not verified your email');
      }
    } catch (error) {
      console.error('Error checking email verification status:', error);
    }
  };

  // Useeffect to disable the user from manually going to /verify only allowing them to be redirected.
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const redirectFlag = queryParams.get('redirected');

    if (!redirectFlag) {
      navigate('/');
    }
  }, [location.search, navigate]);


  //Useeffect that sets a cookie (verifyEmail) to false so if the user manually goes to another / it will be redirected back to verify their email.
  useEffect(() => {
    document.cookie = 'verifyEmail=false; path=/';
  }, []);



  return (
    <div className="verifyContainer">
      {verificationStatus === 'success' && (
      <p className="greenText" style={{color: "green", marginBottom: "2%"}}>{verificationMessage}</p>
      )}
      {verificationStatus === 'error' && (
      <p className="redText" style={{color: "red", marginBottom: "2%"}}>{verificationMessage}</p>
      )}
      <h2 className="verifyText">
        {language === "SV" ? 'Ett mail med instruktioner för att verifiera e-post har skickats.' : 'Click "Verify" after following the instructions. Please check spam.'}
      </h2>
      <h2 className="verifyText">
        {language === "SV" ? 'Klicka på "Verifiera" knappen efter du följt instruktionerna.' : 'Click the "Verify" after following the instructions.'}
      </h2>
      <h2 className="verifyText">
        {language === "SV" ? 'Vänligen kontrollera skräppost.' : 'Please check spam.'}
      </h2>
      <div className="verifyDiv">
        <div className="">

          <button onClick={handleCheckVerified} className="VerifyButton">
          {language === "SV" ? 'Verifiera' : 'Verify'}
          </button>
        </div>
        <div className=''>
          <h2>{language === "SV" ? 'Inte fått något mail?' : "Didn't receive an email?"}</h2>
          <button onClick={handleSendVerify} className="VerifyButton">
           {language === "SV" ? 'Skicka länk' : "Send link"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Verify;

