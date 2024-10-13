import { Injectable } from '@nestjs/common';
import { Book, books } from './FakeDataBase';

@Injectable()
export class BookService {
  // Find All Books
  getAllBooks(): Book[] {
    return books;
  }
  // Find Book by ID
  getBookById(id: number): Book | undefined {
    return books.find((book) => book.id === id);
  }
  // Create a New Book
  createBook(book: Partial<Book>): Book {
    const newID = Math.max(...books.map((book) => book.id));

    const newBook: Book = {
      id: newID,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
    };

    books.push(newBook);
    return newBook;
  }
  // Update a Book by ID
  updateBook(
    bookID: number,
    updatedBookFields: Partial<Book>,
  ): Book | undefined {
    const currentBook = books.find((book) => book.id === bookID);
    const updatedBook = {
      id: bookID,
      title: updatedBookFields.title ?? currentBook.title,
      author: updatedBookFields.author ?? currentBook.author,
      publicationYear:
        updatedBookFields.publicationYear ?? currentBook.publicationYear,
    };

    books[bookID - 1] = updatedBook;

    return updatedBook;
  }
  // Delete a Book by ID
  deleteBook(bookID: number): Book[] {
    books.splice(bookID - 1, 1);
    return books;
  }
}
