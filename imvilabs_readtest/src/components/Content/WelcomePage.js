import React from 'react'

const WelcomePage = ({handleVersionClick,customer, checkIcon, readingIcon }) => {

  return (
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
  )
}

export default WelcomePage
