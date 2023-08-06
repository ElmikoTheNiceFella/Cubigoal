require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(
  cors({
    origin: ["https://cubigoal.netlify.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const database = mongoose.connection;

app.use(express.json());

const router = require('./router/players');

app.use('/players', router);

app.listen(process.env.PORT, () => console.log("server started"));

database.on('error', (error) => console.error("Error connecting to the db: " + error));
database.once('open', () => console.log("connected to database"));