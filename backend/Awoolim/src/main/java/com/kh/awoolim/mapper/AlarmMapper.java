package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.Alarm;

@Mapper
public interface AlarmMapper {

	// 알림 생성
	void create(Alarm alarm);

	// 특정 유저의 읽지 않은 알림 목록 조회
	List<Alarm> findUnreadAlarmsByUserId(@Param("userId") int userId);

	// 알림 읽음 처리
	void markAlarmsAsRead(@Param("alarmNos") List<Integer> alarmNos);

	// 특정 알림 조회 (알림 번호로)
	Alarm findAlarmById(@Param("alarmNo") int alarmNo);
}
