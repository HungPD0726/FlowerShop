package com.flowerstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class FlowerStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlowerStoreApplication.class, args);
    }
}
