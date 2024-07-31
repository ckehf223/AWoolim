import React from "react";
import "/src/css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="footer-left">
          <div id="footer-top">
            <div>
              <div className="footerA">
                <a href="">
                  <b>이용안내</b>
                </a>
              </div>
              <div className="footera">
                <a href="">검수기준</a>
                <a href="">이용정책</a>
                <a href="">패널티 정책</a>
              </div>
            </div>
            <div>
              <div className="footerA">
                <a href="">
                  <b>고객지원</b>
                </a>
              </div>
              <div className="footera">
                <a href="">공지사항</a>
                <a href="">서비스 소개</a>
                <a href="">스토어 안내</a>
              </div>
            </div>
            <div>
              <div className="footerA">
                <a href="">
                  <b>고객센터</b>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-nav">
            <span>회사소개</span>
            <span>인재채용</span>
            <span>제휴제안</span>
            <span>이용약관</span>
            <span>
              <b>개인정보처리방침</b>
            </span>
          </div>
          <div className="footer-content">
            <p>
              크림(주) | 대표: 김창욱 | 사업자등록번호: 119-86-91456 |
              통신판매업 신고번호: 제2018-성남분당B-0375호
              <br />
              주소: 경기도 성남시 분당구 판교역로 235, H스퀘어 N동 8층 (삼평동)
              | 개인정보보호책임자: 김태일
              <br />
              호스팅 서비스 제공자: 네이버 클라우드(주)
            </p>
          </div>
        </div>
        <div className="footer-right">
          <img src="./src/images/insta.png" alt="" />
          <img src="./src/images/kakao.png" alt="" />
          <img src="./src/images/youtube.png" alt="" />
          <img src="./src/images/github.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
