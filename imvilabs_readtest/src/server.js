// server.js (Express.js backend)
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')



let startTime = 0;

//Importerar våran mockdatabas
const Database = require('./database');

//Behövs för att kunna hantera "Form data"
const multer = require("multer");
const { json } = require('body-parser');
const upload = multer();


// Enable body-parser middleware to parse form-data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Gör så att servern endast kan få "requests" från localhost3000 domänen.
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


//Endpoint för att returnera en text med frågor
app.get('/text', (req, res) => {

  //Tar parametern level ifrån requesten
  const level = req.query.level;
  const age = req.query.age;
  //Hämtar text och frågor från databas med level som parameter
  const { text, questions } = Database.getTextAndQuestions(level, age);

  //Skickar tbx ett json med text och frågor. (frågorna och texterna är hårdkodade nu vi behöver lägga till en databas klass eller en riktig databas (MongoDB Atlas eller firebase))
  res.json({ text, questions });
  });


  //Startar tiden och skickar tbx ett json med meddelande "Started"
  app.post('/statistics', (req, res) => {
    const wpm = req.body.wpm;
    const age = req.body.age;
    const text = Database.getstatisticsInfo(age,wpm)
    res.json({text});
  });

  //Endpoint som sparar ner användares resultat och namn, email i databas
  app.post('/save-result', (req, res) => {
    const { email, name, lastname, wpm, age, level, amountOfRightQuestions } = req.body;
  
    // Validate the input
    if (!email || !name || !lastname) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Save the result to the "database" (in this case, an array)
    const newResult = {
      email,
      name,
      lastname,
      wpm,
      age,
      level,
      amountOfRightQuestions
    };
  
    // Return a response to the client
    res.json({ message: 'Result saved successfully', result: newResult });
  });


  app.post('/submitQuestions', (req, res) => {
    //Sparar ner level parameterns som användaren skickar in
    const level = req.body.level;
    const age = req.body.age

    //Sparar ner användarens svar från frågeformuläret
    const answers = req.body.answers;

    //Sparar ner de rätta svaren från databasen
    const correctAnswers = Database.getCorrectAnswers(level,age);
    if (!correctAnswers) {
        res.status(404).json({ error: "No correct answers found for this level" });
        return;
    }

    // Jämnför användarens svar med de rätta svaren från databasen
    const result = {};
    for (const key of Object.keys(answers)) {
        if (!correctAnswers[key]) {
            res.status(404).json({ error: "Invalid answer key" });
            return;
        }
        result[key] = Object.is(answers[key], correctAnswers[key]);
    }

    //Skickar tbx resultaten till användaren
    res.json({ result });
});


//Startar tiden och skickar tbx ett json med meddelande "Started"
app.get('/start-timer', (req, res) => {
  startTime = Date.now();
  res.json({ timer: 'Started' });
});


//Stoppar tiden och sparar ner tiden som gått i en variabel "elapsedTime" och räknar sedan ut wpm
app.get('/stop-timer', (req, res) => {
  const level = req.query.level;
  const age = req.query.age;
  const elapsedTime = Date.now() - startTime;
  const wpm = calculateWPM(elapsedTime, level, age);
  res.json({ wpm });
});

//Funktion som räknar ut WPM
function calculateWPM(elapsedTime, level, age) {
  let text = Database.getTextAndQuestions(level, age).text
  let words = text.split(' ').length;
  let minutes = elapsedTime / 60000;
  let wpm = Math.round((words/minutes));
  return wpm;
}






//Porten som servern körs på
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});