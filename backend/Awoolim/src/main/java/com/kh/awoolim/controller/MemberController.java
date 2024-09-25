package com.kh.awoolim.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.domain.Member;
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
@RestController
@RequestMapping("/member")
@Tag(name = "Member", description = "사용자 관련 API")
public class MemberController {

	@Autowired
	private MemberService service;
	@Value("${upload.path}")
	private String uploadDir;
	@Autowired
	public BCryptPasswordEncoder bCryptPasswordEncoder;
	
	private final JWTUtil jwtUtil;

	public MemberController(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Operation(summary = "이메일 중복확인", description = "회원가입시 이메일 중복검사")
	@ApiResponse(responseCode = "200", description = "true 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/checkEmail")
	public ResponseEntity<Boolean> checkEmail(@RequestBody Map<String, String> requestBody) {
		try {
			String userEmail = requestBody.get("userEmail");
			boolean success = service.checkEmail(userEmail);
			return ResponseEntity.status(HttpStatus.OK).body(Boolean.valueOf(success));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}

	@Operation(summary = "회원가입 타입 확인", description = "회원가입 타입을 확인")
	@ApiResponse(responseCode = "200", description = "회원가입 타입이 default 이면 true 반환 아니면 false반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<Boolean> checkEmailDefault(@Parameter(description = "이메일 아이디")@PathVariable("email") String email) {
		try {
			boolean success = service.checkEmailDefault(email);
			return ResponseEntity.status(HttpStatus.OK).body(Boolean.valueOf(success));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@Operation(summary = "회원가입", description = "사용자 회원가입")
	@ApiResponse(responseCode = "200", description = "사용자 회원가입 완료")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/registerMember")
	public void registerMember(@RequestBody Member member, HttpServletResponse response) {
		try {
			service.register(member);
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

	@Operation(summary = "전화번호로 사용자 조회", description = "고유 전화번호로 사용자를 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 사용자 정보 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/getMemberByPhone")
	public ResponseEntity<Member> getMemberByEmail(@RequestBody Map<String, String> requestBody) {
		try {
			String userPhone = requestBody.get("phoneNumber");
			Member member = service.findByPhone(userPhone);
			return ResponseEntity.ok(member);
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@Operation(summary = "사용자 비밀번호 변경", description = "사용자 비밀번호 변경 후 암호화진행")
	@ApiResponse(responseCode = "200", description = "정상적으로 비밀번호 변경")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PutMapping("/updatePassword")
	public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> requestBody) {
		try {
			String userEmail = requestBody.get("userEmail");
			String newPassword = requestBody.get("newPassword");
			service.updatePassword(userEmail, newPassword);
			return ResponseEntity.ok("success");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@Operation(summary = "사용자 프로필 조회", description = "accessToken으로 로그인 사용자 프로필 조회")
	@ApiResponse(responseCode = "200", description = "사용자 정보 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/getProfile")
	public ResponseEntity<Member> getProfile(HttpServletRequest request) {
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Member member = service.getProfile(userId);
			return ResponseEntity.status(HttpStatus.OK).body(member);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@Hidden
	@GetMapping("/readUser")
	public ResponseEntity<Member> readUser(HttpServletRequest request) {
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Member member = service.readMember(userId);
			return ResponseEntity.status(HttpStatus.OK).body(member);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@Operation(summary = "사용자 프로필 수정", description = "사용자 프로필 수정 및 이미지 파일 업데이트")
	@ApiResponse(responseCode = "200", description = "사용자 정보 업데이트")
	@ApiResponse(responseCode = "401", description = "사용자 정보 업데이트 중 오류발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/updateProfile")
	public void updateProfile(@RequestParam("nickName") String nickName,
			@RequestParam(value = "userImage", required = false) MultipartFile userImage,
			@RequestParam(value = "userBackImage", required = false) MultipartFile userBackImage,
			@RequestParam("checkImage") String checkImage, @RequestParam("checkBack") String checkBack,
			@RequestParam("userIntro") String userIntro, HttpServletRequest request,HttpServletResponse response) {

		log.info("updateProfile POST Enter");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Member member = service.readMember(userId);
			member.setNickName(nickName);
			member.setUserIntro(userIntro);

			// 디렉토리가 존재하지 않으면 생성
			Path uploadPath = Paths.get(uploadDir);
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			switch (checkImage) {
			case "1":
				// UUID 생성
				if (!member.getUserImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
					deleteFile(member.getUserImage());
				}
				String uuid = UUID.randomUUID().toString();
				String originalFilename = userImage.getOriginalFilename();
				String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
				String newFileName = uuid + fileExtension;
				member.setUserImage(newFileName);
				byte[] bytes = userImage.getBytes();
				Path path = Paths.get(uploadDir + File.separator + newFileName);
				Files.write(path, bytes);
				path.toFile().getCanonicalPath();
				break;
			case "0":
				if (!member.getUserImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
					deleteFile(member.getUserImage());
					member.setUserImage("dce899f2-eca3-4886-8400-f31bfd64de1f.png");
				}
				break;
			}

			switch (checkBack) {
			case "1":
				if (member.getUserBackImage() != "null" && member.getUserBackImage()!= null &&!member.getUserBackImage().trim().equals("305d04e5-e53d-4419-8beb-555330a6a3d4.png")) {
					deleteFile(member.getUserBackImage());
				}
				String uuid = UUID.randomUUID().toString();
				String originalFilename = userBackImage.getOriginalFilename();
				String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
				String newFileName = uuid + fileExtension;
				member.setUserBackImage(newFileName);
				byte[] bytes = userBackImage.getBytes();
				Path path = Paths.get(uploadDir + File.separator + newFileName);
				Files.write(path, bytes);
				path.toFile().getCanonicalPath();
				break;
			case "0":
				if (!member.getUserBackImage().trim().equals("305d04e5-e53d-4419-8beb-555330a6a3d4.png")) {
					deleteFile(member.getUserBackImage());
				}
				member.setUserBackImage("");
				break;
			}
			service.updateProfile(member);
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@Hidden
	@PostMapping("/modifyMember")
	public void modifyMember(@RequestBody Map<String, String> requestBody, HttpServletRequest request,
			HttpServletResponse response) {
		log.info("modifyMember POST ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Member member = service.readMember(userId);
			String userEmail = requestBody.get("userEmail");
			String userPhone = requestBody.get("userPhone");
			String password = requestBody.get("password");
			if(userEmail != null && userEmail != "") {
				member.setUserEmail(userEmail);
			}
			if(userPhone != null && userPhone != "") {
				member.setUserPhone(userPhone);
			}
			if(password != null && password != "") {
				member.setPassword(bCryptPasswordEncoder.encode(password));
			}
			service.updateUser(member);
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}

	}
	
	@Operation(summary = "사용자 탈퇴", description = "사용자 탈퇴")
	@ApiResponse(responseCode = "200", description = "정상적으로 사용자 탈퇴 완료")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/delete")
	public void deleteUser(HttpServletRequest request,HttpServletResponse response) {
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			Member member = service.readMember(userId);
			if (!member.getUserImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
				deleteFile(member.getUserImage());
			}
			if (member.getUserBackImage() != "null" && member.getUserBackImage()!= null &&!member.getUserBackImage().trim().equals("305d04e5-e53d-4419-8beb-555330a6a3d4.png")) {
				deleteFile(member.getUserBackImage());
			}
			service.delete(userId);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
		
	}
	@Hidden
	public void deleteFile(String fileName) {
		Path filePath = Paths.get("src/main/resources/static/images/" + fileName);
		try {
			Files.deleteIfExists(filePath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
