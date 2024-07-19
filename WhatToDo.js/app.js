const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let todoList = [
  "Sarbazi",
  "BrainXAI",
  "Klassima",
  "SurgiSight",
  "VisioImpulse"];

app.use(express.static('public'));
app.use(express.json());

app.get('/suggest', (req, res) => {
  const randomIndex = Math.floor(Math.random() * todoList.length);
  const suggestion = todoList[randomIndex];

  // Format the current date and time and append item to log file
  import('dateformat')
    .then(({ default: dateFormat }) => {
      // Format the current date and time
      const now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

      // Append to log file
      const logEntry = `${now}, ${suggestion}, (js)\n`;
      fs.appendFile('../log.txt', logEntry, (err) => {
        if (err) {
          console.error('Error appending to log file:', err);
          return res.status(500).json({ error: 'Failed to log suggestion' });
        }
      });
    })
    .catch((err) => {
      console.error('Error importing dateformat module:', err);
      res.status(500).json({ error: 'Internal server error' });
    });

  res.json({ suggestion: suggestion });
});

app.get('/todos', (req, res) => {
  res.json({ todoList });
});

app.post('/update', (req, res) => {
  todoList = req.body.todoList;
  res.json({ message: 'To-do list updated successfully!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
