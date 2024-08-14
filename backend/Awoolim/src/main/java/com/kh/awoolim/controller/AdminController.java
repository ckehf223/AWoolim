package com.kh.awoolim.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Club;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.domain.Report;
import com.kh.awoolim.service.AdminService;
import com.kh.awoolim.service.ClubService;
import com.kh.awoolim.service.ReportService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private ClubService clubService;
    // 회원 목록 조회
    @GetMapping("/userlist")
    public List<Member> userLIst() {
       return adminService.userList();
    }

    // 회원 삭제
    @PostMapping("/userdelete/{userId}")
    public void deleteUser(@PathVariable("userId") int userId,HttpServletResponse response) {
    	try {
    		adminService.deleteUser(userId);
    		response.setStatus(HttpStatus.OK.value());
    	}catch(Exception e) {
    		response.setStatus(HttpStatus.UNAUTHORIZED.value());
    	}
    }

    @GetMapping("/stats")
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", adminService.getTotalUsers());
        stats.put("totalReports", adminService.getTotalReports());
        stats.put("totalRegularClubs", adminService.getTotalRegularClubs());
        stats.put("totalOneTimeClubs", adminService.getTotalOneTimeClubs());
        return stats;
    }

    @GetMapping("/clublist")
    public List<Club> clubList() {
        List<Club> clubs = adminService.clubList();
        return clubs;
    }

    @GetMapping("/club/{clubNo}")
    public Map<String, Object> getClubDetail(@PathVariable("clubNo") int clubNo) {
        return adminService.clubDetail(clubNo);
    }

    @GetMapping("/club/{clubNo}/members")
    public List<Member> getClubMembers(@PathVariable("clubNo") int clubNo) {
        return adminService.selectClubMembers(clubNo);
    }

    @PostMapping("/deleteClub/{clubNo}")
	public void deleteClub(@PathVariable("clubNo") int clubNo,HttpServletResponse response) {
		try {
			clubService.deleteClub(clubNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
    
    @GetMapping("/gender")
    public ResponseEntity<Map<String, Integer>> getGenderRatio() {
        Map<String, Integer> genderRatio = adminService.selectGenderRatio();
        return ResponseEntity.ok(genderRatio);
    }

    @GetMapping("/categorycounts")
    public List<Map<String, Object>> getCategoryCounts() {
        return adminService.getCategoryCounts();
    }

    @GetMapping("/user-participation-stats")
    public List<Map<String, Object>> getUserParticipationStats() {
        return adminService.getUserParticipationStats();
    }

    // 신고 목록 조회
    @GetMapping("/report/list")
    public List<Map<String, Object>> selectReportList() {
        return reportService.selectReportList();
    }

    // 신고 삭제
    @PostMapping("/report/delete")
    public void deleteReport(@RequestBody int reportNo) {
        reportService.deleteReport(reportNo);
    }

    // 신고 결과 처리
    @PostMapping("/report/update")
    public void updateReportResult(@RequestBody Report report) {
        reportService.updateReportResult(report);
    }
}
