import Firebase from './firebase/Firebase';
let startTime = 0;
let elapsedTime = 0;
const firebase = new Firebase();

class Server {

startTimer() {
startTime = Date.now();
}

async stopTimer(level, age, randomNr, language) {
elapsedTime = Date.now() - startTime;
const wpm = await this.calculateWPM(elapsedTime, level, age, randomNr, language);
return wpm;
}


async calculateWPM(elapsedTime, level, age, randomNr, language) {
  const text = await firebase.getText(level, age, ""+randomNr, language);
  const words = text.toString().split(' ').length;
  const minutes = elapsedTime / 60000;
  const wpm = Math.round(words / minutes);
  return wpm;
}

  
async statistics(wpm, age) {
const text = await firebase.getstatisticsInfo(age, wpm);
return text
}


}

export default Server;