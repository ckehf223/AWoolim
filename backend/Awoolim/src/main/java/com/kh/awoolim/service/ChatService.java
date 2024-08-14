package com.kh.awoolim.service;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Chat;
import com.kh.awoolim.domain.ChatRoom;
import com.kh.awoolim.mapper.ChatMapper;

@Service
public class ChatService {

	@Autowired
	private ChatMapper chatMapper;

	public void saveMessage(Chat chat) {
		chatMapper.insertChat(chat);
	}

	public List<Map<String,Object>> getMessagesByRoomId(int clubNo) {
		try {
			List<Map<String,Object>> mapList = chatMapper.selectChatsByClubNo(clubNo);
			if(mapList != null && mapList.size() > 0) {
				for(Map<String,Object> data : mapList) {
					if(data.get("USERIMAGE") != null && data.get("USERIMAGE") != "") {
						String userImage = (String)encodeImageToBase64("/static/images/" +data.get("USERIMAGE"));
						data.put("USERIMAGE", userImage);
					}
				}
			}
			return mapList;
		}catch(Exception e) {
			e.printStackTrace();
			System.err.print("ERROR getMessagesByRoomId");
			return null;
		}
	}

	public List<ChatRoom> getAllChatRooms(int userId) {
		return chatMapper.list(userId);
	}
	
	public String encodeImageToBase64(String imagePath) throws IOException {
		ClassPathResource imgFile = new ClassPathResource(imagePath);
		byte[] imageBytes = Files.readAllBytes(imgFile.getFile().toPath());
		return Base64.getEncoder().encodeToString(imageBytes);
	}
}
