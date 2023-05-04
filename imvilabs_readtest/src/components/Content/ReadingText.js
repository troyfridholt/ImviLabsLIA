import React from 'react'

const ReadingText = ({handleStopClick, text}) => {

  //metod för att göra breaklines i lästexten  
  const createMarkupText = () => {
    return { __html: text.replace(/</g, "<br/> <br/>") };
  };

  return (
    <div className='test'>
    <div class="parent-container">
      <div className='readingTextDiv'>
        <p className='readingText' dangerouslySetInnerHTML={createMarkupText()} />
        <div className='stop-buttonDiv'>
        <button className='stop-button' onClick={handleStopClick}>Stopp</button>
        </div>
      </div>

      </div>
    </div>

  )
}

export default ReadingText
