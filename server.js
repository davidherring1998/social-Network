const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// connect to mongodb
const dbUri = 'mongodb+srv://davidHerring:Punkypunk!98@socialnetwork.py7wman.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(PORT, console.log('App is connected to mongoDB on http://localhost:3001')))
.catch((err) => console.log(err));

