package com.rajkumar.database.controllers;

import com.rajkumar.database.domain.dto.BookDto;
import com.rajkumar.database.domain.entities.BookEntity;
import com.rajkumar.database.mappers.Mapper;
import com.rajkumar.database.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class BookController {

    private BookService bookService;
    private Mapper<BookEntity, BookDto> bookMapper;

    public BookController(Mapper<BookEntity, BookDto> bookMapper, BookService bookService) {
        this.bookMapper = bookMapper;
        this.bookService = bookService;
    }

    @PutMapping(path = "/books/{isbn}")
    public ResponseEntity<BookDto> createBook(@PathVariable String isbn, @RequestBody BookDto bookDto) {
        BookEntity bookEntity = bookMapper.mapFrom(bookDto);
        BookEntity savedBookEntity = bookService.createBook(isbn, bookEntity);
        BookDto savedUpdatedBookDto = bookMapper.mapTo(savedBookEntity);
        return new ResponseEntity(savedUpdatedBookDto, HttpStatus.CREATED);
    }
}
