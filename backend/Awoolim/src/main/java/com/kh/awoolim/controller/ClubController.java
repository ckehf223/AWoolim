package com.kh.awoolim.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.domain.Club;
import com.kh.awoolim.service.ClubMemberService;
import com.kh.awoolim.service.ClubService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/club")
@Slf4j
public class ClubController {

	@Value("${upload.path}")
	private String uploadDir;

	private final JWTUtil jwtUtil;
	private final ClubService clubService;
	private final ClubMemberService clubMemberService;

	public ClubController(JWTUtil jwtUtil, ClubService clubService, ClubMemberService clubMemberService) {
		this.jwtUtil = jwtUtil;
		this.clubService = clubService;
		this.clubMemberService = clubMemberService;
	}

	@GetMapping("/")
	public ResponseEntity<List<Club>> getAllClubs() {
		log.info("getAllClubs");
		List<Club> clubs = clubService.getAllClubs();
		return ResponseEntity.ok(clubs);
	}

	@GetMapping("/image/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
		try {
			Path imagePath = Paths.get(uploadDir, imageName);

			if (!Files.exists(imagePath)) {
				log.error("Image not found: " + imageName);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			byte[] imageData = Files.readAllBytes(imagePath);
			MediaType mediaType = determineMediaType(imageName);

			return ResponseEntity.ok().contentType(mediaType).body(imageData);
		} catch (IOException e) {
			log.error("Failed to load image: " + imageName, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	private MediaType determineMediaType(String imageName) {
		String fileExtension = getFileExtension(imageName).toLowerCase();
		switch (fileExtension) {
		case "jpg":
		case "jpeg":
			return MediaType.IMAGE_JPEG;
		case "png":
			return MediaType.IMAGE_PNG;
		case "gif":
			return MediaType.IMAGE_GIF;
		case "webp":
			return MediaType.valueOf("image/webp");
		default:
			return MediaType.APPLICATION_OCTET_STREAM;
		}
	}

	private String getFileExtension(String fileName) {
		int lastIndexOfDot = fileName.lastIndexOf(".");
		return (lastIndexOfDot == -1) ? "" : fileName.substring(lastIndexOfDot + 1);
	}

	@PostMapping("/search")
	public ResponseEntity<List<Club>> searchClubs(
			@RequestParam(value = "searchTerm", required = false) String searchTerm,
			@RequestParam Map<String, Object> filters) {
		List<Club> clubs = clubService.searchClubs(searchTerm, filters);
		return ResponseEntity.ok(clubs);
	}

	@PostMapping("/register")
	public ResponseEntity<Integer> registerClub(@RequestParam("clubTitle") String clubTitle,
			@RequestParam("clubGender") String clubGender, @RequestParam("category") String category,
			@RequestParam("city") String city, @RequestParam("district") String district,
			@RequestParam("regularType") int regularType, @RequestParam("maxMember") int maxMember,
			@RequestParam("dDay") String dDay,
			@RequestParam(value = "clubImage", required = false) MultipartFile clubImage,
			@RequestParam("detailInfo") String detailInfo, @RequestParam("ageLimit") String ageLimit,
			HttpServletRequest request) {

		log.info("club register POST Enter");

		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);

			Club club = new Club();
			club.setUserId(userId);
			club.setClubTitle(clubTitle);
			club.setClubGender(clubGender);
			club.setCategory(category);
			club.setCity(city);
			club.setDistrict(district);
			club.setRegularType(regularType);
			club.setMaxMember(maxMember);
			club.setDDay(dDay);
			club.setDetailInfo(detailInfo);
			club.setRecruitment(1);
			club.setAgeLimit(ageLimit);
			club.setClubImage("default-image.png");
			club.setMemberCount(0);

			// 파일 업로드 처리
			if (clubImage != null && !clubImage.isEmpty()) {
				String newFileName = saveImageFile(clubImage);
				club.setClubImage(newFileName);
			}

			int success = clubService.register(club);
			return ResponseEntity.ok(success);
		} catch (IOException e) {
			log.error("Error during club registration", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	private String saveImageFile(MultipartFile clubImage) throws IOException {
		String uuid = UUID.randomUUID().toString();
		String originalFilename = clubImage.getOriginalFilename();
		String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
		String newFileName = uuid + fileExtension;
		log.info("Saving image as: " + newFileName);

		Path path = Paths.get(uploadDir + File.separator + newFileName);
		Files.write(path, clubImage.getBytes());

		return newFileName;
	}

	@GetMapping("/read/{clubNo}")
	public ResponseEntity<Map<String, Object>> readClub(@PathVariable("clubNo") int clubNo) {
		log.info("read Club Enter");
		try {
			Map<String, Object> clubData = clubService.readClub(clubNo);
			return ResponseEntity.ok(clubData);
		} catch (Exception e) {
			log.error("Error reading club data", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/clubmember/signUp/{clubNo}")
	public ResponseEntity<Integer> clubMemberSignUp(@PathVariable("clubNo") int clubNo, HttpServletRequest request) {
		log.info("clubmemberSignUp POST ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);

			int check = clubMemberService.signUp(userId, clubNo);
			return ResponseEntity.ok(check);
		} catch (Exception e) {
			log.error("Error during club member sign up", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/readMyClub")
	public ResponseEntity<Map<String, Object>> readMyClub(HttpServletRequest request) {
		log.info("readMyClub GET ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Map<String, Object> clubMap = clubService.readMyClubList(userId);
			return ResponseEntity.ok(clubMap);
		} catch (Exception e) {
			log.error("Error reading my clubs", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/exitClub/{clubNo}")
	public ResponseEntity<Void> exitClub(@PathVariable("clubNo") int clubNo, HttpServletRequest request) {
		log.info("exitClub POST ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);

			clubMemberService.deleteClubMember(userId, clubNo);
			clubService.minusClubCount(clubNo);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			log.error("Error exiting club", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/read/madeClubList")
	public ResponseEntity<Map<String, Object>> readMadeClubList(HttpServletRequest request) {
		log.info("madeClubList GET ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Map<String, Object> clubMap = clubService.readMyMadeClubList(userId);
			return ResponseEntity.ok(clubMap);
		} catch (Exception e) {
			log.error("Error reading made club list", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/modify/{clubNo}")
	public ResponseEntity<Club> getModifyClub(@PathVariable("clubNo") int clubNo) {
		log.info("modify GET ENTER");
		try {
			Club club = clubService.readByClubNo(clubNo);
			return ResponseEntity.ok(club);
		} catch (Exception e) {
			log.error("Error getting club for modification", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/modify")
	public ResponseEntity<Void> updateClub(@RequestParam("clubNo") int clubNo,
			@RequestParam("clubTitle") String clubTitle, @RequestParam("clubGender") String clubGender,
			@RequestParam("category") String category, @RequestParam("city") String city,
			@RequestParam("district") String district, @RequestParam("regularType") int regularType,
			@RequestParam("maxMember") int maxMember, @RequestParam("dDay") String dDay,
			@RequestParam("checkImage") String checkImage,
			@RequestParam(value = "clubImage", required = false) MultipartFile clubImage,
			@RequestParam("detailInfo") String detailInfo, @RequestParam("ageLimit") String ageLimit) {
		log.info("modify POST Enter");

		try {
			Club club = clubService.readByClub(clubNo);
			club.setClubTitle(clubTitle);
			club.setCategory(category);
			club.setClubGender(clubGender);
			club.setDDay(dDay);
			club.setRegularType(regularType);
			club.setMaxMember(maxMember);
			club.setCity(city);
			club.setDistrict(district);
			club.setDetailInfo(detailInfo);
			club.setAgeLimit(ageLimit);

			if ("1".equals(checkImage) && clubImage != null && !clubImage.isEmpty()) {
				// 기존 이미지 삭제 로직 추가 (필요 시)
				if (club.getClubImage() != null) {
					Path oldImagePath = Paths.get(uploadDir, club.getClubImage());
					Files.deleteIfExists(oldImagePath);
				}

				String newFileName = saveImageFile(clubImage);
				club.setClubImage(newFileName);
			}

			clubService.modifyClub(club);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			log.error("Error modifying club", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
