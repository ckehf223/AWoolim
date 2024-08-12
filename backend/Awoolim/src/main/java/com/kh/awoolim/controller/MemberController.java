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

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
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

	@PostMapping("/checkEmail")
	public ResponseEntity<Boolean> checkEmail(@RequestBody Map<String, String> requestBody) {
		log.info("Post checkEmail");
		try {
			String userEmail = requestBody.get("userEmail");
			boolean success = service.checkEmail(userEmail);
			return ResponseEntity.status(HttpStatus.OK).body(Boolean.valueOf(success));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}

	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<Boolean> checkEmailDefault(@PathVariable("email") String email) {
		log.info("Get checkEmail");
		try {
			boolean success = service.checkEmailDefault(email);
			return ResponseEntity.status(HttpStatus.OK).body(Boolean.valueOf(success));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@PostMapping("/registerMember")
	public void registerMember(@RequestBody Member member, HttpServletResponse response) {
		log.info("registerMember POST ENTER");
		log.info(member.toString());
		try {
			service.register(member);
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

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

	@PutMapping("/updatePassword")
	public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> requestBody) {
		log.info("updatePassword");
		try {
			String userEmail = requestBody.get("userEmail");
			String newPassword = requestBody.get("newPassword");
			log.info(userEmail);
			log.info(newPassword);
			service.updatePassword(userEmail, newPassword);
			return ResponseEntity.ok("success");
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@GetMapping("/getProfile")
	public ResponseEntity<Member> getProfile(HttpServletRequest request) {
		log.info("getProfil GET ENTER");
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

	@GetMapping("/readUser")
	public ResponseEntity<Member> readUser(HttpServletRequest request) {
		log.info("readUser GET ENTER");
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
			System.out.println(checkImage);
			System.out.println(checkBack);
			System.out.println(userImage);
			System.out.println(userBackImage);
			switch (checkImage) {
			case "1":
				// UUID 생성
				if (!member.getUserImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
					deleteFile(member.getUserImage());
					member.setUserImage("dce899f2-eca3-4886-8400-f31bfd64de1f.png");
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
				if (!member.getUserBackImage().trim().equals("305d04e5-e53d-4419-8beb-555330a6a3d4.png")) {
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
