import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields: title, author, publisher",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const book = await Book.find({});
    return response.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

//route to get One Book


// Route to update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields: title, author, publisher",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

//Route to delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err);
    response.status(500).send({ message: err.message });
  }
});

export default router;