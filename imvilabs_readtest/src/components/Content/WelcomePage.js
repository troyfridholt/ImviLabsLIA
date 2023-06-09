import React from 'react'
import useVerifyEmailRedirect from './useVerifyEmailRedirect';
const WelcomePage = ({handleVersionClick,customer, checkIcon, readingIcon, language }) => {

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();

  return (
    <div className='welcomePageContainer'>
    <img src={readingIcon}  className="readingImg" alt="" />
    <div className='welcomePageDiv'>
      <div>
      <div className='welcomeTextHeader'>
      <h1 className='welcomeText1'>{language === "SV" ? "Välkommen till imvis" : "Welcome to imvis"}</h1>
      <h1 className='welcomeText2'>{language === "SV" ? "Läshastighetstest" : "Speed reading test"}</h1>
      </div>

    <div className='welcomePageDiv2'>
    <p>
    {language === "SV" ? "Testet utvärderar din läsförståelse och mäter din lästhastighet i antal ord per minut. Du kommer att få läsa en text och sen kommer du svara på frågor. Om du testar gratis har du bara tillgång till den lätta nivån" 
    : "The test evaluates your reading comprehension and measures your reading speed in words per minute. You will receive read a text and then you will answer questions. If you test for free you only have access to the easy level"}
      </p>
    <p >
    {language === "SV" ? "Få den fullständiga testversionen som inkluderar:" : "Get the full version which includes:"}
      
    </p>
    </div>
    <div className='checkBoxDiv'>
      <div>
      <img src={checkIcon} alt="" />
      <p>{language === "SV" ? "Tre svårighetsgrader" : "Three levels of difficulty"}</p>
      </div>

      <div>
      <img src={checkIcon} alt="" />
      <p>{language === "SV" ? "Flera språkalternativ" : "Multiple language options"}</p>
      </div>

      <div>
      <img src={checkIcon} alt="" />
      <p>{language === "SV" ? "Mängd olika läsinnehåll" : "Lots of different reading content"}</p>
      </div>
    </div>
    </div>
      </div>
    
    <div className='welcomePageDiv3'>
    <p>
    {language === "SV" ? "Registrera dig med din e-post och följ dina framsteg över tid!" : "Sign up with your email and track your progress over time!"} 
    </p>
    </div>
    
    {!customer ? (
      <>
      <div className='welcomePageButtonsDiv'>
      <div className='RegisterGuestDiv'>
          <button onClick={handleVersionClick} className='registerButton' value="Register">
          {language === "SV" ? "Registrera" : "Register"} 
          </button>
          <button onClick={handleVersionClick} className='guestButton' value="Guest">
          {language === "SV" ? "Testa som gäst" : "Test as guest"} 
            </button>
        </div>
      </div>     
      <div className='AlreadyRegisterdDiv'>
        <button onClick={handleVersionClick} class="alreadyRegisredButton" value="Login"><span style={{color: "#606060"}}>{language === "SV" ? "Redan registrerad?" : "Already registred?"}</span>{language === "SV" ? "Logga in" : "Sign in"}</button>
        </div>  
        
      </>
    ) :
    
     (
      null

    )}

    </div>
  )
}

export default WelcomePage
