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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.domain.Alarm;
import com.kh.awoolim.domain.Club;
import com.kh.awoolim.domain.ClubSchedule;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.service.AlarmService;
import com.kh.awoolim.service.ClubMemberService;
import com.kh.awoolim.service.ClubService;
import com.kh.awoolim.service.MemberService;

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

	private ClubService clubService;

	private ClubMemberService clubMemberService;

	private AlarmService alarmService;

	private MemberService memberService;

	public ClubController(JWTUtil jwtUtil, ClubService clubService, ClubMemberService clubMemberService,
			AlarmService alarmService, MemberService memberService) {
		this.jwtUtil = jwtUtil;
		this.clubService = clubService;
		this.clubMemberService = clubMemberService;
		this.alarmService = alarmService;
		this.memberService = memberService;
	}

	@GetMapping("/")
	public ResponseEntity<List<Club>> getAllClubs() {
		log.info("getAllClubs");
		List<Club> clubs = clubService.getAllClubs();
		return ResponseEntity.ok(clubs);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Club>> searchClubs(@RequestParam Map<String,Object> filters) {
		log.info("search GET ENTER");
		try {
			log.info(""+filters);
			List<Club> clubs = clubService.searchClubs(filters);
			if(clubs != null && !clubs.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK).body(clubs);
			}
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
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
			club.setDDay(dDay.replaceAll("-", ""));
			club.setDetailInfo(detailInfo);
			club.setRecruitment(1);
			club.setAgeLimit(ageLimit);
			club.setClubImage("305d04e5-e53d-4419-8beb-555330a6a3d4.png");
			club.setMemberCount(1);
			// 디렉토리가 존재하지 않으면 생성
			Path uploadPath = Paths.get(uploadDir);
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}

			if (clubImage != null && !clubImage.isEmpty() && clubImage.getSize() > 0) {
				// UUID 생성
				String uuid = UUID.randomUUID().toString();
				// 파일 확장자 추출
				String originalFilename = clubImage.getOriginalFilename();
				String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
				// 새로운 파일 이름 생성
				String newFileName = uuid + fileExtension;
				club.setClubImage(newFileName);
				byte[] bytes = clubImage.getBytes();
				Path path = Paths.get(uploadDir + File.separator + newFileName);
				Files.write(path, bytes);
				path.toFile().getCanonicalPath();
			}

			int success = clubService.register(club);
			return ResponseEntity.status(HttpStatus.OK).body(success);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/read/{clubNo}")
	public ResponseEntity<Map<String, Object>> readClub(@PathVariable("clubNo") int clubNo) {
		log.info("read Club GET Enter");
		try {

			Map<String, Object> clubData = clubService.readClub(clubNo);
			if (clubData != null) {
				return ResponseEntity.status(HttpStatus.OK).body(clubData);
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@PostMapping("/clubmember/signUp/{clubNo}")
	public ResponseEntity<Integer> clubMemberSignUp(@PathVariable("clubNo") int clubNo, HttpServletRequest request) {
		try {
			log.info("clubmemberSingup POST ENTER");
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			int check = clubMemberService.signUp(userId, clubNo);
			if (check == 0) {
				Club club = clubService.readByClub(clubNo);
				Member member = memberService.readMember(userId);
				Alarm alarm = new Alarm();
				alarm.setUserId(club.getUserId());
				String userName = member.getNickName() != "null" && member.getNickName() != null ? member.getNickName()
						: member.getUserName();
				alarm.setMessage("`" + userName + "` 님이 모임 참여 신청 하셨습니다.");
				alarmService.register(alarm);
			}
			return ResponseEntity.status(HttpStatus.OK).body(check);
		} catch (Exception e) {
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
			return ResponseEntity.status(HttpStatus.OK).body(clubMap);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/read/madeClubList")
	public ResponseEntity<Map<String, Object>> readMadeClubList(HttpServletRequest request) {
		log.info("madeClubList GET ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Map<String, Object> clubMap = clubService.readMyMadeClubList(userId);
			if (clubMap == null || clubMap.size() <= 0 || clubMap.isEmpty()) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
			return ResponseEntity.status(HttpStatus.OK).body(clubMap);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

		}
	}

	@GetMapping("/modify/{clubNo}")
	public ResponseEntity<Club> getModifyClub(@PathVariable("clubNo") int clubNo) {
		log.info("modify GET ENTER");
		try {
			Club club = clubService.readByClubNo(clubNo);
			return ResponseEntity.status(HttpStatus.OK).body(club);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/modify")
	public void updateClub(@RequestParam("clubNo") int clubNo, @RequestParam("clubTitle") String clubTitle,
			@RequestParam("clubGender") String clubGender, @RequestParam("category") String category,
			@RequestParam("city") String city, @RequestParam("district") String district,
			@RequestParam("regularType") int regularType, @RequestParam("maxMember") int maxMember,
			@RequestParam("dDay") String dDay, @RequestParam("checkImage") String checkImage,
			@RequestParam(value = "clubImage", required = false) MultipartFile clubImage,
			@RequestParam("detailInfo") String detailInfo, @RequestParam("ageLimit") String ageLimit,
			 @RequestParam("recruitment") int recruitment,
			HttpServletRequest request, HttpServletResponse response) {
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
			club.setRecruitment(recruitment);
			
			// 디렉토리가 존재하지 않으면 생성
			Path uploadPath = Paths.get(uploadDir);
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			if (checkImage.equals("1")) {
				// UUID 생성
				if (!club.getClubImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
					deleteFile(club.getClubImage());
				}
				String uuid = UUID.randomUUID().toString();
				// 파일 확장자 추출
				String originalFilename = clubImage.getOriginalFilename();
				String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
				// 새로운 파일 이름 생성
				String newFileName = uuid + fileExtension;
				log.info(newFileName);
				club.setClubImage(newFileName);
				byte[] bytes = clubImage.getBytes();
				Path path = Paths.get(uploadDir + File.separator + newFileName);
				Files.write(path, bytes);
				path.toFile().getCanonicalPath();
			}

			clubService.modifyClub(club);
		} catch (Exception e) {

		}
	}

	@GetMapping("/getClubMemberList/{clubNo}")
	public ResponseEntity<List<Map<String, Object>>> getClubMemberList(@PathVariable("clubNo") int clubNo) {
		log.info("getClubMemberList GET ENTER");
		try {
			List<Map<String, Object>> mapList = clubService.getClubMemberList(clubNo, 1);
			if (mapList != null) {
				return ResponseEntity.status(HttpStatus.OK).body(mapList);
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@GetMapping("/getAcceptMemberList/{clubNo}")
	public ResponseEntity<List<Map<String, Object>>> getAcceptMemberList(@PathVariable("clubNo") int clubNo) {
		log.info("getAcceptMemberList GET ENTER");
		try {
			List<Map<String, Object>> mapList = clubService.getClubMemberList(clubNo, 0);
			if (mapList != null) {
				return ResponseEntity.status(HttpStatus.OK).body(mapList);
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@PostMapping("/exitClub")
	public ResponseEntity<Void> exitClub(@RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {

		log.info("exitClub POST ENTER");
		try {
			int clubNo = requestBody.get("clubNo");
			int isAccept = requestBody.get("isAccept");
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			System.out.println(clubNo);
			System.out.println(userId);
			System.out.println(isAccept);
			clubMemberService.deleteClubMember(userId, clubNo);
			if (isAccept == 1) {
				clubService.minusClubCount(clubNo);
			}
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/exitClubMember")
	public void deleteClubMember(@RequestBody Map<String, Integer> requestBody, HttpServletResponse response) {
		log.info("exitClubMember POST ENTER");
		try {
			int userId = requestBody.get("userId");
			int clubNo = requestBody.get("clubNo");
			clubMemberService.deleteClubMember(userId, clubNo);
			clubService.minusClubCount(clubNo);
			Club club = clubService.readByClub(clubNo);
			Alarm alarm = new Alarm();
			alarm.setUserId(userId);
			alarm.setMessage("`" + club.getClubTitle() + "` 모임에서 퇴출되었습니다.");
			alarmService.register(alarm);
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

	@PostMapping("/acceptClubMember")
	public ResponseEntity<Integer> acceptClubMember(@RequestBody Map<String, Integer> requestBody) {
		log.info("acceptClubMember POST ENTER");
		try {
			int userId = requestBody.get("userId");
			int clubNo = requestBody.get("clubNo");
			System.out.println(userId);
			System.out.println(clubNo);
			Club club = clubService.readByClub(clubNo);
			if (club.getMemberCount() < club.getMaxMember()) {
				clubMemberService.acceptClubMember(userId, clubNo);
				Alarm alarm = new Alarm();
				alarm.setUserId(userId);
				alarm.setMessage("`" + club.getClubTitle() + "` 모임 신청이 수락되었습니다.");
				System.out.println(alarm.toString());
				alarmService.register(alarm);
				clubService.addClubCount(clubNo);
				return ResponseEntity.status(HttpStatus.OK).body(Integer.valueOf(1));
			} else {
				club.setRecruitment(0);
				clubService.modifyClub(club);
				return ResponseEntity.status(HttpStatus.OK).body(Integer.valueOf(0));
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} 
	}

	@PostMapping("/refuseClubMember")
	public void refuseClubMember(@RequestBody Map<String, Integer> requestBody, HttpServletResponse response) {
		log.info("refuseClubMember POST ENTER");
		try {
			int userId = requestBody.get("userId");
			int clubNo = requestBody.get("clubNo");
			clubMemberService.deleteClubMember(userId, clubNo);
			Club club = clubService.readByClub(clubNo);
			Alarm alarm = new Alarm();
			alarm.setUserId(userId);
			alarm.setMessage("`" + club.getClubTitle() + "` 모임 신청이 거절되었습니다.");
			alarmService.register(alarm);
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@GetMapping("/clubMasterId/{clubNo}")
	public ResponseEntity<Integer> getClubMasterId(@PathVariable("clubNo") int clubNo){
		try {
			Club club =clubService.readByClub(clubNo);
			return ResponseEntity.status(HttpStatus.OK).body(Integer.valueOf(club.getUserId()));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
	@PostMapping("/deleteClub/{clubNo}")
	public void deleteClub(@PathVariable("clubNo") int clubNo,HttpServletResponse response) {
		try {
			clubService.deleteClub(clubNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	public void deleteFile(String fileName) {
		// 이미지 파일의 절대 경로를 생성
		Path filePath = Paths.get("src/main/resources/static/images/" + fileName);

		try {
			Files.deleteIfExists(filePath); // 파일이 존재하는 경우 삭제
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("file 삭제중 오류발생");
		}
	}
}