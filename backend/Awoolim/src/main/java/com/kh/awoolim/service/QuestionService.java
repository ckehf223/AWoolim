package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Question;
import com.kh.awoolim.mapper.QuestionMapper;

@Service
public class QuestionService {

	@Autowired
	private QuestionMapper questionMapper;

	public List<Question> getQuestionList() {
		return questionMapper.getQuestionList();
	};

	public Question getQuestionByNo(int questionNo) {
		return questionMapper.getQuestionByNo(questionNo);
	};

	public List<Question> categoryOfQuestion(String query) {
		return questionMapper.categoryOfQuestion(query);
	};

	public void inssertQuestion(Question question) {
		questionMapper.inssertQuestion(question);
	};

	public void updateQuestion(Question question) {
		questionMapper.updateQuestion(question);
	};

	public void deleteQuestion(int questionNo) {
		questionMapper.deleteQuestion(questionNo);
	};
}
