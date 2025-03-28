package com.rajkumar.jpa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.rajkumar.jpa.domain.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, String>  {
}
