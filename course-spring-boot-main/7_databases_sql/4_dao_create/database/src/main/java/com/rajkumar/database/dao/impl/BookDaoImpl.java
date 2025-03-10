package com.rajkumar.database.dao.impl;

import com.rajkumar.database.dao.BookDao;
import com.rajkumar.database.domain.Book;
import org.springframework.jdbc.core.JdbcTemplate;

public class BookDaoImpl implements BookDao {

    private final JdbcTemplate jdbcTemplate;


    public BookDaoImpl(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void create(Book book) {
        jdbcTemplate.update(
                "INSERT INTO books (isbn, title, author_id) VALUES (?, ?, ?)",
                book.getIsbn(),
                book.getTitle(),
                book.getAuthorId()
        );
    }
}
