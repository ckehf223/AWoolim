package com.kh.awoolim.controller;

import com.kh.awoolim.domain.Report;
import com.kh.awoolim.service.ReportService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("/admin/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // 신고 목록 조회
    @GetMapping("/list")
    public List<Report> selectReportList() {
        return reportService.selectReportList();
    }

    // 신고 삭제
    @PostMapping("/delete")
    public void deleteReport(@RequestBody int reportNo) {
        reportService.deleteReport(reportNo);
    }

    // 신고 결과 처리
    @PostMapping("/update")
    public void updateReportResult(@RequestBody Report report) {
        reportService.updateReportResult(report);
    }


}
