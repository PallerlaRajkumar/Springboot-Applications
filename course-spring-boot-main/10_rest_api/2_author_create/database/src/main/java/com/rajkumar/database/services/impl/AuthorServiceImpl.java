package com.rajkumar.database.services.impl;

import com.rajkumar.database.domain.entities.AuthorEntity;
import com.rajkumar.database.repositories.AuthorRepository;
import com.rajkumar.database.services.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AuthorServiceImpl implements AuthorService {

    private AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public AuthorEntity save(AuthorEntity authorEntity) {
        return authorRepository.save(authorEntity);
    }
}
