package com.kh.awoolim.mapper;

import java.util.List;
import java.util.Map;

import com.kh.awoolim.domain.Report;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReportMapper {

	public void create(Report report);
	
	public List<Map<String,Object>> list(int userId);
	
	// 신고 목록 조회
    List<Map<String, Object>> selectReportList();

    // 신고 삭제
    void deleteReport(int reportNo);

    // 신고 결과 처리
    void updateReportResult(Report report);
}
