import express from "express";
import {PORT} from './config.js';
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing body
app.use(express.json());

//middleware for handling CORS requests

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("welcome");
});

app.use('/books', booksRoute);

mongoose
  .connect('mongodb://localhost:27017/BookStore')
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });