import React from 'react'

const LevelSelector = ({
    selectedAnswer,
    handleIntroAnswerClick,
    age, 
    handleAgeChange,
    customer, 
    handleLevelChange, 
    handleAgreeChange, 
    handleStartClick 
  }) => {
  return (
      <div className="level-selector">
            
            <div className="panel">
              <div className='panelLabelDiv'>
              <label className='panelLabel'>Vem är det som gör testet?</label>
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
                Jag gör testet själv
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
              Jag gör testet tillsammans med mitt barn
              </label>
              </div>

            </div>

              <div className='level-div'>
              <div className="age-container">
                <label>Testtagarens ålder <span>*</span></label>
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
              <label>Svårighetsgrad</label>
              {!customer ? (
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
              Jag samtycker till <a href='https://imvilabs.com/allmanna-villkor/'>Imvis vilkor</a>
              </label>
              </div>
              <button className='start-button' onClick={handleStartClick}>Starta testet</button>
            </div>
  )
}

export default LevelSelector
