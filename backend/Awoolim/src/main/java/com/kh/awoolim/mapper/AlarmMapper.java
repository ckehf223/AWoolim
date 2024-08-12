package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.kh.awoolim.domain.Alarm;

public interface AlarmMapper {

	public void create(Alarm alarm);
	
    List<Alarm> findUnreadAlarmsByUserId(@Param("userId") int userId);

    // 알림 읽음 처리
    void markAlarmsAsRead(@Param("alarmNos") List<Integer> alarmNos);

}
