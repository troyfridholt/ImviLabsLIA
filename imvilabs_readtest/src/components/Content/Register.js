import React, { useState } from 'react';
import useVerifyEmailRedirect from './useVerifyEmailRedirect';
const Register = ({ handleEmailSubmit, handleVersionClick, email, setEmail, setName, age, setAge, name, setPassword, emailExists, language}) => {
    
    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();


  return (
<div className='RegisterLoginContainer'> 
              <h1 className='RegisterHeader'>{language === "SV" ? "Vad kul att du vill registrera dig!" : "How nice that you want to register!"}</h1>

              <p className='RegisterParagraph1'>{language === "SV" ? "Nu kan du ha fler alternativ för testet och följa dina framsteg över tid!" : "Now you can have more options for the test and track your progress over time!"}</p>
              
              <div className='RegisterForm'>
              <form onSubmit={handleEmailSubmit} autoComplete='off'>

                <div className='RegisterFormDiv'>
                  <label htmlFor="">{language === "SV" ? "E-post" : "Email"} <span>*</span></label>
                  <input 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                  placeholder={language === "SV" ? "E-post" : "Email"} 
                  type="email" 
                  value={email} 
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                 />
                </div>

                <div className='RegisterFormDiv'>
                  <label htmlFor="">{language === "SV" ? "Förnamn" : "Firstname"} <span>*</span></label>
                  <input 
                  pattern="[a-zA-Z]+" 
                  placeholder={language === "SV" ? "Förnamn" : "Firstname"} 
                  type="text" 
                  value={name} 
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)} 
                  required 
                   />
                </div>

                <div className='RegisterFormDiv'>
                <label htmlFor="">{language === "SV" ? "Lösenord" : "Password"}<span>*</span></label>
                <input 
                    placeholder={language === "SV" ? "Lösenord" : "Password"}
                    type="password"  
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                </div>
                
                <div className='RegisterFormDiv'>
                  <label htmlFor="">{language === "SV" ? "Ålder" : "Age"} <span>*</span></label>
                  <input 
                  pattern="[0-9]*" 
                  min="1" 
                  max="99" 
                  placeholder={language === "SV" ? "Ålder" : "Age"} 
                  type="number" 
                  value={age || ''}
                  defaultValue={age}
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
                  <p>{language === "SV" ? "Jag är minst 18 år och jag godkänner" : "I am at least 18 years old and I agree"} <a href='https://imvilabs.com/allmanna-villkor/'>{language === "SV" ? "imvis villkor" : "imvis terms"}</a></p>
                </div>

                {emailExists && <p className="ErrorMessage">{language === "SV" ? "Ett konto med denna mailadress finns redan." : "An account with this email address already exists."}</p>}

                <button className='RegisterFormButton' type='submit'>{language === "SV" ? "Registrera" : "Register"}</button>
                
                <div className='LoginParagraph2Div'>
                <p className='LoginParagraph2'>{language === "SV" ? "Redan ett konto?" : "Already have an account?"} <button value="Login" onClick={handleVersionClick} >{language === "SV" ? "Logga in" : "Sign in"}</button></p>
                <p className='LoginParagraph2'>{language === "SV" ? "Fortsätt som" : "Continue as"} <button value="Guest" onClick={handleVersionClick}>{language === "SV" ? "Gäst" : "Guest"}</button></p>
                </div>
                
              </form>
              </div>
              


              </div>
  )
}

export default Register
