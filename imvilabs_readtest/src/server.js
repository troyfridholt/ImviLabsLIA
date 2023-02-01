import Firebase from './firebase/Firebase';
let startTime = 0;
const firebase = new Firebase();

class Server {

startTimer() {
startTime = Date.now();
}

stopTimer(level, age) {
const elapsedTime = Date.now() - startTime;
const wpm = this.calculateWPM(elapsedTime, level, age);
return elapsedTime;
}


calculateWPM(elapsedTime, level, age) {
  const text = firebase.getText(level, age);
  const words = text.toString().split(' ').length;
  const minutes = elapsedTime / 60000;
  const wpm = Math.round(words / minutes);
  return wpm;
  }

  
statistics(wpm, age) {
const text = firebase.getstatisticsInfo(age, wpm);
return text
}

submitQuestions(level, age, answers) {
  const correctAnswers = firebase.getCorrectAnswers(level, age);
  const result = {};
  let correctAnswerCount = 0;
  for (const key of Object.keys(answers)) {
      result[key] = Object.is(answers[key], correctAnswers[key]);
      if (result[key]) {
          correctAnswerCount++;
      }
  }
  return correctAnswerCount;
}

}

export default Server;