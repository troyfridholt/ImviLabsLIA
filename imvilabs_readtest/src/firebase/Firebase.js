import { getDatabase, ref, onValue, set, push, get, update, runTransaction  } from "firebase/database";
import { initializeApp } from "firebase/app";

class Firebase {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyC6m6ocr9bAgPP2Mp4Rm5cLxIiRhpKC9RE",
      authDomain: "readingtest-85a9e.firebaseapp.com",
      databaseURL: "https://readingtest-85a9e-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "readingtest-85a9e",
      storageBucket: "readingtest-85a9e.appspot.com",
      messagingSenderId: "365748144242",
      appId: "1:365748144242:web:256c330c77fcc03125daeb",
      measurementId: "G-DLXW6KD3XY"
    };

    this.app = initializeApp(this.firebaseConfig);
    this.db = getDatabase(this.app);
  }


  //Query för att hämta text från databas
  async getText(level, age, randomNr) {
    return new Promise((resolve) => {
      onValue(ref(this.db, `texts/age/${age}/${level}/text${randomNr}/text`), (snapshot) => {
        
        resolve(snapshot.val());
      }, {
        onlyOnce: true
      });
    });
  }

  //Query för att hämta svar från databas
  async getCorrectAnswers(level, age, randomNr) {
    return new Promise((resolve) => {
      onValue(ref(this.db, `texts/age/${age}/${level}/text${randomNr}/answers`), (snapshot) => {
        const answers = snapshot.val();
        if (!answers) {
          resolve(null);
        }
        resolve(answers);
      }, {
        onlyOnce: true
      });
    });
  }

  //Query för att hämta frågor från databas
  async getQuestions(level, age, randomNr) {
    return new Promise((resolve) => {
      onValue(ref(this.db, `texts/age/${age}/${level}/text${randomNr}/questions`), (snapshot) => {
        const questions = snapshot.val();
        if (!questions) {
          resolve(null);
        }
        resolve(questions);
      }, {
        onlyOnce: true
      });
    });
  }

  //Sparar ner resultat i /users
  async saveResult(email, name, lastname, wpm, age, level, amountOfRightQuestions) {
    const date = new Date().toISOString().substring(0, 10);
    const result = {
      date,
      wpm,
      amountOfRightQuestions,
      level
    };
    const userId = await this.getUserId(email);
    if (!userId) {
      const newUserId = push(ref(this.db, 'users')).key;
      await set(ref(this.db, `users/${newUserId}`), {
        email,
        name,
        lastname,
        age,
        results: {
          ["test1"]: result
        }
      });
    } else {
      const resultsRef = ref(this.db, `users/${userId}/results`);
      const resultsSnapshot = await get(resultsRef);
      const existingResults = resultsSnapshot.val();
      let testCount = 0;
      for (const key in existingResults) {
        if (key.startsWith("test")) {
          testCount++;
        }
      }
      let newTestKey = `test${testCount + 1}`;
      await update(resultsRef, {
        [newTestKey]: result
      });
    }
  }
  
  //Metod som letar efter ifall en användare finns med i databasen med email som parameter.
  async getUserId(email) {
    const usersRef = ref(this.db, `users`);
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    let userId = null;
    for (const id in users) {
      if (users[id].email === email) {
        userId = id;
        break;
      }
    }
    if(userId === null){
      return "no user found."
    }
    return userId;
  }

  //Metod som hämtar användarens senaste 3 resultat.
  async getUserLast3Results(email) {

    const userId = this.getUserId(email)

    return new Promise((resolve, reject) => {
      onValue(ref(this.db, `users/${userId}/results`), (snapshot) => {
        const results = Object.values(snapshot.val());
        if (!results) {
          resolve({Resultat: "Fanns inga resultat."});
        }
        const numberOfResults = Math.min(results.length, 3);
        resolve({Resultat: results.slice(0, numberOfResults)});
      }, {
        onlyOnce: true
      });
    });
  }
   



  //Hårdkodat just nu skall implementeras i databas.
   getstatisticsInfo(age, wpm){
    let text = [];
    let ordIText;
    let timmarAttLäsaFärdigt;

    age = parseInt(age);
    wpm = parseInt(wpm)

    switch(true){
        case(age > 0 && age <= 12):
            ordIText = 76944;
            timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
            text.push("Genomsnitt ord per minut för din ålder är 100-130.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Ifall du läser ${wpm} ord per minut. \n
            Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`);
                break;

        case(age > 12 && age < 15):
            ordIText = 99750;
            timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
            text.push("130-150.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Ifall du läser ${wpm} ord per minut. \n
            Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`);          
                break; 

        case(age >= 15 && age <= 18):
        ordIText = 99750;
        timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
        text.push("170-210.");
        text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
        Ifall du läser ${wpm} ord per minut. \n
        Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`);
            break;  

        case(age > 18):
        ordIText = 99750;
        timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
        text.push("200-260.");
        text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
        Ifall du läser ${wpm} ord per minut. \n
        Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`);
            break;
        
        default:
            text.push("170-210.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Ifall du läser ${wpm} ord per minut. \n
            Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`);
             break;
    }
    return text;
}


}



  
  
export default Firebase;