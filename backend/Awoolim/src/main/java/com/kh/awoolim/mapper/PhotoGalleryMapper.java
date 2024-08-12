package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.ClubGallery;

@Mapper
public interface PhotoGalleryMapper {

	// 특정 클럽 번호에 해당하는 이미지 파일 이름 리스트를 반환
	List<ClubGallery> findPhotosByClubNo(int clubNo);

	// 특정 클럽 번호에 새로운 이미지 파일 이름을 저장
	public void savePhoto(ClubGallery clubGallery);
}
