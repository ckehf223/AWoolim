package com.kh.awoolim.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import com.kh.awoolim.domain.Club;
import com.kh.awoolim.mapper.ClubMapper;

@Service
public class ClubServiceImpl implements ClubService {

	@Autowired
	private ClubMapper clubMapper;

	@Override
	public List<Club> getAllClubs() {
		return clubMapper.getAllClubs();
	}

	@Override
	public byte[] getImage(String imageName) {
		try (InputStream is = getClass().getResourceAsStream("/static/images/" + imageName)) {
			if (is == null) {
				throw new IOException("Image not found: " + imageName);
			}
			return StreamUtils.copyToByteArray(is);
		} catch (IOException e) {
			throw new RuntimeException("Failed to load image: " + imageName, e);
		}
	}

	@Override
	public List<Club> searchClubs(String searchTerm, Map<String, Object> filters) {
		return clubMapper.searchClubs(searchTerm, filters);
	}
}
