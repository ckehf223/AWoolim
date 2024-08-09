package com.kh.awoolim.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Club;
import com.kh.awoolim.service.ClubService;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {

	@Autowired
	private ClubService clubService;

	@GetMapping
	public List<Club> getAllClubs() {
		return clubService.getAllClubs();
	}

	@GetMapping("/image/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
		byte[] imageData = clubService.getImage(imageName);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
	}

	@PostMapping("/search") // 검색 요청 처리
	public List<Club> searchClubs(@RequestParam(value = "searchTerm", required = false) String searchTerm,
			@RequestParam Map<String, Object> filters) {
		return clubService.searchClubs(searchTerm, filters);
	}
}
