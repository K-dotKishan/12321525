import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title required" });
    }

    const task = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(task);

    res.status(201).json(task);
});

app.listen(5000, () => console.log("Running"));