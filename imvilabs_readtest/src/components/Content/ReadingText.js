import React from 'react'
import useVerifyEmailRedirect from './useVerifyEmailRedirect';
const ReadingText = ({handleStopClick, text, language}) => {

  //metod för att göra breaklines i lästexten  
  const createMarkupText = () => {
    return { __html: text.replace(/</g, "<br/> <br/>") };
  };

    //Method that checks if the user has a cookie called "verifyEmail" set to false if then it will redirect back the user to /verify
    useVerifyEmailRedirect();

  return (
    <div className='test'>
    <div class="parent-container">
      <div className='readingTextDiv'>
        <p className='readingText' dangerouslySetInnerHTML={createMarkupText()} />
        <div className='stop-buttonDiv'>
        <button className='stop-button' onClick={handleStopClick}>{language === "SV" ? "Stopp" : "Stop"}</button>
        </div>
      </div>

      </div>
    </div>

  )
}

export default ReadingText
