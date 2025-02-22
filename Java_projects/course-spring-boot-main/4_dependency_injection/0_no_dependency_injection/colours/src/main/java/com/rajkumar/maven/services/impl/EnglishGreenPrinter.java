package com.rajkumar.maven.services.impl;

import com.rajkumar.maven.services.GreenPrinter;

public class EnglishGreenPrinter implements GreenPrinter {

  @Override
  public String print() {
    return "green";
  }
}
