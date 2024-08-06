package com.kh.awoolim.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.awoolim.domain.Notice;

@Mapper
public interface NoticeMapper {
	List<Notice> getNoticeList();
	Notice getNoticeById(int noticeNo);  		//noticeNo에 일치하는 데이터만 읽기(read)
	void insertNotice(Notice notice);
	void updateNotice(Notice notice);
	void deleteNotice(int noticeNo);
	void increaseViewCount(int noticeNo); 		//조회수 증가
	List<Notice> searchNotices(String query); 	//검색하기
}
