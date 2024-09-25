package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Question;
import com.kh.awoolim.service.QuestionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/faq")
@Tag(name = "FAQ", description = "FAQ 관련 API")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@GetMapping("/list")
	public List<Question> getQuestionList(HttpServletResponse response) {
		try {
			response.setStatus(HttpStatus.OK.value());
			return questionService.getQuestionList();
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
	}

	@GetMapping("/read/{questionNo}")
	public Question getQuestionByNo(@PathVariable("questionNo") int questionNo,HttpServletResponse response){
		try {
			response.setStatus(HttpStatus.OK.value());
			return questionService.getQuestionByNo(questionNo);
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
	}

	//카테고리별 검색
	@GetMapping("/category")
	public List<Question> categoryOfQuestion(@RequestParam String query,HttpServletResponse response) {
		try {
			response.setStatus(HttpStatus.OK.value());
			return questionService.categoryOfQuestion(query);
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
	}

	@PostMapping("/insert")
	public void insertQuestion(@RequestBody Question question,HttpServletResponse response) {
		try {
			questionService.inssertQuestion(question);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@PostMapping("/update/{questionNo}")
	public void updateQuestion(@PathVariable("questionNo") int questionNo, @RequestBody Question question,HttpServletResponse response) {
		try {
			question.setQuestionNo(questionNo);
			questionService.updateQuestion(question);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@PostMapping("/delete/{questionNo}")
	public void deleteQuestion(@PathVariable int questionNo,HttpServletResponse response) {
		try {
			questionService.deleteQuestion(questionNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
		
	}
}
