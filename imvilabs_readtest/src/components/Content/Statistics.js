import React from 'react'
import useVerifyEmailRedirect from './useVerifyEmailRedirect';
const Statistics = ({wpm, averageWpm, amountOfRightQuestions, wpmComprehended, handleRestartClick, funStatistics, improvedFunStatistics, speakerIcon, language}) => {
      //Metod för att göra breaklines i funStatistics texten.
  const createMarkup = () => {
    return {__html: funStatistics.replace(/\n+/g, "<br/>")};
  };

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();

    //Metod för att göra breaklines i den förbättrade funStatistics texten.
    const createMarkup2 = () => {
      return {__html: improvedFunStatistics.replace(/\n+/g, "<br/>")};
    };
  return (
    <div className='statisticsDiv'>
        <div className='statisticsContent'>
        <div className='testStatistics'>
        <div className='statisticsRow'>
            <div className='statisticsInfo1'>
            <h2>{language === "SV" ? "LÄSHASTIGHET" : "READING SPEED"}</h2>
            <h1 className='statisticsValueWPM'>{wpm}</h1>
            <p>{language === "SV" ? "ORD PER MINUT" : "WORDS PER MINUTE"}</p>
            </div>

            <div className='statisticsInfo2'>
            <p className='statisticsValue'>
            {language === "SV" ? `Genomsnitt ord per minut` +  ` för din ålder är ${averageWpm}` : `Average words per minute` + ` for your age is ${averageWpm}`}
            </p>
        </div>
        </div>
        <div className='statisticsRow'>
            <div className='statisticsInfo1'>
            <h2>{language === "SV" ? "LÄSFÖRSTÅELSE" : "READING COMPREHENSION"}</h2>
            <h1 className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</h1>
            <p>{language === "SV" ? "Rätt på frågorna" : "Right on the questions"}</p>
            </div>

            <div className='statisticsInfo2'>
            <p className='statisticsValue'>
            {language === "SV" ? `Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna` : `You were ${Math.round(amountOfRightQuestions)}% right on the questions`}
            
            <br />
            {language === "SV" ? `Läser du ${wpm} ord per minut, \n så förstår du ${Math.round(wpmComprehended)} av de orden.` : `If ​​you read ${wpm} words per minute, \n you understand ${Math.round(wpmComprehended)} of those words.`}
            
        </p>
            </div>
        </div>
                            
        </div>
        <div className='statisticsFunFactHeader'>
            <div>
            <img src={speakerIcon} className='SpeakerIcon' alt="" />
            <label >{language === "SV" ? "Visste du" : "Did you know"}</label>
            </div>
        </div>

        <div className='statisticsFunFact'>
        <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
        </div>

        <div className='statisticsFunFact2'>
        <h2 className='statisticsValue2' dangerouslySetInnerHTML={createMarkup2()} />
        </div>

        </div>
        <button className='restartTestButton' onClick={handleRestartClick}>{language === "SV" ? "STARTA OM" : "RESTART"}</button>
    </div>
  )
}

export default Statistics
