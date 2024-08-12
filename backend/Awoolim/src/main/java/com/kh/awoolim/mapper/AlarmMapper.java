package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.Alarm;

@Mapper
public interface AlarmMapper {

	// 특정 유저의 읽지 않은 알림 가져오기
	List<Alarm> findUnreadAlarmsByUserId(@Param("userId") int userId);

	// 알림 읽음 처리
	void markAlarmsAsRead(@Param("alarmNos") List<Integer> alarmNos);

	// 알림 추가
	void insertAlarm(Alarm alarm);
}