import React, { useState, useEffect } from 'react';

const QuestionsForm = ({ questions, handleFormSubmit  }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);


  const handleNextQuestion = (e) => {
    e.preventDefault();
    if (selectedOption !== "") {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswers([...answers, selectedOption]);
        setSelectedOption("");
      } else {
        setAnswers([...answers, selectedOption]);
        setSelectedOption("");
      }
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (answers.length === questions.length) {
      handleFormSubmit(answers);
    }
  }, [answers])

  return (
    <div className="questionsContainer">
      <div className="questionsContainerHeader">
        <h1>
          Fråga {currentQuestion + 1} av {questions.length}
        </h1>
        <p>Välj rätt svar baserat på din läsning.</p>
      </div>
      <form className="question-form" >
        <div key={currentQuestion} className="questions">
          <p>{questions[currentQuestion].question_text}</p>
          <div className="questionsRadioAndLabel">
            <input
              required
              type="radio"
              id={`option-a`}
              name={`question-${currentQuestion}`}
              value={questions[currentQuestion].a}
              checked={selectedOption === questions[currentQuestion].a}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-a`}>{questions[currentQuestion].a}</label>
          </div>
          <div className="questionsRadioAndLabel">
            <input
              required
              type="radio"
              id={`option-b`}
              name={`question-${currentQuestion}`}
              value={questions[currentQuestion].b}
              checked={selectedOption === questions[currentQuestion].b}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-b`}>{questions[currentQuestion].b}</label>
          </div>
          <div className="questionsRadioAndLabel">
            <input
              required
              type="radio"
              id={`option-c`}
              name={`question-${currentQuestion}`}
              value={questions[currentQuestion].c}
              checked={selectedOption === questions[currentQuestion].c}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-c`}>{questions[currentQuestion].c}</label>
          </div>
        </div>
          <button
            className="submitQuestions"
            onClick={handleNextQuestion}
            disabled={selectedOption === ""}
          > {currentQuestion === questions.length-1 ? "Svara och se resultat" : "Nästa"}</button>

      </form>
    </div>
  );
};

export default QuestionsForm;