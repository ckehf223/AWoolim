package com.kh.awoolim.mapper;

import com.kh.awoolim.domain.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    List<Member> userList();
}
