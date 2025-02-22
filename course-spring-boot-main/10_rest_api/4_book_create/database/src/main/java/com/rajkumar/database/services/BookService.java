package com.rajkumar.database.services;

import com.rajkumar.database.domain.entities.BookEntity;

public interface BookService {

    BookEntity createBook(String isbn, BookEntity book);
}
