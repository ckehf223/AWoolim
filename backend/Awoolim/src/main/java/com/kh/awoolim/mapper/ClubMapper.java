package com.kh.awoolim.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.Club;

@Mapper
public interface ClubMapper {

	List<Club> getAllClubs();

	byte[] getImage(String imageName);

	List<Club> searchClubs(@Param("searchTerm") String searchTerm, @Param("filters") Map<String, Object> filters);
}
