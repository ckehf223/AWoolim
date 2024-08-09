package com.kh.awoolim.service;

import java.util.List;
import java.util.Map;

import com.kh.awoolim.domain.Club;

public interface ClubService {

	List<Club> getAllClubs();

	byte[] getImage(String imageName);

	List<Club> searchClubs(String searchTerm, Map<String, Object> filters);
}
