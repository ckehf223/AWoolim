package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.ClubSchedule;

@Mapper
public interface ClubScheduleMapper {
	List<ClubSchedule> getSchedulesByClubNo(@Param("clubNo") int clubNo);
	
	public void create(ClubSchedule clubSchedule);
	
	public ClubSchedule findBySchedule(ClubSchedule cs);
	
	public void update(ClubSchedule cs);
	
	public void delete(int clubNo,String dDay);
}
