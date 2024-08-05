package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.awoolim.domain.Question;

@Mapper
public interface QuestionMapper {
	List<Question> getQuestionList();
	Question getQuestionByNo(int questionNo);
	List<Question> categoryOfQuestion(String query);
	void inssertQuestion(Question question);
	void updateQuestion(Question question);
	void deleteQuestion(int questionNo);
}
