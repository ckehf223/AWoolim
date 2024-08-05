package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Notice;
import com.kh.awoolim.mapper.NoticeMapper;

@Service
public class NoticeService {
	
	@Autowired
	private NoticeMapper noticeMapper;

	public List<Notice> getNoticeList() {
		return noticeMapper.getNoticeList();
	}

	public Notice getNoticeById(int noticeNo) {
		return noticeMapper.getNoticeById(noticeNo);
	}

	public void insertNotice(Notice notice) {
		noticeMapper.insertNotice(notice);
	}

	public void updateNotice(Notice notice) {
		noticeMapper.updateNotice(notice);
	}

	public void deleteNotice(int noticeNo) {
		noticeMapper.deleteNotice(noticeNo);
	}

	// 조회수 증가
	public void increaseViewCount(int noticeNo) {
		noticeMapper.increaseViewCount(noticeNo);
	}

	// 검색하기
	public List<Notice> searchNotices(String query) {
		return noticeMapper.searchNotices(query);
	}

}
