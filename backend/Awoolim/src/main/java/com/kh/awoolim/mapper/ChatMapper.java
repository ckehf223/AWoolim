package com.kh.awoolim.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.kh.awoolim.domain.Chat;
import com.kh.awoolim.domain.ChatRoom;

@Mapper
public interface ChatMapper {

	public void insertChat(Chat chat);

	public List<Map<String,Object>> selectChatsByClubNo(int clubNo);
	
	public List<ChatRoom>list(int userId);
}
