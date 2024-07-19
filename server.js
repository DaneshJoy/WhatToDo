const express = require('express');
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
  res.json({ suggestion: todoList[randomIndex] });
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
