const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;
const tasks_file = '../tasks.txt'
const log_file = '../log.csv'


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

// app.get('/suggest', (req, res) => {
//   // Check if the file exists
//   if (!fs.existsSync(log_file)) {
//     // Create the file and write the header
//     fs.writeFileSync(log_file, 'Date,Task,App\n', 'utf8');
//   }

//   const randomIndex = Math.floor(Math.random() * works.length);
//   const suggestion = works[randomIndex];

//   // Format the current date and time and append item to log file
//   import('dateformat')
//     .then(({ default: dateFormat }) => {
//       // Format the current date and time
//       const now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

//       // Append to log file
//       const logEntry = `${now},${suggestion},(js)\n`;
//       fs.appendFile(log_file, logEntry, (err) => {
//         if (err) {
//           console.error('Error appending to log file:', err);
//           return res.status(500).json({ error: 'Failed to log suggestion' });
//         }
//       });
//     })
//     .catch((err) => {
//       console.error('Error importing dateformat module:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });

//   res.json({ suggestion: suggestion });
// });

app.get('/suggest', (req, res) => {
  // Filter the works array to include only checked items
  const checkedItems = works.filter(item => todoList.includes(item));

  // If no items are checked, return an error
  if (checkedItems.length === 0) {
    return res.status(400).json({ error: 'No tasks are checked for suggestion.' });
  }

  const randomIndex = Math.floor(Math.random() * checkedItems.length);
  const suggestion = checkedItems[randomIndex];

  // Check if the file exists
  if (!fs.existsSync(log_file)) {
    // Create the file and write the header
    fs.writeFileSync(log_file, 'Date,Task,App\n', 'utf8');
  }

  // Format the current date and time and append item to log file
  import('dateformat')
    .then(({ default: dateFormat }) => {
      const now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

      const logEntry = `${now},${suggestion},(js)\n`;
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

  // // Join the array into a string with new lines and write to tasks.txt
  // const data = todoList.join('\n');

  // fs.writeFile(tasks_file, data, { flag: 'w+' }, err => {
  //   if (err) {
  //     console.error('Error writing to tasks.txt:', err);
  //     return res.status(500).json({ message: 'Error updating the to-do list.' });
  //   }

  //   res.json({ message: 'To-do list updated successfully!' });
  // });
  res.json({ message: 'To-do list updated successfully!' });

});

app.get('/log', (req, res) => {
  fs.readFile(log_file, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return res.status(500).json({ error: 'Failed to read log file' });
    }
    res.json({ log: data });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/chart-data', (req, res) => {
  const results = [];

  fs.createReadStream(log_file)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
          // Process the CSV data similar to what was done in Python
          const taskAppCounts = {};

          results.forEach(row => {
              const task = row['Task'];
              const app = row['App'];

              if (!taskAppCounts[task]) {
                  taskAppCounts[task] = {};
              }

              if (!taskAppCounts[task][app]) {
                  taskAppCounts[task][app] = 0;
              }

              taskAppCounts[task][app]++;
          });

          res.json(taskAppCounts); // Send the processed data to the client
      });
});
