package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Question;
import com.kh.awoolim.service.QuestionService;

@RestController
@RequestMapping("/admin/faq")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@GetMapping("/list")
	public List<Question> getQuestionList(){
		return null;
	}
	
}
