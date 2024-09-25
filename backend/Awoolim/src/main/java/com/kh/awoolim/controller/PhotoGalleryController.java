package com.kh.awoolim.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
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
import com.kh.awoolim.service.ClubGalleryService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/photoGallery")
@Tag(name = "PhotoGallery", description = "사진첩 관련 API")
public class PhotoGalleryController {

	@Autowired
	private ClubGalleryService clubGalleryService;

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
			
			int userId = jwtUtil.getUserId(accessToken);
			
			ClubGallery clubGallery = new ClubGallery();
			clubGallery.setUserId(userId);
			clubGallery.setClubNo(clubNo);
			String uuid = UUID.randomUUID().toString();
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFileName = uuid + fileExtension;
            clubGallery.setImage(newFileName);
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadDir + File.separator + newFileName);
            Files.write(path, bytes);
            path.toFile().getCanonicalPath();
            
            clubGalleryService.savePhoto(clubGallery);
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
			List<ClubGallery> list = clubGalleryService.getPhotoList(clubNo);
			if(list != null && list.size() > 0) {
				return ResponseEntity.status(HttpStatus.OK).body(list);
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@PostMapping("/deletePhoto/{picNo}")
	public void deletePhoto(@PathVariable("picNo") int picNo,HttpServletResponse response) {
		try {
			ClubGallery clubGallery = clubGalleryService.read(picNo);
			if(clubGallery.getImage() != null && clubGallery.getImage().equals("null") && clubGallery.getImage().trim().equals("305d04e5-e53d-4419-8beb-555330a6a3d4.png")) {
				deleteFile(clubGallery.getImage());
			}
			clubGalleryService.delete(picNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
		
	}
	
	public void deleteFile(String fileName) {
		Path filePath = Paths.get("src/main/resources/static/images/" + fileName);

		try {
			Files.deleteIfExists(filePath); 
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("file 삭제중 오류발생");
		}
	}

}
