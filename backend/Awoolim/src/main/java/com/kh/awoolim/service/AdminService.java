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


    public List<Member> userList() {
       return adminMapper.userList();
    }
}
