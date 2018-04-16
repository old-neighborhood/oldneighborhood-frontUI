package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@ServletComponentScan
public class OldneighborhoodFrontUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(OldneighborhoodFrontUiApplication.class, args);
	}
}
