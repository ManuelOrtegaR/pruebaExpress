const express = require('express');
const app = express();
app.use(express.json());

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Error' } = err;
  console.log(message);
  res.status(statusCode);
  res.json({
    message,
  });
});

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

//2. Get one (by id)
app.get('/api/notes/:id', (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;
  const note = notes.find((element) => element.id === id);
  console.log(note);
  if (!note) {
    res.status(404).json({ message: `Note with ${id}, Not Found` });
  } else {
    res.json(note);
  }
});

//3. Post (Se envía el body)
app.post('/api/notes', (req, res) => {
  const { body } = req;
  notes.push(body);
  res.status(201).json(body);
});

//4. Put (Se envía el body)
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  note.name = name;
  res.json(note);
});

//5. Delete
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes.splice(index, 1);
  res.sendStatus(204);
});

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route Not Found',
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
