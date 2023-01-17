// server.js (Express.js backend)
const express = require('express');
const app = express();
const cors = require('cors');

//Gör så att servern endast kan få "requests" från localhost3000 domänen.
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


app.get('/text', (req, res) => {

  //Tar parametern level ifrån requesten
  const level = req.query.level;

  let text;
  let questions;
  switch (level) {
    case 1:
      text = "The quick brown fox jumps over the lazy dog.";
      questions = [
        {
          prompt: "What color is the fox?",
          options: ["red", "green", "brown"]
        },
        {
          prompt: "What is the fox doing?",
          options: ["sleeping", "jumping", "running"]
        },
        {
          prompt: "What is the fox jumping over?",
          options: ["wall", "lazy dog", "fence"]
        }
      ];
      break;
    case 2:
      text = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.";
      questions = [
        {
          prompt: "What color is the fox?",
          options: ["red", "green", "brown"]
        },
        {
          prompt: "What is the fox doing?",
          options: ["sleeping", "jumping", "running"]
        },
        {
          prompt: "What is the fox jumping over?",
          options: ["wall", "lazy dog", "fence"]
        },
        {
          prompt: "What is the subject of the sentence?",
          options: ["fox", "dog", "quick"]
        }
      ];
      break;
      default:
        text = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.";
        questions = [
          {
            prompt: "What color is the fox?",
            options: ["red", "green", "brown"]
          },
          {
            prompt: "What is the fox doing?",
            options: ["sleeping", "jumping", "running"]
          },
          {
            prompt: "What is the fox jumping over?",
            options: ["wall", "lazy dog", "fence"]
          },
          {
            prompt: "What is the subject of the sentence?",
            options: ["fox", "dog", "quick"]
          },
          {
            prompt: "What is the verb of the sentence?",
            options: ["jumps", "sleeps", "eats"]
          }
        ];
        break;
    }

    //Skickar tbx ett json med text och frågor. (frågorna och texterna är hårdkodade nu vi behöver lägga till en databas klass eller en riktig databas (MongoDB Atlas eller firebase))
    res.json({ text, questions });
  });



//Porten som servern körs på
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});