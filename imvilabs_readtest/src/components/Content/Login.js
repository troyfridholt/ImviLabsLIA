import React, { useState } from 'react';

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
}) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [successText, showSuccessText] = useState(false)
  const [failText, showFailText] = useState(false)

  const showResetPassword = () => {
    setResetPassword(true);
  };

  //Fixa så att felmeddelande visas när man anigivt fel epost

  return (
    <div className='RegisterLoginContainer'> 
      <div className='LoginContainer'>
        <div className='RegisterForm'>
        <h1 className='RegisterHeader'>{resetPassword ? "Återställ lösenord" : "Logga in"}</h1>
        <h2 className={successText ? "" : "hidden"} style={{color: "green", marginBottom: "2%", fontSize: "14px"}}>Ett mail med instruktioner för att återställa lösenord har skickats.</h2>
        <h2 className={failText ? "" : "hidden"} style={{color: "red", marginBottom: "2%", fontSize: "14px"}}>Den angivna mailadressen finns inte registerad i våran databas</h2>
          {resetPassword ? (
            <div className="RegisterFormDiv2">
              <input
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                placeholder="Ange din e-postadress"
                required
                type="email"
                value={resetEmail || ''}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button className="LoginFormButton2" type="button" onClick={handleResetPassword}>
                Skicka
              </button>
              <p className='LoginParagraph2'>Tillbaka till <button onClick={() => setResetPassword(false)}>Logga in</button></p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <div className='RegisterFormDiv'>
                <label htmlFor="">E-post <span>*</span></label>
                <input 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                  placeholder="E-post" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className='RegisterFormDiv'>
                <label htmlFor="">Lösenord <span>*</span></label>
                <input 
                  placeholder="Lösenord" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className={loginError ? "error" : ""}
                />
              </div>
              {loginError && <div className="error-message">Felaktigt användarnamn eller lösenord</div>}
              <button className='LoginFormButton' type='submit'>Logga in</button>
              <div className='LoginParagraph2Div'>
                <p className='LoginParagraph2'>Inget konto? <button value="Register" onClick={handleVersionClick}>Registrera</button></p>
                <p className='LoginParagraph2'>Glömt lösenord? <button onClick={showResetPassword}>Återställ</button></p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;