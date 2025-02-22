package com.rajkumar.maven.services.impl;

import com.rajkumar.maven.services.GreenPrinter;
import org.springframework.stereotype.Service;

@Service
public class SpanishGreenPrinter implements GreenPrinter {

  @Override
  public String print() {
    return "verde";
  }
}
