import React, { useState } from 'react';
import useVerifyEmailRedirect from './useVerifyEmailRedirect';
const Login = ({ 
  handleEmailSubmit, 
  handleVersionClick, 
  email, 
  setEmail, 
  setPassword, 
  password, 
  loginError, 
  handleResetPassword, 
  resetEmail ,
  setResetEmail,
  resetErrorMessage,
  resetSuccessMessage,
  language
}) => {
  const [resetPassword, setResetPassword] = useState(false);

  const showResetPassword = () => {
    setResetPassword(true);
  };

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();

  //Fixa så att felmeddelande visas när man anigivt fel

  return (
    <div className='RegisterLoginContainer'> 
      <div className='LoginContainer'>
        <div className='RegisterForm'>
        <h1 className='RegisterHeader'>{resetPassword ? "Återställ lösenord" : "Logga in"}</h1>
        <h2 className={resetSuccessMessage ? "" : "hidden"} style={{color: "green", marginBottom: "2%", fontSize: "14px", textAlign: "center"}}>{resetSuccessMessage}</h2>
        <h2 className={resetErrorMessage ? "" : "hidden"} style={{color: "red", marginBottom: "2%", fontSize: "14px", textAlign: "center"}}>{resetErrorMessage}</h2>
          {resetPassword ? (
            <div className="RegisterFormDiv2">
              <input
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder={language === "SV" ? "Ange din e-postadress" : "Enter your e-mail"}
                required
                type="email"
                value={resetEmail || ''}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button className="LoginFormButton2" type="button" onClick={handleResetPassword}>
                Skicka
              </button>
              <p className='LoginParagraph2'>{language === "SV" ? "Tillbaka till" : "Back to"} <button onClick={() => setResetPassword(false)}>{language === "SV" ? "Logga in" : "Sign in"}</button></p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} autoComplete='off'>
              <div className='RegisterFormDiv'>
                <label htmlFor="">{language === "SV" ? "E-post" : "Email"}<span>*</span></label>
                <input 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className='RegisterFormDiv'>
                <label htmlFor="">{language === "SV" ? "Lösenord" : "Password"} <span>*</span></label>
                <input  
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className={loginError ? "error" : ""}
                />
              </div>
              {loginError && <div className="error-message">{language === "SV" ? "Felaktigt användarnamn eller lösenord" : "Wrong username or password"}</div>}
              <button className='LoginFormButton' type='submit'>{language === "SV" ? "Logga in" : "Sign in"}</button>
              <div className='LoginParagraph2Div'>
                <p className='LoginParagraph2'>{language === "SV" ? "Inget konto?" : "No account?"} <button value="Register" onClick={handleVersionClick}>{language === "SV" ? "Registrera" : "Register"}</button></p>
                <p className='LoginParagraph2'>{language === "SV" ? "Glömt lösenord?" : "Forgot password?"} <button onClick={showResetPassword}>{language === "SV" ? "Återställ" : "Reset"}</button></p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;