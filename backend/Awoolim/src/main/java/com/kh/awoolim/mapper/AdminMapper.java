package com.kh.awoolim.mapper;

import java.util.List;
import java.util.Map;

import com.kh.awoolim.domain.Club;
import org.apache.ibatis.annotations.Mapper;

import com.kh.awoolim.domain.Admin;
import com.kh.awoolim.domain.Member;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminMapper {

    // 회원 목록 조회
    List<Member> userList();
    
    public Admin findById(String id);

    // 회원 삭제
    void deleteUser(int userId);

    // 총 회원 수
    int getTotalUsers();

    // 총 신고 수
    int getTotalReports();

    // 총 정기모임 수
    int getTotalRegularClubs();

    // 총 일회성모임 수
    int getTotalOneTimeClubs();

    // 모임 목록 조회
    List<Club> clubList();

    // 모임 상세 정보 조회
    Map<String, Object> clubDetail(@Param("clubNo") int clubNo);

    // 모임 참여 회원 조회
    List<Member> selectClubMembers(int clubNo);

    // 남녀 성비 조회
    Map<String, Integer> selectGenderRatio();

    // 카테고리별 모임 수 조회
    List<Map<String, Object>> selectCategoryCounts();

    // 유저별 모임 참여 분포
    List<Map<String, Object>> getUserParticipationStats();
}
