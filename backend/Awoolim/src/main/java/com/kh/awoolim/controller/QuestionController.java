package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Question;
import com.kh.awoolim.service.QuestionService;

@RestController
@RequestMapping("/admin/faq")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@GetMapping("/list")
	public List<Question> getQuestionList() {
		return questionService.getQuestionList();
	}

	@GetMapping("/read/{questionNo}")
	public Question getQuestionByNo(@PathVariable("questionNo") int questionNo) throws Exception {
		System.out.println("질문번호 : "+ questionNo);
		return questionService.getQuestionByNo(questionNo);
	}

	//카테고리별 검색
	@GetMapping("/category")
	public List<Question> categoryOfQuestion(@RequestParam String query) {
		return questionService.categoryOfQuestion(query);
	}

	@PostMapping("/insert")
	public void insertQuestion(@RequestBody Question question) {
		questionService.inssertQuestion(question);
	}
	
	@PostMapping("/update/{questionNo}")
	public void updateQuestion(@PathVariable("questionNo") int questionNo, @RequestBody Question question) {
		question.setQuestionNo(questionNo);
		questionService.updateQuestion(question);
	}
	
	@PostMapping("/delete/{questionNo}")
	public void deleteQuestion(@PathVariable int questionNo) {
		questionService.deleteQuestion(questionNo);
	}
}
