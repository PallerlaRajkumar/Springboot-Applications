package com.rajkumar.database.services;

import com.rajkumar.database.domain.entities.BookEntity;

import java.util.List;
import java.util.Optional;

public interface BookService {

    BookEntity createUpdateBook(String isbn, BookEntity book);

    List<BookEntity> findAll();
    Optional<BookEntity> findOne(String isbn);

    boolean isExists(String isbn);
}
