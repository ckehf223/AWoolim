package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.awoolim.domain.Chat;

@Mapper
public interface ChatMapper {

	void insertChat(Chat chat);

	List<Chat> selectChatsByClubNo(int clubNo);
}
