package com.kh.awoolim.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.kh.awoolim.service.MemberService;
import com.kh.awoolim.service.ReportService;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin", description = "관리자 관련 API")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private ClubService clubService;
    @Autowired
    private MemberService memberService;

    @Operation(summary = "모든 사용자 조회", description = "모든 사용자 정보 목록으로 조회")
    @ApiResponse(responseCode = "200", description = "정상적으로 사용자 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @GetMapping("/userlist")
    public List<Member> userList() {
       return adminService.userList();
    }

    @Operation(summary = "특정 회원 삭제", description = "신고,경고에 따라 사용자 삭제 및 강제 삭제")
    @ApiResponse(responseCode = "200", description = "정상적으로 특정 사용자 삭제완료")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @PostMapping("/userdelete/{userId}")
    public void deleteUser(@Parameter(description = "삭제대상 userId")@PathVariable("userId") int userId,HttpServletResponse response) {
    	try {
    		Member member = memberService.readMember(userId);
			if (!member.getUserImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
				deleteFile(member.getUserImage());
			}
			if (member.getUserBackImage() != "null" && member.getUserBackImage()!= null &&!member.getUserBackImage().trim().equals("305d04e5-e53d-4419-8beb-555330a6a3d4.png")) {
				deleteFile(member.getUserBackImage());
			}
    		adminService.deleteUser(userId);
    		response.setStatus(HttpStatus.OK.value());
    	}catch(Exception e) {
    		response.setStatus(HttpStatus.UNAUTHORIZED.value());
    	}
    }
    
    @Hidden
    @GetMapping("/stats")
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", adminService.getTotalUsers());
        stats.put("totalReports", adminService.getTotalReports());
        stats.put("totalRegularClubs", adminService.getTotalRegularClubs());
        stats.put("totalOneTimeClubs", adminService.getTotalOneTimeClubs());
        return stats;
    }
    
    @Operation(summary = "모든 모임 조회", description = "모든 모임 목록으로 조회")
    @ApiResponse(responseCode = "200", description = "정상적으로 모임 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @GetMapping("/clublist")
    public List<Club> clubList() {
        List<Club> clubs = adminService.clubList();
        return clubs;
    }

    @Operation(summary = "특정 모임 조회", description = "모임 상세 정보를 조회")
    @ApiResponse(responseCode = "200", description = "정상적으로 모임 정보 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @GetMapping("/club/{clubNo}")
    public Map<String, Object> getClubDetail(@Parameter(description = "모임 고유 번호")@PathVariable("clubNo") int clubNo) {
        return adminService.clubDetail(clubNo);
    }

    @Operation(summary = "특정 모임 내 참여자 조회", description = "모임 참여자를 조회하여 목록으로 확인")
    @ApiResponse(responseCode = "200", description = "정상적으로 모임 참여자 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @GetMapping("/club/{clubNo}/members")
    public List<Member> getClubMembers(@Parameter(description = "모임 고유 번호")@PathVariable("clubNo") int clubNo) {
        return adminService.selectClubMembers(clubNo);
    }

    @Operation(summary = "모임 삭제", description = "신고,경고,부적절함을 확인하여 모임을 삭제")
    @ApiResponse(responseCode = "200", description = "정상적으로 모임 삭제")
    @ApiResponse(responseCode = "401", description = "모임 삭제 중 오류발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @PostMapping("/deleteClub/{clubNo}")
	public void deleteClub(@Parameter(description = "모임 고유 번호")@PathVariable("clubNo") int clubNo,HttpServletResponse response) {
		try {
			Club club = clubService.readByClub(clubNo);
			if (!club.getClubImage().trim().equals("dce899f2-eca3-4886-8400-f31bfd64de1f.png")) {
				deleteFile(club.getClubImage());
			}
			clubService.deleteClub(clubNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
    
    @Hidden
    @GetMapping("/gender")
    public ResponseEntity<Map<String, Integer>> getGenderRatio() {
        Map<String, Integer> genderRatio = adminService.selectGenderRatio();
        return ResponseEntity.ok(genderRatio);
    }

    @Hidden
    @GetMapping("/categorycounts")
    public List<Map<String, Object>> getCategoryCounts() {
        return adminService.getCategoryCounts();
    }

    @Hidden
    @GetMapping("/user-participation-stats")
    public List<Map<String, Object>> getUserParticipationStats() {
        return adminService.getUserParticipationStats();
    }

    @Operation(summary = "신고 내역 조회", description = "모든 신고 내역 목록으로 조회")
    @ApiResponse(responseCode = "200", description = "정상적으로 신고 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @GetMapping("/report/list")
    public List<Map<String, Object>> selectReportList() {
        return reportService.selectReportList();
    }

    @Hidden
    @PostMapping("/report/delete")
    public void deleteReport(@Parameter(description = "신고 고유 번호")@RequestBody int reportNo) {
        reportService.deleteReport(reportNo);
    }

    @Operation(summary = "신고 결과 처리", description = "신고 내용을 확인하여 결과 업데이트")
    @ApiResponse(responseCode = "200", description = "정상적으로 신고 처리 업데이트")
    @ApiResponse(responseCode = "401", description = "신고 처리 업데이트 중 오류발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @PostMapping("/report/update")
    public void updateReportResult(@Parameter(description = "dto")@RequestBody Report report) {
        reportService.updateReportResult(report);
    }
    
    @Hidden
    public void deleteFile(String fileName) {
		// 이미지 파일의 절대 경로를 생성
		Path filePath = Paths.get("src/main/resources/static/images/" + fileName);

		try {
			Files.deleteIfExists(filePath); // 파일이 존재하는 경우 삭제
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("file 삭제중 오류발생");
		}
	}
}
