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
}
