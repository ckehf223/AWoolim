package com.kh.awoolim.service;

import com.kh.awoolim.domain.Club;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    AdminMapper adminMapper;

    // 회원 조회
    public List<Member> userList() {
       return adminMapper.userList();
    }

    // 회원 삭제
    public void deleteUser(int userId) {
        adminMapper.deleteUser(userId);
    }

    // 총 회원 수
    public int getTotalUsers() {
        return adminMapper.getTotalUsers();
    }

    // 총 신고 수
    public int getTotalReports() {
        return adminMapper.getTotalReports();
    }

    // 총 정기모임 수
    public int getTotalRegularClubs() {
        return adminMapper.getTotalRegularClubs();
    }

    // 총 일회성모임 수
    public int getTotalOneTimeClubs() {
        return adminMapper.getTotalOneTimeClubs();
    }

    // 모임 목록 조회
    public List<Club> clubList() {
        return adminMapper.clubList();
    }

    // 모임 상세 정보 조회
    public Map<String, Object> clubDetail(int clubNo) {
        return adminMapper.clubDetail(clubNo);
    }

    // 모임 참여 회원 조회
    public List<Member> selectClubMembers(int clubNo) {
        return adminMapper.selectClubMembers(clubNo);
    }

    // 남녀 성비를 가져오는 서비스 메서드
    public Map<String, Integer> selectGenderRatio() {
        return adminMapper.selectGenderRatio();
    }

    // 카테고리별 모임 수를 가져오는 서비스 메서드
    public List<Map<String, Object>> getCategoryCounts() {
        return adminMapper.selectCategoryCounts();
    }

    // 유저별 모임 참여 분포를 가져오는 서비스 메서드
    public List<Map<String, Object>> getUserParticipationStats() {
        return adminMapper.getUserParticipationStats();
    }



}
