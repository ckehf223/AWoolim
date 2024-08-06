package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Notice;
import com.kh.awoolim.service.NoticeService;

@RestController
@RequestMapping("/admin/notices")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	@GetMapping("/list")
	public List<Notice> getNoticeList() {
		return noticeService.getNoticeList();
	}

	@GetMapping("/read/{noticeNo}")
	public Notice getNoticeById(@PathVariable int noticeNo) {
		return noticeService.getNoticeById(noticeNo);
	}

	@PostMapping("/insert")
	public void insertNotice(@RequestBody Notice notice) {
		noticeService.insertNotice(notice);
	}

	@PostMapping("/update/{noticeNo}")
	public void updateNotice(@PathVariable int noticeNo, @RequestBody Notice notice) {
		notice.setNoticeNo(noticeNo);
		noticeService.updateNotice(notice);
	}

	// 조회수 증가
	@PutMapping("/increaseView/{noticeNo}")
	public void increaseViewCount(@PathVariable int noticeNo) {
		noticeService.increaseViewCount(noticeNo);
	}

	@DeleteMapping("/delete/{noticeNo}")
	public void deleteNotice(@PathVariable int noticeNo) {
		noticeService.deleteNotice(noticeNo);
	}

	// 검색하기
	@GetMapping("/search")
	public List<Notice> searchNotices(@RequestParam String query) {
		return noticeService.searchNotices(query);
	}

}
