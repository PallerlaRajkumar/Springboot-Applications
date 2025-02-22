package com.rajkumar.database.dao;

import com.rajkumar.database.domain.Book;

import java.util.Optional;

public interface BookDao {
    void create(Book book);

    Optional<Book> find(String isbn);
}
