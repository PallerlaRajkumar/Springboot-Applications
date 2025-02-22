package com.rajkumar.database.dao;

import com.rajkumar.database.domain.Author;

import java.util.Optional;

public interface AuthorDao {
    void create(Author author);

    Optional<Author> findOne(long l);

}
