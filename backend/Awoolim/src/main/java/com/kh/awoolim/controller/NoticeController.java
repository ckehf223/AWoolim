package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	@GetMapping("/list")
	public List<Notice> getNoticeList(HttpServletResponse response) {
		try {
			response.setStatus(HttpStatus.OK.value());
			return noticeService.getNoticeList();
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
	}

	@GetMapping("/read/{noticeNo}")
	public Notice getNoticeById(@PathVariable int noticeNo,HttpServletResponse response) {
		try {
			response.setStatus(HttpStatus.OK.value());
			return noticeService.getNoticeById(noticeNo);
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
	}

	@PostMapping("/insert")
	public void insertNotice(@RequestBody Notice notice,HttpServletResponse response) {
		try {
			noticeService.insertNotice(notice);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

	@PostMapping("/update/{noticeNo}")
	public void updateNotice(@PathVariable int noticeNo, @RequestBody Notice notice,HttpServletResponse response) {
		try {
			notice.setNoticeNo(noticeNo);
			noticeService.updateNotice(notice);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

	// 조회수 증가
	@PutMapping("/increaseView/{noticeNo}")
	public void increaseViewCount(@PathVariable int noticeNo,HttpServletResponse response) {
		try {
			noticeService.increaseViewCount(noticeNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

	@DeleteMapping("/delete/{noticeNo}")
	public void deleteNotice(@PathVariable int noticeNo,HttpServletResponse response) {
		try {
			noticeService.deleteNotice(noticeNo);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}

	// 검색하기
	@GetMapping("/search")
	public List<Notice> searchNotices(@RequestParam String query) {
		return noticeService.searchNotices(query);
	}

}
