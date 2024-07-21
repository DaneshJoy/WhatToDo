const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const tasks_file = 'tasks.txt'
const log_file = 'log.csv'


app.use(express.static('public'));
app.use(express.json());

// Function to read the file and create the todoList array
function readTasksFromFile(filename) {
  try {
      // Read the file synchronously
      const data = fs.readFileSync(filename, 'utf8');
      // Split the file contents by new line to create an array
      const tasks = data.split('\n').map(task => task.trim()).filter(task => task.length > 0);
      return tasks;
  } catch (err) {
      console.error(`Error reading file ${filename}:`, err);
      return [];
  }
}

// Read tasks from tasks.txt and create the todoList array
let todoList = readTasksFromFile(tasks_file);
let works = [];
// Multiply the list by 10
for (let i = 0; i < 10; i++) {
  works = works.concat(todoList);
}

app.get('/suggest', (req, res) => {
  const randomIndex = Math.floor(Math.random() * works.length);
  const suggestion = works[randomIndex];

  // Format the current date and time and append item to log file
  import('dateformat')
    .then(({ default: dateFormat }) => {
      // Format the current date and time
      const now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

      // Append to log file
      const logEntry = `${now}, ${suggestion}, (js)\n`;
      fs.appendFile(log_file, logEntry, (err) => {
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

  // Join the array into a string with new lines and write to tasks.txt
  const data = todoList.join('\n');

  fs.writeFile(tasks_file, data, { flag: 'w+' }, err => {
      if (err) {
          console.error('Error writing to tasks.txt:', err);
          return res.status(500).json({ message: 'Error updating the to-do list.' });
      }

      res.json({ message: 'To-do list updated successfully!' });
  });

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
