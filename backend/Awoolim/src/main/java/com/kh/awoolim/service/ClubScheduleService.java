package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.ClubSchedule;
import com.kh.awoolim.mapper.ClubScheduleMapper;

@Service
public class ClubScheduleService {

	@Autowired
	private ClubScheduleMapper clubScheduleMapper;

	public List<ClubSchedule> getSchedulesByClubNo(int clubNo) {
		return clubScheduleMapper.getSchedulesByClubNo(clubNo);
	}
	public void register(ClubSchedule cs) {
		clubScheduleMapper.create(cs);
	}
	public ClubSchedule findBySchedule(ClubSchedule cs) {
		return clubScheduleMapper.findBySchedule(cs);
	}
	public void update(ClubSchedule cs) {
		clubScheduleMapper.update(cs);
	}
	public void delete(int clubNo,String dDay) {
		clubScheduleMapper.delete(clubNo, dDay);
	}
}
