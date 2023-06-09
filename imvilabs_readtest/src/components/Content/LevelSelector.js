import React from 'react'
import useVerifyEmailRedirect from './useVerifyEmailRedirect';
const LevelSelector = ({
    selectedAnswer,
    handleIntroAnswerClick,
    age, 
    handleAgeChange,
    customer, 
    handleLevelChange, 
    handleAgreeChange, 
    handleStartClick,
    language,
    verified
  }) => {

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();

  return (
      <div className="level-selector">
            
            <div className="panel">
              <div className='panelLabelDiv'>
              <label className='panelLabel'>{language === "SV" ? "Vem är det som gör testet?" : "Who does the test?"}</label>
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
              {language === "SV" ? "Jag gör testet själv" : "I do the test myself"}
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
              {language === "SV" ? "Jag gör testet tillsammans med mitt barn" : "I take the test together with my child"}
              </label>
              </div>

            </div>

              <div className='level-div'>
              <div className="age-container">
                <label>{language === "SV" ? "Testtagarens ålder" : "Age of the test taker"} <span>*</span></label>
                <input
                  type="number"
                  className='age'
                  placeholder='Ålder'
                  value={age || null}
                  min="1"
                  max="99"
                  required
                  pattern="[0-9]*"
                  onChange={handleAgeChange}
                />
              </div>
              <div className='level-container'>
              <label>{language === "SV" ? "Svårighetsgrad" : "Level of difficulty"}</label>
              {!customer && verified === "true" ?(
                  <select className='level' onChange={handleLevelChange} required>
                    <option value="1">{"Lätt"}</option>
                  </select>
                ) : (
                  <select className='level' onChange={handleLevelChange} required>
                    <option value="1">{"Lätt"}</option>
                    <option value="2">{"Medel"}</option>
                    <option value="3">{"Svår"}</option>
                  </select>
                )}
              </div>

              </div>
              <div className="AgreeDiv">
              <input
                  type="checkbox"
                  name="AgreeBox"
                  value="Agree"
                  defaultChecked
                  onChange={handleAgreeChange}
                />
              <label>
              {language === "SV" ? "Jag samtycker till" : "I agree to"} <a href='https://imvilabs.com/allmanna-villkor/'>{language === "SV" ? "Imvis vilkor" : "Imvis terms and conditions"}</a>
              </label>
              </div>
              <button className='start-button' onClick={handleStartClick}>{language === "SV" ? "Starta testet" : "Start the test"}</button>
            </div>
  )
}

export default LevelSelector
