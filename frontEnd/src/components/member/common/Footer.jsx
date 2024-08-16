import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/member/common/footer.css";

const Footer = () => {
  const nav = useNavigate();
  return (
    <footer className="footer">
      <div>
        <div className="footer-left">
          <div id="footer-top">
            <div>
              <div className="footerA">
                <Link
                  onClick={() => {
                    nav("/");
                    window.location.reload();
                  }}
                >
                  <b>Around Us</b>
                </Link>
              </div>
              <div className="footera">
                <Link
                  onClick={() => {
                    nav("/");
                    window.location.reload();
                  }}
                >
                  모임검색
                </Link>
                <Link
                  onClick={() => {
                    nav("/");
                    window.location.reload();
                  }}
                >
                  카테고리
                </Link>
              </div>
            </div>
            <div>
              <div className="footerA">
                <Link
                  onClick={() => {
                    nav("/service/notice");
                    window.location.reload();
                  }}
                >
                  <b>고객센터</b>
                </Link>
              </div>
              <div className="footera">
                <Link
                  onClick={() => {
                    nav("/service/notice");
                    window.location.reload();
                  }}
                >
                  공지사항
                </Link>
                <Link
                  onClick={() => {
                    nav("/service/FAQ");
                    window.location.reload();
                  }}
                >
                  자주하는 질문
                </Link>
              </div>
            </div>
            <div>
              <div className="footerA">
                <Link
                  onClick={() => {
                    nav("/mypage/profile");
                    window.location.reload();
                  }}
                >
                  <b>마이페이지</b>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-content">
            <p>
              호산(주) | 대표: 차재경 | 프로젝트 등록번호: kh-awoolimm-352 |
              프로젝트 등록번호: 제2024-서울강남호산-352호
              <br />
              주소: 서울 강남구 도산대로 222 호산빌딩 5층 (352호) |
              개인정보보호책임자: 차재경
              <br />
              호스팅 서비스 제공자: 리액트 & 스프링부트
            </p>
          </div>
        </div>
        <div className="footer-right">
          <a
            href="https://www.instagram.com/yehchan2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/src/assets/images/insta.png" alt="Instagram" />
          </a>
          <a
            href="https://open.kakao.com/o/sJQyt6Ig"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/src/assets/images/kakao.png" alt="Kakao" />
          </a>
          <a href="https://youtu.be/ZL009ZhEuWI?si=4XdaLMsLbsOm4XTq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/src/assets/images/youtube.png" alt="YouTube" />
          </a>
          <a
            href="https://github.com/ckehf223/final_Project.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/src/assets/images/github.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
