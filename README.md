# 🪴AWOOLIM
### 함께하는 즐거움 어울림 ! 


<img src="https://github.com/user-attachments/assets/5fd135fc-7543-4011-a5b3-24c80cd3a51f" width="500" height="200" >
<br/>
<br/>

## 🎥시연 영상 
- youtube : https://youtu.be/ZL009ZhEuWI?si=wdmSauWS3ADZ65YQ
<br/>

## 🗂️개요
- Java 웹 개발 풀스택 과정의 팀 프로젝트로 진행한 어울림입니다.
- 어울림 서비스는 다양한 모임을 만들고 참여할 수 있는 웹사이트 입니다.
- 어울림에서 로그인을 하면 모임 참여, 신고, 프로필 변경 등 참여 할 수 있습니다.
- 어울림에서 모임을 만들면 모임 내 참여 멤버를 관리할 수 있고 사용자간 실시간으로 채팅을 할 수 있습니다.
<br/>

## 👪팀원 구성
|팀장|팀원|팀원|팀원|
|:---:|:---:|:---:|:---:|
|차재경|함미경|이예찬|최성락|
|[@ckehf223](https://github.com/ckehf223)|[@aresHam](https://github.com/aresHam)|[@ychanlee92](https://github.com/ychanlee92)|[@rak517](https://github.com/rak517)|  
<br/>

## 🌴목차
  1. [프로젝트 목표](#프로젝트-목표)
  
  2. [개발 환경](#개발-환경)
  
  3. [개발 기간](#개발-기간)
  
  4. [역할 분담](#역할-분담)
  
  5. [페이지 및 기능](#페이지-및-기능)
  
  6. [데이터 모델링 ERD](#데이터-모델링-erd)
     
  7. [프로젝트 구조](#프로젝트-구조)

<br/>

## 프로젝트 목표
  -  프론트엔드와 백엔드 간의 통합 및 원활한 협업을 목표로, 실제 서비스 개발에 적합한 주제를 선정하였습니다.
  -  같은 취미와 관심사를 가진 사람들이 자유롭게 모임을 만들고, 그 안에서 원활한 소통과 만남을 즐길 수 있는 플랫폼을 제공하여 실생활에 적용 가능한 서비스 개발을 목표로 하였습니다.

<br/>

## 개발 환경
  - 개발 운영체제 : Windows 10
  - DB서버 : Oracle 23.1.1.345
  - JRE System Library : Zulu OpenJDK 17
  - WAS : Apache Tomcat 10.1.26
  - Spring Boot version : 4.23.1.RELEASE
  - 웹 표준 준수 : HTML5/CSS3
  - 개발언어 : Java, HTML5/CSS3, jQuery, JavaScript, Ajax, React
  - 데이터베이스 모델링 툴 : Oracle SQL Developer Modeling
  - 문서화 도구 : MicroSoft Office, 한컴오피스
  - 형상관리 : GitHub, SourceTree
  - 개발도구 : Spring Tool Suite 4 Versionm4.23.1.1.345, Visual  Studio Code
  - API : Chart JS, Coolsms, OAuth2(google, naver), JWT 

<br/>

## 개발 기간
  
  - 총 개발일 : 2024.07.22 ~ 2024.08.15
  
|기간|목표|
|:----------:|:-----------|
|24.07.18 ~ 24.07.22|사전 조사 및 주제 선정|
|24.07.22 ~ 24.07.29|설계 및 화면 구현|
|24.07.30 ~ 24.08.02|화면 레이아웃 및 스타일 조정|
|24.08.03 ~ 24.08.09|서버 구현 및 테스트 코드 작성|
|24.08.10~ 24.08.12|테스트 및 오류 수정|
|24.08.13 ~ 24.08.15|문서화 작업 및 발표 준비|

<br/>

## 역할 분담

<img width="1192" alt="역할분담 1" src="https://github.com/user-attachments/assets/780bda9c-94f0-4af9-b118-6bebc4c79ad0">
<img width="1189" alt="역할분담2" src="https://github.com/user-attachments/assets/7989a53d-a60b-47cf-a5b9-17b217ada938">


## 페이지 및 기능
  | 메인 - 이미지 슬라이드, 검색, 채팅 |
  | - |
  |  <img width="1200" alt="메인페이지" src="https://github.com/user-attachments/assets/a7bb90f7-92ea-46f7-b177-03486e1bc4c4"> |
  | - 메인 페이지 내 이미지 슬라이드로 동적으로 화면을 구성했습니다. <br>  - 상단의 메뉴로 로그인, 마이페이지, 고객센터로 이동할 수 있습니다. <br>  - 상단의 검색을 통해 모임을 찾을 수 있습니다. <br> - 로그인 후 우측 하단 버튼을 눌러 모임 생성 및 채팅 참여가 가능합니다.|
<br/>

  | 로그인 - 소셜 로그인, 아이디/비밀번호 찾기 |
  | - |
  |  <img width="1200" alt="로그인" src="https://github.com/user-attachments/assets/7804e1fb-d353-4375-ac8e-98215dcf8878"> |
  | - 아이디 비밀번호가 틀리면 에러 메세지를 전달합니다. <br>  - 비밀번호를 확인 할 수 있는 button으로 사용자의 경험을 개선하였습니다.  <br>  - 소셜 로그인 (naver, google)으로 로그인 할 수 있도록 구현하였습니다. |
<br/>

  | 회원가입 - 유효성 검사, 전화번호 인증 |
  | - |
  |  <img width="1200" alt="회원가입" src="https://github.com/user-attachments/assets/c9701980-5b83-40c4-bc01-88783174bc91"> |
  | - 중복과 보안을 위해 유효성 검사를 하여 에러 메세지를 전달합니다. <br>  - 소셜 로그인 시 아이디, 비밀번호, 이름은 입력하지 않도록 구현했습니다. <br>  - 전화번호 인증으로 식별할 수 있도록 하였습니다. |
  <br/>

  | 아이디/비밀번호 찾기 - 전화번호 인증, 비밀번호 암호화|
  | - |
  |  <img width="1200" alt="아아디비밀번호 찾기" src="https://github.com/user-attachments/assets/65d2edac-a34e-46cf-a6c3-5468db29b325"> |
  | - 전화번호 인증을 통해 사용자 식별 후 정보를 제공합니다. <br>  - 암호화된 비밀번호를 찾을 수 없기에 재설정 하도록 구현하였습니다. |
<br/>

  | 모임 검색 필터 |
  | - |
  |  <img width="1200" alt="검색필터" src="https://github.com/user-attachments/assets/03a3a51e-99ee-48cc-8dc3-37075c5de3b4"> |
  | - 6가지의 필터링으로 모임을 정보를 제공합니다. <br>  - 해당되는 모임의 정보가 많을 시 하단 스크롤을 통해 업로드 하도록 구현하였습니다. |
<br/>
  
  | 실시간 채팅 - 웹 소캣 활용|
  | - |
  |  <img width="1200" alt="채팅" src="https://github.com/user-attachments/assets/fa05a286-8238-42b8-b888-ae4ed6d2716f"> |
  | - 같은 모임에 있는 사용자간 실시간으로 채팅할 수 있습니다. <br>  - 타임 스탬프를 기반으로 메세지의 순서를 정렬하였습니다 <br> - 자신의 메세지의 오른쪽으로 배치하여 구분 할 수 있도록 하였습니다. |
<br/>

  | 모임 - 상세정보, 참여멤버, 신고하기 |
  | - |
  |  <img width="1200" src="https://github.com/user-attachments/assets/98511e57-51b5-4e7b-9a15-f20644407e56"> |
  | - 모임 상세정보 및 참여 중인 사용자의 프로필을 확인 할 수 있습니다. <br>  - 부적절한 모임 및 사용자의 경우 신고 기능을 통해 제보 할수 있습니다. |
<br/>


  | 마이페이지 - 프로필 변경, 회원정보 수정|
  | - |
  |  <img width="1200" src="https://github.com/user-attachments/assets/73f088c0-b0c2-46f4-bbec-66106a0d6479"> |
  | - 사용자 프로필을 통해 개성을 표현 할 수 있습니다. <br>  - 이미지를 리사이징 하여 서버에 저장하도록 구현했습니다. <br> - 기존에 서버에 저장된 이미지는 변경 및 삭제 시 삭제하여 관리하도록 하였습니다. |
<br/>

| 마이페이지 - 모임 관리(모임 정보 수정, 참여 멤버 관리, 신청 관리)|
  | - |
  |  <img width="1200" src="https://github.com/user-attachments/assets/53be593e-9327-4c4e-a738-26c7d2d92317"> |
  | - 모임장이 모임의 전반적인 부분을 관리 할 수 있도록 하였습니다. <br>  - 기존 멤버를 탈퇴시키거나 모임의 신청을 수락,거절 할 수 있습니다. <br> - 모임의 일정과 모임 사진첩을 관리 할 수 있습니다. |
<br/>
<br/>

## 데이터 모델링 ERD
  | ERD |
  | - |
  |  <img width="1200" src="https://github.com/user-attachments/assets/bad924e4-001d-4cbe-97fc-b0868980f1fb"> |
<br/>

## 프로젝트 구조

### frontEnd

```
frontend/
│
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── auth/
│   │   ├── Auth.js
│   │   ├── authService.js
│   │   ├── axios.js
│   │   └── Auth2RedirectHandler.js
│   ├── common/
│   │   ├── AuthContext.jsx
│   │   ├── CustomToolbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── useModal.js
│   │   └── Utils.js
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminLoginMain.jsx
│   │   ├── club/
│   │   │   ├── ClubDetail.jsx
│   │   │   ├── ClubManager.jsx
│   │   │   └── ClubProvider.jsx
│   │   ├── common/
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── CustomCalendar.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PaginationComponent.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── faq/
│   │   │   ├── FaqMain.jsx
│   │   │   └── FaqRewrite.jsx
│   │   ├── modal/
│   │   │   └── ModalComponent.jsx
│   │   ├── mypage/
│   │   │   ├── CalendarPage.jsx
│   │   │   ├── MyClubDetailInfo.jsx
│   │   │   ├── MyClubManager.jsx
│   │   │   ├── MyPage.jsx
│   │   │   ├── MyPageSide.jsx
│   │   │   └── MyProfile.jsx
│   │   └── service/
│   │       ├── FaqMainCustom.jsx
│   │       ├── GroupNav.jsx
│   │       └── ServicePage.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   └── Admin.jsx
│   │   ├── member/
│   │   │   ├── GroupPage.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Member.jsx
│   │   └── App.jsx
│   ├── App.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
```
### backEnd

```
backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── awoolim/
│   │   │        ├── AwoolimApplication.java
│   │   │        ├── auth/
│   │   │        │   └── AuthController.java
│   │   │        ├── common/
│   │   │        │   ├── config/
│   │   │        │   │   ├── AlarmWebSocketHandler.java
│   │   │        │   │   ├── ChatWebSocketHandler.java
│   │   │        │   │   └── SecurityConfig.java
│   │   │        │   ├── domain/
│   │   │        │   │   ├── Admin.java
│   │   │        │   │   ├── Chat.java
│   │   │        │   │   └── Notice.java
│   │   │        │   ├── jwt/
│   │   │        │   │   ├── JWTFilter.java
│   │   │        │   │   └── JwtUtil.java
│   │   │        │   ├── message/
│   │   │        │   │   └── MessageController.java
│   │   │        │   └── service/
│   │   │        │       ├── AdminService.java
│   │   │        │       ├── ChatService.java
│   │   │        │       └── NoticeService.java
│   │   │        └── mapper/
│   │   │            ├── AdminMapper.java
│   │   │            └── NoticeMapper.java
│   │   │  
│   │   └── resources/
│   │       ├── com/
│   │       │   └── kh/
│   │       │       └── awoolim/
│   │       │           └── mapper/
│   │       │               ├── AdminMapper.xml
│   │       │               └── NoticeMapper.xml
│   │       ├── templates/
│   │       └── application.properties
│   └── test/
├── target/
├── pom.xml
└── README.md
```
