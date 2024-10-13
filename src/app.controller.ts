import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './app.service';
import { Book } from './FakeDataBase';

@Controller()
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.BookService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number): Book | undefined {
    const bookID = +id;
    return this.BookService.getBookById(bookID);
  }

  @Post()
  createBook(@Body() book: Partial<Book>): Book | undefined {
    const bookData = book;
    if (!book.author || !book.title || !book.publicationYear) return undefined;
    return this.BookService.createBook(bookData);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() updatedBookFields: Partial<Book>,
  ): Book | undefined {
    return this.BookService.updateBook(id, updatedBookFields);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): Book[] {
    return this.BookService.deleteBook(id);
  }
}
