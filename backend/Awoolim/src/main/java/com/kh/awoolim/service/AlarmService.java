package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Alarm;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.AlarmMapper;
import com.kh.awoolim.mapper.MemberMapper;

@Service
public class AlarmService {

	@Autowired
	private AlarmMapper alarmMapper;

	@Autowired
	private MemberMapper memberMapper;

	// 알림 등록
	public void register(Alarm alarm) {
		alarmMapper.create(alarm);
	}

	// 특정 유저의 읽지 않은 알림 가져오기
	public List<Alarm> getUnreadAlarms(int userId) {
		return alarmMapper.findUnreadAlarmsByUserId(userId);
	}

	// 알림 읽음 처리
	public void markAlarmsAsRead(List<Integer> alarmNos) {
		alarmMapper.markAlarmsAsRead(alarmNos);
	}

	// 이메일을 통해 userId를 가져오기 위한 메서드
	public int getUserIdByEmail(String email) {
		Member member = memberMapper.findByEmail(email);
		if (member != null) {
			return member.getUserId(); // 유저 ID 반환
		} else {
			throw new RuntimeException("User not found with email: " + email);
		}
	}

	// alarmNo를 통해 특정 알림을 가져오기 위한 메서드
	public Alarm getAlarmById(int alarmNo) {
		return alarmMapper.findAlarmById(alarmNo);
	}
}
