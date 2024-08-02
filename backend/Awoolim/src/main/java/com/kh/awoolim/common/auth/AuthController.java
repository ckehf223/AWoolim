//package com.kh.awoolim.common.auth;
//
//import java.io.IOException;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.kh.awoolim.domain.Member;
//
//import jakarta.servlet.http.HttpServletResponse;
//
//@Controller
//public class AuthController {
//	
//	private MemberAuthService memberService;
//
//	public AuthController(MemberAuthService memberService) {
//		this.memberService = memberService;
//	}
//
//    @GetMapping("/auth/naver/login-url")
//    public ResponseEntity<String> getNaverLoginUrl() {
//        String naverLoginUrl = memberService.getNaverLoginUrl();
//        return ResponseEntity.ok(naverLoginUrl);
//    }
//
//    @GetMapping("/naver/callback")
//    public void naverCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
//        try {
//            Member member = memberService.findOrCreateNaverUser(code);
//            response.sendRedirect("http://localhost:5173/?message=success");
//        } catch (Exception e) {
//            e.printStackTrace();
//            response.sendRedirect("http://localhost:5173/?message=error");
//        }
//    }
//}
