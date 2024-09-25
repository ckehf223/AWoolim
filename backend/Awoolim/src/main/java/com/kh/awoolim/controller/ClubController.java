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
import org.springframework.stereotype.Controller;
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

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api/club")
@Tag(name = "Club", description = "모임 관련 API")
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
	
	@Operation(summary = "전체 모임 조회", description = "메인 페이지 요청시 전체 모임을 조회하여 보여줌")
	@ApiResponse(responseCode = "200", description = "정상적으로 전체 모임 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/")
	public ResponseEntity<List<Club>> getAllClubs() {
		List<Club> clubs = clubService.getAllClubs();
		return ResponseEntity.ok(clubs);
	}

	@Operation(summary = "모임 검색", description = "검색 필터를 통해 조건에 해당하는 모임 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 채팅방 메세지 목록 반환")
    @ApiResponse(responseCode = "401", description = "모임 검색 중 오류 발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/search")
	public ResponseEntity<List<Club>> searchClubs(@Parameter(description = "검색 필터 정보 Map")@RequestParam Map<String,Object> filters) {
		try {
			List<Club> clubs = clubService.searchClubs(filters);
			if(clubs != null && !clubs.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK).body(clubs);
			}
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
	@Operation(summary = "모임 등록", description = "모임을 개설할 떄 입력한 정보들을 가져와 확인 후 등록")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 등록 완료")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/register")
	public ResponseEntity<Integer> registerClub(@Parameter(description = "모임 제목")@RequestParam("clubTitle") String clubTitle,
			@Parameter(description = "모임 성별")@RequestParam("clubGender") String clubGender, 
			@Parameter(description = "카테고리")@RequestParam("category") String category,
			@Parameter(description = "모임 지역(시/도)")@RequestParam("city") String city, 
			@Parameter(description = "모임 지역(시/군/구)")@RequestParam("district") String district,
			@Parameter(description = "모임 주기 타입")@RequestParam("regularType") int regularType, 
			@Parameter(description = "제한 인원")@RequestParam("maxMember") int maxMember,
			@Parameter(description = "만나는 날")@RequestParam("dDay") String dDay,
			@Parameter(description = "모임 프로필 사진")@RequestParam(value = "clubImage", required = false) MultipartFile clubImage,
			@Parameter(description = "모임 상세 정보")@RequestParam("detailInfo") String detailInfo, 
			@Parameter(description = "제한 나이")@RequestParam("ageLimit") String ageLimit,
			@Parameter(description = "AccesstoKen 확인을 위한 request")HttpServletRequest request) {

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

	@Operation(summary = "특정 모임 조회", description = "선택한 모임의 상세정보를 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 정보 반환")
    @ApiResponse(responseCode = "401", description = "모임 조회 중 오류 발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/read/{clubNo}")
	public ResponseEntity<Map<String, Object>> readClub(@Parameter(description = "모임 고유번호")@PathVariable("clubNo") int clubNo) {
		try {

			Map<String, Object> clubData = clubService.readClub(clubNo);
			if (clubData != null) {
				return ResponseEntity.status(HttpStatus.OK).body(clubData);
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}
	
	@Operation(summary = "특정 모임 참여멤버 조회", description = "선택한 모임의 참여중인 멤버를 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 특정 모임 사용자 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/clubmember/signUp/{clubNo}")
	public ResponseEntity<Integer> clubMemberSignUp(@Parameter(description = "모임 고유번호")@PathVariable("clubNo") int clubNo, HttpServletRequest request) {
		try {
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

	@Hidden
	@GetMapping("/readMyClub")
	public ResponseEntity<Map<String, Object>> readMyClub(HttpServletRequest request) {
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Map<String, Object> clubMap = clubService.readMyClubList(userId);
			return ResponseEntity.status(HttpStatus.OK).body(clubMap);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@Operation(summary = "만든 모임을 조회", description = "사용자가 개설한 모임을 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 개설한 모임 목록 반환")
    @ApiResponse(responseCode = "401", description = "개설한 모임이 없음")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/read/madeClubList")
	public ResponseEntity<Map<String, Object>> readMadeClubList(HttpServletRequest request) {
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

	@Hidden
	@GetMapping("/modify/{clubNo}")
	public ResponseEntity<Club> getModifyClub(@PathVariable("clubNo") int clubNo) {
		try {
			Club club = clubService.readByClubNo(clubNo);
			return ResponseEntity.status(HttpStatus.OK).body(club);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@Operation(summary = "모임 조건,정보 수정", description = "모임의 조건,상태,정보를 수정함")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 정보 수정")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
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

	@Hidden
	@GetMapping("/getClubMemberList/{clubNo}")
	public ResponseEntity<List<Map<String, Object>>> getClubMemberList(@PathVariable("clubNo") int clubNo) {
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

	@Operation(summary = "모임 신청 조회", description = "자신의 모임을 신청한 사용자를 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임신청 목록 반환")
    @ApiResponse(responseCode = "401", description = "모임신청 목록 조회 중 오류 발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/getAcceptMemberList/{clubNo}")
	public ResponseEntity<List<Map<String, Object>>> getAcceptMemberList(@PathVariable("clubNo") int clubNo) {
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

	@Hidden
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

	@Hidden
	@PostMapping("/exitClubMember")
	public void deleteClubMember(@RequestBody Map<String, Integer> requestBody, HttpServletResponse response) {
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

	@Operation(summary = "모임 신청 수락", description = "자신의 모임을 신청을 수락하고 신청자에게 알림을 발생")
	@ApiResponse(responseCode = "200", description = "정상적으로 신청 수락 및 알림 등록")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/acceptClubMember")
	public ResponseEntity<Integer> acceptClubMember(@RequestBody Map<String, Integer> requestBody) {
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

	@Operation(summary = "모임 신청 거절", description = "자신의 모임을 신청을 거절 후 상대방에게 알림을 발생")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 거절 및 알림 등록")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/refuseClubMember")
	public void refuseClubMember(@RequestBody Map<String, Integer> requestBody, HttpServletResponse response) {
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
	
	@Hidden
	@GetMapping("/clubMasterId/{clubNo}")
	public ResponseEntity<Integer> getClubMasterId(@PathVariable("clubNo") int clubNo){
		try {
			Club club =clubService.readByClub(clubNo);
			return ResponseEntity.status(HttpStatus.OK).body(Integer.valueOf(club.getUserId()));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
	@Operation(summary = "모임 삭제", description = "자신이 만든 모임을 삭제")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 삭제")
    @ApiResponse(responseCode = "401", description = "모임 삭제 중 오류 발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/deleteClub/{clubNo}")
	public void deleteClub(@PathVariable("clubNo") int clubNo,HttpServletResponse response) {
		try {
			Club club = clubService.readByClub(clubNo);
			if (!club.getClubImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
				deleteFile(club.getClubImage());
			}
			clubService.deleteClub(clubNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@Hidden
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