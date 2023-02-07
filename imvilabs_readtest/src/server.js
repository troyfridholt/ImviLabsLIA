import Firebase from './firebase/Firebase';
let startTime = 0;
let elapsedTime = 0;
const firebase = new Firebase();

class Server {

startTimer() {
startTime = Date.now();
}

async stopTimer(level, age, randomNr) {
elapsedTime = Date.now() - startTime;
const wpm = await this.calculateWPM(elapsedTime, level, age, randomNr);
return wpm;
}


async calculateWPM(elapsedTime, level, age, randomNr) {
  const text = await firebase.getText(level, age, ""+randomNr);
  const words = text.toString().split(' ').length;
  const minutes = elapsedTime / 60000;
  const wpm = Math.round(words / minutes);
  return wpm;
}

  
async statistics(wpm, age) {
const text = await firebase.getstatisticsInfo(age, wpm);
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