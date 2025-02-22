package com.rajkumar.maven.services.impl;

import com.rajkumar.maven.services.BluePrinter;
import org.springframework.stereotype.Service;

@Service
public class SpanishBluePrinter implements BluePrinter {

  @Override
  public String print() {
    return "azul";
  }
}
