package com.kh.awoolim.service;

import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    //총 회원 수
    public int getTotalUsers() {
        return adminMapper.getTotalUsers();
    }

    //총 신고 수
    public int getTotalReports() {
        return adminMapper.getTotalReports();
    }

    // 총 정기모임 수
    public int getTotalRegularClubs() {
        return adminMapper.getTotalRegularClubs();
    }

    //총 일회성모임 수
    public int getTotalOneTimeClubs() {
        return adminMapper.getTotalOneTimeClubs();
    }


}
