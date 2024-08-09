package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.Chat;

@Mapper
public interface ChatMapper {
	List<Chat> getMessagesByClub(@Param("clubNo") int clubNo);

	void saveMessage(@Param("chat") Chat chat);
}