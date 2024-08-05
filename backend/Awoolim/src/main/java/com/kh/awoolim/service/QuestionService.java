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
		
		List<Question> getQuestionList(){
			return questionMapper.getQuestionList();
		};
		Question getQuestionByNo(int questionNo) {
			return questionMapper.getQuestionByNo(questionNo);
		};
		List<Question> categoryOfQuestion(String query){
			return questionMapper.categoryOfQuestion(query);
		};
		void inssertQuestion(Question question) {
			questionMapper.inssertQuestion(question);
		};
		void updateQuestion(Question question) {
			questionMapper.updateQuestion(question);
		};
		void deleteQuestion(int questionNo) {
			questionMapper.deleteQuestion(questionNo);
		};
}
