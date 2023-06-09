import { initializeApp, } from "firebase/app";
import {getFirestore, collection, query, where, getDoc, getDocs, addDoc, setDoc, doc, updateDoc, docs, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification   } from "firebase/auth";
import { useNavigate } from "react-router-dom";


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

async getCurrentUser(){
  var user = this.auth.currentUser;

if (user) {
return user;
} else {
  // No user is signed in
}
}  

//Register
async registerUser(email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    if (user) {
      // Send the email verification
      

      return user;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//Get current user
 getCurrentUser(){
  var user = this.auth.currentUser;

if (user) {
return user;
} else {
  // No user is signed in
}
}  


//Send email
async sendEmailVerification(user) {
  try {
    // Send email verification
    await sendEmailVerification(user);
    return true;
  } catch (error) {
    console.error('Error sending email verification:', error);
    return false;
  }
}

// Function to check if email is verified and update the database
async checkIfEmailIsVerified(user) {
  await user.reload();
  user = await this.auth.currentUser;
  // Check if the user's email is verified
  if (user.emailVerified) {
    try {
      return true;
    } catch (error) {
      console.error('Error updating verified status in the database:', error);
      return false;
    }
  } else {
    return false;
  }
}

    //Add a user to db with email, name, age
    async addUserToDB(email, name, age, id, language){
      // Create document for the user with the specified ID
      const userDocRef = doc(this.db, "users", id);
    
      // Check if the user document already exists in the "users" collection
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        // If user document does not exist, create a new document with userinfo subcollection
        await setDoc(userDocRef, {});
        const userinfoColRef = collection(userDocRef, "userinfo");
        await setDoc(doc(userinfoColRef, "info"), {
          email: email,
          name: name,
          age: age,
          id: id,
          language: language
        });
      }
    }



  // Log in with email, password
  async loginUser(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

 // Method to signout
async signOut() {
  try {
    await this.auth.signOut();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Method to resetpassword.
async resetPassword(resetEmail) {
  try {
    await sendPasswordResetEmail(this.auth, resetEmail)
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

  //Query för att hämta text från databas
  async getText(level, age, randomNr, language) {
    const docRef = doc(this.db, "TEXT"+language, age);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().levels
    return data[level]["text"+randomNr].text;
 }

  //Query för att hämta svar från databas
  async getCorrectAnswers(level, age, randomNr, language) {
    const docRef = doc(this.db, "TEXT"+language, age);
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
  async getQuestions(level, age, randomNr, language) {
    const docRef = doc(this.db, "TEXT"+language, age);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().levels
    return data[level]["text"+randomNr].questions;
  }

  //Save results to an already customer
  async saveResultCustomer(id, level, wpm, amountOfRightQuestions) {
    const date = new Date().toISOString().substring(0, 10);
    const result = {
      date,
      wpm,
      level,
      amountOfRightQuestions,
    };
  
    // Create reference to the user document with the specified ID
    const userDocRef = doc(this.db, "users", id);
    
    // Check if the user document already exists in the "users" collection
    const userDocSnapshot = await getDoc(userDocRef);
    if(result.wpm < 500){
      if (userDocSnapshot.exists()) {
        const resultsColRef = collection(userDocRef, "results");
        const resultsSnapshot = await getDocs(resultsColRef);
        const numTestDocs = resultsSnapshot.docs.length;
        if (numTestDocs === 0) {
          await setDoc(doc(resultsColRef, "test1"), result);
        } else {
          await setDoc(doc(resultsColRef, `test${numTestDocs + 1}`), result);
        }
      }
    }

  }


  //Kollar ifall användaren finns i databasen med ID som parameter
  async checkIfUserExists(id) {
    // Get a reference to the "users" collection
    const usersColRef = collection(this.db, "users");
  
    // Get the document with the specified id
    const userDocRef = doc(usersColRef, id);
  
    // Check if the user document already exists in the "users" collection
    const userDocSnapshot = await getDoc(userDocRef);
  
    if (!userDocSnapshot.exists()) {
      return false;
    } else {
      return true;
    }
  }


//Kolla ifall email finns i databas med email som parameter
async checkIfEmailExists(email) {
  const usersColRef = collection(this.db, "users");
  const querySnapshot = await getDocs(usersColRef);

  for (const document of querySnapshot.docs) {
    const docRef = doc(this.db, `users/${document.id}/userinfo/info`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.data().email === email) {
      return true;
    }
  }

  return false;
}



  
  //Hämtar namn, ålder, email med UID
  async getUserDetails(id)
  {
    const docRef = doc(this.db, 'users', id, 'userinfo', 'info');
    const userDocSnapshot = await getDoc(docRef);
    if (userDocSnapshot.exists()) {
      const data = userDocSnapshot.data();
      return { name: data.name, age: data.age, email: data.email, id: data.id };
    } else {
      return null; // or throw an error
    }
  }
  
  //Hårdkodat just nu skall implementeras i databas.
   getstatisticsInfo(age, wpm){
    let text = [];
    let wordsInText;
    let hoursToFinish;
    let improvedHoursToFinish
    age = parseInt(age);
    wpm = parseInt(wpm)

    // Ifall man ökar sitt WPM med 15%
    let improvedWPM = (wpm * 1.15)

    switch(true){
        case(age > 0 && age <= 12):
            wordsInText = 76944;
            hoursToFinish = Math.round((wordsInText / wpm) / 60);
            improvedHoursToFinish = Math.round((wordsInText / improvedWPM) / 60);
            text.push("100-130.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Med din läshastighet ${wpm} ord per minut. \n
            Så tar det dig ${hoursToFinish} timmar att läsa boken!`);
            text.push(`Ifall du ökar din läshastighet med 15% \n
            Så tar det dig ${improvedHoursToFinish} timmar att läsa boken!`);
                break;

        case(age > 12 && age < 15):
            wordsInText = 76944;
            hoursToFinish = Math.round((wordsInText / wpm) / 60);
            improvedHoursToFinish = Math.round((wordsInText / improvedWPM) / 60);
            text.push("130-150.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Med din läshastighet ${wpm} ord per minut. \n
            Så tar det dig ${hoursToFinish} timmar att läsa boken!`);
            text.push(`Ifall du ökar din läshastighet med 15% \n
            Så tar det dig ${improvedHoursToFinish} timmar att läsa boken!`);
                break;

        case(age >= 15 && age <= 18):
        wordsInText = 76944;
        hoursToFinish = Math.round((wordsInText / wpm) / 60);
        improvedHoursToFinish = Math.round((wordsInText / improvedWPM) / 60);
        text.push("170-210.");
        text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
        Med din läshastighet ${wpm} ord per minut. \n
        Så tar det dig ${hoursToFinish} timmar att läsa boken!`);
        text.push(`Ifall du ökar din läshastighet med 15% \n
        Så tar det dig ${improvedHoursToFinish} timmar att läsa boken!`);
            break;

        case(age > 18):
        wordsInText = 76944;
        hoursToFinish = Math.round((wordsInText / wpm) / 60);
        improvedHoursToFinish = Math.round((wordsInText / improvedWPM) / 60);
        text.push("200-260.");
        text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
        Med din läshastighet ${wpm} ord per minut. \n
        Så tar det dig ${hoursToFinish} timmar att läsa boken!`);
        text.push(`Ifall du ökar din läshastighet med 15% \n
                   Så tar det dig ${improvedHoursToFinish} timmar att läsa boken!`);
            break;
        
        default:
            text.push("170-210.");
            text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. \n
            Med din läshastighet ${wpm} ord per minut. \n
            Så tar det dig ${hoursToFinish} timmar att läsa boken!`);
            text.push(`Ifall du ökar din läshastighet med 15% \n
            Så tar det dig ${improvedHoursToFinish} timmar att läsa boken!`);
                break;
    }
    return text;
}


}
  
export default Firebase;