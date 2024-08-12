package com.kh.awoolim.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.domain.ClubGallery;
import com.kh.awoolim.service.PhotoGalleryService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/photoGallery")
public class PhotoGalleryController {

	@Autowired
	private PhotoGalleryService photoGalleryService;

	private final JWTUtil jwtUtil;
	
	@Value("${upload.path}")
    private String uploadDir;
	
	public PhotoGalleryController(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}
	
	@PostMapping("/upload")
	public void uploadPhoto(@RequestParam("clubno") int clubNo,
			@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			// 파일이 비어 있는지 확인
			if (file == null) {
				response.sendError(HttpStatus.BAD_REQUEST.value(), "File is null");
				return;
			}

			String accessToken = request.getHeader("Authorization").substring(7);
			
			System.out.println(accessToken);
			int userId = jwtUtil.getUserId(accessToken);
			
			ClubGallery clubGallery = new ClubGallery();
			clubGallery.setUserId(userId);
			clubGallery.setClubNo(clubNo);
			System.out.println("CLUBno"+clubNo);
			System.out.println("USERiD"+userId);
			String uuid = UUID.randomUUID().toString();
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFileName = uuid + fileExtension;
            clubGallery.setImage(newFileName);
            System.out.println("fileName="+newFileName);
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadDir + File.separator + newFileName);
            Files.write(path, bytes);
            path.toFile().getCanonicalPath();
            
            photoGalleryService.savePhoto(clubGallery);
			// Service 메서드 호출 시 MultipartFile을 전달하여 파일 저장 처리
//			photoGalleryService.savePhoto(clubNo, file);
			response.setStatus(HttpStatus.OK.value());
		} catch (IOException e) {
			// IO 관련 예외 처리
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			try {
				response.getWriter().write("Error saving file: " + e.getMessage());
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}
		} catch (Exception e) {
			// 기타 예외 처리
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			try {
				response.getWriter().write("Error processing request: " + e.getMessage());
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}
		}
	}
	
	@GetMapping("/{clubNo}")
	public ResponseEntity<List<ClubGallery>> getPhotos(@PathVariable("clubNo") int clubNo){
		try {
			List<ClubGallery> list = photoGalleryService.getPhotoList(clubNo);
			if(list != null && list.size() > 0) {
				return ResponseEntity.status(HttpStatus.OK).body(list);
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	public String encodeImageToBase64(String imagePath) throws IOException {
		ClassPathResource imgFile = new ClassPathResource(imagePath);
		byte[] imageBytes = Files.readAllBytes(imgFile.getFile().toPath());
		return Base64.getEncoder().encodeToString(imageBytes);
	}

}
