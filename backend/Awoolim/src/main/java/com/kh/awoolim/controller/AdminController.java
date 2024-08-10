package com.kh.awoolim.controller;

import com.kh.awoolim.domain.Club;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // 회원 목록 조회
    @GetMapping("/userlist")
    public List<Member> userLIst() {
       return adminService.userList();
    }

    // 회원 삭제
    @PostMapping("/userdelete")
    public void deleteUser(@RequestBody int userId) {
        adminService.deleteUser(userId);
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
    public Club clubDetail(@PathVariable int clubNo) {
        return adminService.clubDetail(clubNo);
    }

    @GetMapping("/club/{clubNo}/members")
    public List<Member> getClubMembers(@PathVariable("clubNo") int clubNo) {
        return adminService.selectClubMembers(clubNo);
    }

}
