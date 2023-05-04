import React from 'react'

const Statistics = ({wpm, averageWpm, amountOfRightQuestions, wpmComprehended, handleRestartClick, funStatistics, improvedFunStatistics, speakerIcon}) => {
      //Metod för att göra breaklines i funStatistics texten.
  const createMarkup = () => {
    return {__html: funStatistics.replace(/\n+/g, "<br/>")};
  };

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
            <h2>{"LÄSHASTIGHET"}</h2>
            <h1 className='statisticsValueWPM'>{wpm}</h1>
            <p>{"ORD PER MINUT"}</p>
            </div>

            <div className='statisticsInfo2'>
            <p className='statisticsValue'>
            {`Genomsnitt ord per minut` +  ` för din ålder är ${averageWpm}`}
            </p>
        </div>
        </div>
        <div className='statisticsRow'>
            <div className='statisticsInfo1'>
            <h2>{"LÄSFÖRSTÅELSE"}</h2>
            <h1 className='statisticsValueWPMCOMPREHENSION'>{`${Math.round(amountOfRightQuestions)}%`}</h1>
            <p>{"RÄTT PÅ FRÅGORNA"}</p>
            </div>

            <div className='statisticsInfo2'>
            <p className='statisticsValue'>
            {`Du hade ${Math.round(amountOfRightQuestions)}% rätt på frågorna`}
            <br />
            {`Läser du ${wpm} ord per minut, \n så förstår du ${Math.round(wpmComprehended)} av de orden.`}
        </p>
            </div>
        </div>
                            
        </div>
        <div className='statisticsFunFactHeader'>
            <div>
            <img src={speakerIcon} className='SpeakerIcon' alt="" />
            <label >Visste du</label>
            </div>
        </div>

        <div className='statisticsFunFact'>
        <h2 className='statisticsValue' dangerouslySetInnerHTML={createMarkup()} />
        </div>

        <div className='statisticsFunFact2'>
        <h2 className='statisticsValue2' dangerouslySetInnerHTML={createMarkup2()} />
        </div>

        </div>
        <button className='restartTestButton' onClick={handleRestartClick}>{"STARTA OM"}</button>
    </div>
  )
}

export default Statistics
