import { initializeApp, } from "firebase/app";
import {getFirestore, collection, query, where, getDoc, getDocs, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }


  //Query för att hämta text från databas
  async getText(level, age, randomNr) {
    const docRef = doc(this.db, "texts", age);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().levels
    return data[level]["text"+randomNr].text;
 }

  //Query för att hämta svar från databas
  async getCorrectAnswers(level, age, randomNr) {
    const docRef = doc(this.db, "texts", age);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().levels
    const amountOfAnswers = Object.values(data[level]["text" + randomNr].answers).length
    const correctAnswers = []
    for(let i = 1; i<amountOfAnswers+1; i++){
      correctAnswers.push(data[level]["text" + randomNr].answers["a"+i]);
    }
    return correctAnswers;
  }

  //Query för att hämta frågor från databas
  async getQuestions(level, age, randomNr) {
    const docRef = doc(this.db, "texts", age);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().levels
    return data[level]["text"+randomNr].questions;
  }

  //Sparar ner resultat i /users
  async saveResult(email, name, lastname, wpm, age, level, amountOfRightQuestions) {
    signInWithEmailAndPassword(this.auth, "noahnemhed@hotmail.com", "asd123456.")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
    })
    const date = new Date().toISOString().substring(0, 10);
    const result = {
      date,
      wpm,
      level,
      amountOfRightQuestions,
    };

    // Check if the user with the specified email already exists in the "users" collection
    const q = query(collection(this.db, "users"), where('__name__', "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      setDoc(doc(this.db, 'users', email), {
        userinfo:[
          {
            email: email
          }  ,
          {
            name: name
          },
          {
            lastname: lastname
          }  ,  
          {
            age: age
          }],
        results: [{test1: result}]
      });
    }
    // If the user exists, append the result to their document
    else {
      const usereDoc = doc(this.db, 'users', email)
      const resultSnap = await getDoc(usereDoc)
      const amountOfTestsDone = resultSnap.data().results.length;
      const newResults = [...resultSnap.data().results, { [`test${amountOfTestsDone + 1}`]: result }];
      await updateDoc((usereDoc), {
        results: newResults
      });
    }
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
            text.push("100-130.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Med din läshastighet ${wpm} ord per minut. \n
            Så tar det dig ${timmarAttLäsaFärdigt} timmar att läsa boken!`);
                break;

        case(age > 12 && age < 15):
            ordIText = 99750;
            timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
            text.push("130-150.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Med din läshastighet ${wpm} ord per minut. \n
            Så tar det dig ${timmarAttLäsaFärdigt} timmar att läsa boken!`);         
                break; 

        case(age >= 15 && age <= 18):
        ordIText = 99750;
        timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
        text.push("170-210.");
        text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
          Med din läshastighet ${wpm} ord per minut. \n
          Så tar det dig ${timmarAttLäsaFärdigt} timmar att läsa boken!`);
            break;  

        case(age > 18):
        ordIText = 99750;
        timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
        text.push("200-260.");
        text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
          Med din läshastighet ${wpm} ord per minut. \n
          Så tar det dig ${timmarAttLäsaFärdigt} timmar att läsa boken!`);
            break;
        
        default:
            text.push("170-210.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Med din läshastighet ${wpm} ord per minut. \n
            Så tar det dig ${timmarAttLäsaFärdigt} timmar att läsa boken!`);
             break;
    }
    return text;
}


}



  
  
export default Firebase;