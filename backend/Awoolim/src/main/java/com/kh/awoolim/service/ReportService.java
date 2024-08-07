package com.kh.awoolim.service;

import com.kh.awoolim.domain.Report;
import com.kh.awoolim.mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    ReportMapper reportMapper;

    // 신고 목록 조회
    public List<Report> selectReportList() {
        return reportMapper.selectReportList();
    }

    // 신고 삭제
    public void deleteReport(int reportNo) {
        reportMapper.deleteReport(reportNo);
    }

    // 신고 결과 처리, 경고 카운트 증가
    public void updateReportResult(Report report) {
        reportMapper.updateReportResult(report);
        if (report.getResult() == 1) {
            try {
                System.out.println("Increasing warning count for targetId: " + report.getTargetId());
                int rowsAffected = reportMapper.increaseWarningCount(report.getTargetId());
                if (rowsAffected == 0) {
                    System.out.println("No user found with targetId: " + report.getTargetId());
                } else {
                    System.out.println("Warning count updated successfully for targetId: " + report.getTargetId());
                }
            } catch (Exception e) {
                System.out.println("Warning count update failed for targetId: " + report.getTargetId() + ", error: " + e.getMessage());
            }
        }
    }


}