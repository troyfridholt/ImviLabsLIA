import React, { useState } from 'react';

const Register = ({ handleEmailSubmit, handleVersionClick, email, setEmail, setName, age, setAge, name, setPassword, emailExists}) => {
    


  return (
<div className='RegisterLoginContainer'> 
              <h1 className='RegisterHeader'>Vad kul att du vill registrera dig!</h1>

              <p className='RegisterParagraph1'>Nu kan du ha fler alternativ för testet och följa dina framsteg över tid!</p>
              
              <div className='RegisterForm'>
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
                  <label htmlFor="">Namn <span>*</span></label>
                  <input 
                  pattern="[a-zA-Z]+" 
                  placeholder="Namn" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                   />
                </div>

                <div className='RegisterFormDiv'>
                <label htmlFor="">Lösenord <span>*</span></label>
                <input 
                    placeholder="Lösenord" 
                    type="password"  
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                </div>
                
                <div className='RegisterFormDiv'>
                  <label htmlFor="">Ålder <span>*</span></label>
                  <input 
                  pattern="[0-9]*" 
                  min="1" 
                  max="99" 
                  placeholder="Ålder" 
                  type="number" 
                  value={age || ''}
                  onChange={(e) => setAge(e.target.value)} 
                  required 
                   />
                </div>

                <div className='RegisterFormCheckBoxParagraph'>
                  <input 
                  type="checkbox" 
                  name="RegisterCheckBox"
                  required
                 />
                  <p>Jag är minst 18 år och jag godkänner <a href='https://imvilabs.com/allmanna-villkor/'>imvis villkor</a></p>
                </div>

                {emailExists && <p className="ErrorMessage">Ett konto med denna mailadress finns redan.</p>}

                <button className='RegisterFormButton' type='submit'>Registrera</button>
                
                <div className='LoginParagraph2Div'>
                <p className='LoginParagraph2'>Redan ett konto? <button value="Login" onClick={handleVersionClick} >Logga in</button></p>
                <p className='LoginParagraph2'>Fortsätt som <button value="Guest" onClick={handleVersionClick}>Gäst</button></p>
                </div>
                
              </form>
              </div>
              


              </div>
  )
}

export default Register
