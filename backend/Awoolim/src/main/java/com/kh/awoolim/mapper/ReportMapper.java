package com.kh.awoolim.mapper;

import com.kh.awoolim.domain.Report;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReportMapper {

    // 신고 목록 조회
    List<Report> selectReportList();

    // 신고 삭제
    void deleteReport(int reportNo);

    // 신고 결과 처리
    void updateReportResult(Report report);

    // 경고 카운트 증가
    int increaseWarningCount(String targetId);

}
