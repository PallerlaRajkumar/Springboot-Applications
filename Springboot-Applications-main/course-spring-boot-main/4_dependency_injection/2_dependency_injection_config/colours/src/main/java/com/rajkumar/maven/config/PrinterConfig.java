package com.rajkumar.maven.config;

import com.rajkumar.maven.services.BluePrinter;
import com.rajkumar.maven.services.ColourPrinter;
import com.rajkumar.maven.services.GreenPrinter;
import com.rajkumar.maven.services.RedPrinter;
import com.rajkumar.maven.services.impl.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PrinterConfig {

  @Bean
  public BluePrinter bluePrinter() {
    return new SpanishBluePrinter();
  }

  @Bean
  public RedPrinter redPrinter() {
    return new SpanishRedPrinter();
  }

  @Bean
  public GreenPrinter greenPrinter() {
    return new SpanishGreenPrinter();
  }

  @Bean
  public ColourPrinter colourPrinter(
      BluePrinter bluePrinter, RedPrinter redPrinter, GreenPrinter greenPrinter) {
    return new ColourPrinterImpl(redPrinter, bluePrinter, greenPrinter);
  }
}
