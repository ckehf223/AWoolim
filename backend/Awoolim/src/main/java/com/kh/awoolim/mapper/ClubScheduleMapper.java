package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.ClubSchedule;

@Mapper
public interface ClubScheduleMapper {
	List<ClubSchedule> getSchedulesByClubNo(@Param("clubNo") int clubNo);
}
