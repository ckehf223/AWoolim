package com.kh.awoolim;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.kh.awoolim.mapper")
public class AwoolimApplication {

	public static void main(String[] args) {
		SpringApplication.run(AwoolimApplication.class, args);
	}

}
