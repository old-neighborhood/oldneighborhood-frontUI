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
		System.setProperty("sun.net.client.defaultConnectTimeout", String   
                .valueOf(10000));// （单位：毫秒）  
        System.setProperty("sun.net.client.defaultReadTimeout", String   
                .valueOf(10000));
		SpringApplication.run(OldneighborhoodFrontUiApplication.class, args);
	}
}
