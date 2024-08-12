package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Alarm;
import com.kh.awoolim.mapper.AlarmMapper;

@Service
public class AlarmService {
	
	@Autowired
	private AlarmMapper mapper;
	
	public void register(Alarm alarm) {
		mapper.create(alarm);
	}
	public List<Alarm> getUnreadAlarms(int userId) {
        return mapper.findUnreadAlarmsByUserId(userId);
    }

    // 알림 읽음 처리
    public void markAlarmsAsRead(List<Integer> alarmNos) {
    	mapper.markAlarmsAsRead(alarmNos);
    }

	@Autowired
	private AlarmMapper alarmMapper;

	// 특정 유저의 읽지 않은 알림 가져오기
	public List<Alarm> getUnreadAlarms(int userId) {
		return alarmMapper.findUnreadAlarmsByUserId(userId);
	}

	// 알림 읽음 처리
	public void markAlarmsAsRead(List<Integer> alarmNos) {
		alarmMapper.markAlarmsAsRead(alarmNos);
	}

	// 알림 추가
	public void createAlarm(Alarm alarm) {
		alarmMapper.insertAlarm(alarm);
	}
}