package com.kh.awoolim.service;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.ClubGallery;
import com.kh.awoolim.mapper.ClubGalleryMapper;

@Service
public class ClubGalleryService {

	@Autowired
	private ClubGalleryMapper clubGalleryMapper;

	public ClubGallery read(int picNo) {
		return clubGalleryMapper.read(picNo);
	}
	
	public void delete(int picNo) {
		clubGalleryMapper.delete(picNo);
	}
	
	public void savePhoto(ClubGallery clubGallery) throws IOException {

		clubGalleryMapper.savePhoto(clubGallery);

	}
	
	public List<ClubGallery> getPhotoList(int clubNo){
		try {
			List<ClubGallery> list = clubGalleryMapper.findPhotosByClubNo(clubNo);
			if(list != null && list.size() > 0) {
				for(ClubGallery data : list) {
					String image = (String)encodeImageToBase64("/static/images/" +data.getImage());
					data.setImage("data:image/jpeg;base64,"+image);
				}
			}
			return list;
		}catch(Exception e) {
			System.err.println("Error encoding image for photo " +  e.getMessage());
			return null;
		}
	}
	public String encodeImageToBase64(String imagePath) throws IOException {
		ClassPathResource imgFile = new ClassPathResource(imagePath);
		byte[] imageBytes = Files.readAllBytes(imgFile.getFile().toPath());
		return Base64.getEncoder().encodeToString(imageBytes);
	}
}
