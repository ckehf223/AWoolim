--관리자 생성 
INSERT INTO ADMIN VALUES(1,'admin','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','ROLE_ADMIN');

--회원 생성
insert into member 
values(member_seq.nextval,'ckehf223@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK',
'차재경','1995-04-30','01038473952','M','차돌','fd2fcaf9-f0e4-4fae-8e39-473efdf37fd7.jpeg'
,'3e2c8f42-dabd-4dd6-a285-c6dfd507ab0f.jpg','안녕하세요',0,'default','ROLE_MEMBER');

insert into member 
values(member_seq.nextval,'chi123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK',
'차인표','1992-04-30','01092371284','M','차도르','fd2fcaf9-f0e4-4fae-8e39-473efdf37fd7.jpeg'
,'3e2c8f42-dabd-4dd6-a285-c6dfd507ab0f.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'kim123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','김유신','1937-02-11',
'01099999999','M','김춘봉','82c96231-1653-4f9f-bea5-df00f93334bf.jpg',
'c530c832-217a-4404-b96d-44d0a3ff3d8d.png','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'lee123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','이순신','1977-02-11',
'01099999998','M','이춘봉','bd48936c-cb39-499b-b5a1-9d3ba0737320.webp',
'b88a5194-4c16-439f-a618-cd7d75ed2eaa.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'choi123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','최유신','1995-03-11',
'01099999997','W','최봉춘','431a3b05-b491-4e67-90bb-fdf408334d39.jpeg',
'9be3838a-e26e-4dcc-874d-6476d80d90e2.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'park123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','박순신','1987-02-11',
'01099999996','W','박춘봉','82c96231-1653-4f9f-bea5-df00f93334bf.jpg',
'c530c832-217a-4404-b96d-44d0a3ff3d8d.png','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'cha123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','차우돈','1997-02-11',
'01099999995','M','차춘봉','8c1ed05c-c5af-4d6a-84b6-e674c11ee73e.jpg',
'12047711-6f9d-41eb-99b4-c5bf6a50a3e8.jpg','안녕하세요',0,'default','ROLE_MEMBER');


INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'kim123@naver.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','김영선','1977-02-11',
'01099999989','M','김프로','fd2fcaf9-f0e4-4fae-8e39-473efdf37fd7.jpeg',
'3e2c8f42-dabd-4dd6-a285-c6dfd507ab0f.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'lee123@naver.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','이영돈','1987-05-11',
'01099999988','M','이프로','431a3b05-b491-4e67-90bb-fdf408334d39.jpeg',
'9be3838a-e26e-4dcc-874d-6476d80d90e2.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'choi123@naver.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','최유진','1995-03-11',
'01099999987','W','최프로','bd48936c-cb39-499b-b5a1-9d3ba0737320.webp',
'b88a5194-4c16-439f-a618-cd7d75ed2eaa.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'park123@naver.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','박한이','1987-02-11',
'01099999986','M','박프로','82c96231-1653-4f9f-bea5-df00f93334bf.jpg',
'c530c832-217a-4404-b96d-44d0a3ff3d8d.png','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'an123@naver.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','안치홍','1997-02-11',
'01099999985','M','안프로','8c1ed05c-c5af-4d6a-84b6-e674c11ee73e.jpg',
'12047711-6f9d-41eb-99b4-c5bf6a50a3e8.jpg','안녕하세요',0,'default','ROLE_MEMBER');


INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'kim123@nate.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','김연아','1977-02-11',
'01099999979','W','연아킴','431a3b05-b491-4e67-90bb-fdf408334d39.jpeg',
'9be3838a-e26e-4dcc-874d-6476d80d90e2.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'lee123@nate.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','이영자','1987-05-11',
'01099999978','W','맛잘알','fd2fcaf9-f0e4-4fae-8e39-473efdf37fd7.jpeg',
'3e2c8f42-dabd-4dd6-a285-c6dfd507ab0f.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'choi123@nate.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','최진규','1995-03-11',
'01099999977','M','광주최영','82c96231-1653-4f9f-bea5-df00f93334bf.jpg',
'c530c832-217a-4404-b96d-44d0a3ff3d8d.png','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'park123@nate.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','박세리','1987-02-11',
'01099999976','W','쉐리라','bd48936c-cb39-499b-b5a1-9d3ba0737320.webp',
'b88a5194-4c16-439f-a618-cd7d75ed2eaa.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'an123@nate.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','안수진','1997-02-11',
'01099999975','W','안면','431a3b05-b491-4e67-90bb-fdf408334d39.jpeg',
'9be3838a-e26e-4dcc-874d-6476d80d90e2.jpg','안녕하세요',0,'default','ROLE_MEMBER');



INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'kim123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','김동현','1987-12-11',
'01099999969','M','매미킴','fd2fcaf9-f0e4-4fae-8e39-473efdf37fd7.jpeg',
'3e2c8f42-dabd-4dd6-a285-c6dfd507ab0f.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'lee123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','이영지','1987-05-11',
'01099999968','W','맛잘알','8c1ed05c-c5af-4d6a-84b6-e674c11ee73e.jpg',
'12047711-6f9d-41eb-99b4-c5bf6a50a3e8.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'choi123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','최솔규','1995-03-11',
'01099999967','M','규진히','82c96231-1653-4f9f-bea5-df00f93334bf.jpg',
'c530c832-217a-4404-b96d-44d0a3ff3d8d.png','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'park123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','박정연','1987-02-11',
'01099999966','W','소모임','431a3b05-b491-4e67-90bb-fdf408334d39.jpeg',
'9be3838a-e26e-4dcc-874d-6476d80d90e2.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'an123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','안세영','1977-02-11',
'01099999965','W','배드민턴 신','bd48936c-cb39-499b-b5a1-9d3ba0737320.webp',
'b88a5194-4c16-439f-a618-cd7d75ed2eaa.jpg','안녕하세요',0,'default','ROLE_MEMBER');


INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'hong123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','홍동현','1987-12-11',
'01099999959','M','홍길동','fd2fcaf9-f0e4-4fae-8e39-473efdf37fd7.jpeg',
'3e2c8f42-dabd-4dd6-a285-c6dfd507ab0f.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'ree123@hanmail.net','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','김대히','1987-05-11',
'01099999958','W','순수래퍼','8c1ed05c-c5af-4d6a-84b6-e674c11ee73e.jpg',
'12047711-6f9d-41eb-99b4-c5bf6a50a3e8.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'tlqkf123@naver.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','정영심','1995-03-11',
'01099999957','M','정연','431a3b05-b491-4e67-90bb-fdf408334d39.jpeg',
'9be3838a-e26e-4dcc-874d-6476d80d90e2.jpg','안녕하세요',0,'default','ROLE_MEMBER');

INSERT INTO MEMBER VALUES(
MEMBER_SEQ.NEXTVAL,'jung123@gmail.com','$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK','이정연','1987-02-11',
'01099999956','W','수정','bd48936c-cb39-499b-b5a1-9d3ba0737320.webp',
'b88a5194-4c16-439f-a618-cd7d75ed2eaa.jpg','안녕하세요',0,'default','ROLE_MEMBER');

----------------------------------------------------------------------------------------------------------------------------------------------------
--모임
INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '헬스 모임', '제한없음', '제한없음', '스포츠', '경기도', '화성시', 1, 20, 1, '수요일', '82c96231-1653-4f9f-bea5-df00f93334bf.jpg', '<p>운동하고 건강 챙겨요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '코딩 모임', '제한없음', '제한없음', '스터디', '서울', '강남구', 1, 20, 1, '목요일', 'f98df7d7-dcd9-4482-a6b1-66a4c61e9541.jpg', '<p>함께 코딩을 배우고 프로젝트를 진행해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '스터디 그룹', '제한없음', '제한없음', '스터디', '서울', '종로구', 1, 20, 1, '월요일', 'dfaea53e-eac2-4743-967c-6097bd469bfd.jpg', '<p>효율적인 학습을 위해 함께 공부해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '영화 모임', '제한없음', '제한없음', '취미활동', '서울', '성북구', 0, 20, 2, '20240901', '7ab1f893-bfcf-4f4a-a75a-9bf7c11129f1.jpg', '<p>함께 영화를 보고 감상을 나눠요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '빵지순례', '제한없음', '제한없음', '맛집탐방', '서울', '중구', 0, 20, 2, '20240830', '78ba39b2-4483-430c-aad8-b494a690916e.jpg', '<p>서울의 맛있는 빵집을 탐방해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '나이트 러닝', '제한없음', '제한없음', '스포츠', '서울', '영등포구', 1, 20, 2, '토요일', '4602dc33-916a-404d-aa27-a78c45e4e4d6.jpg', '<p>밤에 함께 달려요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '전시 모임', '제한없음', '제한없음', '전시', '부산광역시', '동래구', 1, 20, 3, '일요일', '95b88530-d480-41c6-b171-0d4194c6e328.jpg', '<p>함께 전시를 보고 느껴봐요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '독서 모임', '제한없음', '제한없음', '독서', '서울', '서초구', 0, 15, 3, '20240901', 'f0c737aa-f668-48cf-ac14-a8b740386771.jpeg', '<p>책을 읽고 토론해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '산악 모임', '제한없음', '제한없음', '스포츠', '서울', '도봉구', 0, 15, 4, '20240901', '9d19bace-8f41-4e14-bd6d-2c6cc8fc5286.jpg', '<p>함께 등산을 즐겨요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '사진 모임', '제한없음', '제한없음', '취미활동', '서울', '강동구', 1, 10, 4, '금요일', '04b471c9-94a2-40c5-8294-bdd399e519ce.jpg', '<p>사진을 찍고 공유해요.</p>', 1, 1);


INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '요가 클럽', 'F', '20-30', '스포츠', '서울', '마포구', 1, 15, 5, '월요일', '2b8fd3ec-c299-494a-b492-da16c1b77b30.jpg', '<p>함께 요가를 배우며 건강을 지킵시다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '스페인어 공부 모임', 'M', '30-40', '스터디', '서울', '광진구', 1, 10, 5, '화요일', 'a6b4dc5e-e4d3-482c-bb4b-3f552b85fa45.jpg', '<p>스페인어를 함께 공부해봐요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '독서토론회', '제한없음', '40-50', '독서', '서울', '동대문구', 1, 20, 6, '수요일', 'a215659a-58a6-4350-a7b7-77147063c91b.jpg', '<p>다양한 책을 읽고 생각을 나누는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '주말 트레킹 클럽', '제한없음', '50+', '스포츠', '서울', '은평구', 1, 20, 6, '토요일', '5230c134-7891-4098-9d2d-91bd975edca1.jpg', '<p>주말마다 함께 산을 오릅니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '베이킹 클래스', 'F', '제한없음', '취미활동', '서울', '서대문구', 0, 15, 7, '20241001', 'c4cbd8ad-b9c9-45b8-a91f-0ba18e57928f.jpg', '<p>함께 빵을 만들고 즐기는 시간입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '자전거 라이딩', 'M', '20-40', '스포츠', '경기도', '수원시', 0, 20, 8, '20241013', '228f37fe-55a9-4d2a-85ea-1d775ea3de18.jpg', '<p>아침마다 함께 자전거를 타는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '전통음식 탐방', '제한없음', '50+', '맛집탐방', '서울', '종로구', 0, 15, 9, '20240901', 'b265a8d6-d518-4394-98a8-9af20666e68b.jpg', '<p>서울의 전통 음식을 탐방합니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '사진 스터디', '제한없음', '20-30', '스터디', '서울', '노원구', 0, 20, 9, '20240901', '04b471c9-94a2-40c5-8294-bdd399e519ce.jpg', '<p>사진 기술을 공유하고 함께 촬영해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '영화 제작 워크샵', '제한없음', '20-40', '스터디', '서울', '성동구', 0, 20, 9, '20240901', '06f4525f-25cc-4c23-aba8-d75d78ebb91b.jpg', '<p>영화 제작 과정을 배우고 참여해봅니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '커피 애호가 모임', '제한없음', '30+', '친목', '서울', '강서구', 0, 10, 10, '20240901', 'fd952d2f-cd7a-4959-9637-8361e442655e.jpg', '<p>커피를 사랑하는 사람들이 모여 함께 커피를 즐깁니다.</p>', 1, 1);


INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '한강 러닝 모임', '제한없음', '20-30', '스포츠', '서울', '강남구', 0, 20, 10, '20240901', '62921cac-a6d6-4278-9fb1-52fce499aaf3.jpeg', '<p>한강을 함께 달리는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '영화 감상회', '제한없음', '30-50', '취미활동', '서울', '성북구', 1, 20, 11, '일요일', '7ab1f893-bfcf-4f4a-a75a-9bf7c11129f1.jpg', '<p>영화를 보고 함께 이야기를 나눠요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '그림책 읽기 모임', 'F', '제한없음', '친목', '서울', '마포구', 1, 20, 11, '목요일', '6e1e59e9-8e56-4075-b1c2-9a2b18684d45.jpg', '<p>그림책을 읽고 토론하는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '문화자본 공유 모임', '제한없음', '20-40', '친목', '서울', '종로구', 1, 20, 12, '토요일', '9c85ff04-0aec-41b3-a312-ea4646800b30.jpg', '<p>다양한 문화 정보를 공유해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '영화동아리 See-Real', '제한없음', '20-30', '취미활동', '서울', '광진구', 1, 20, 12, '수요일', '5ff18ac2-a093-4aa3-a7ad-79200bcd8e41.jpg', '<p>영화를 보고 다양한 활동을 함께합니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, 'LIVE 북클럽', '제한없음', '30-50', '독서', '서울', '서초구', 1, 15, 13, '금요일', '72d67e7a-3869-476a-be85-a80b864188ab.jpg', '<p>책을 읽고 라이브로 토론하는 북클럽입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '서울 피크닉 모임', '제한없음', '20-30', '친목', '서울', '양천구', 1, 10, 13, '토요일', '816e1a9f-b414-41c5-a834-b5594cda1982.jpg', '<p>서울 곳곳에서 피크닉을 즐깁니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '산악 등반 클럽', '제한없음', '20-40', '스포츠', '서울', '도봉구', 0, 20, 14, '20240901', 'ae03738f-fc51-44a0-9a7f-d05a5a68f1d0.jpg', '<p>산악 등반을 함께 하는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '한강 나들이', '제한없음', '20-30', '친목', '서울', '영등포구', 0, 20, 14, '20240901', '4fe5ef8e-0bc3-445f-b8b8-418ff0fb512d.jpg', '<p>한강에서의 여유로운 시간을 함께 합니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '헬스 클럽', '제한없음', '제한없음', '스포츠', '서울', '송파구', 0, 20, 15, '20240901', 'e1fd82bd-8472-400a-bc8b-18a1ca7e2f58.jpg', '<p>헬스를 통해 건강을 챙기는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '전시 보러가자', '제한없음', '30-50', '전시', '경기도', '하남시', 0, 20, 15, '20240915', '0bf63497-07a7-454a-a503-c72c96b8d93c.jpg', '<p>전시를 감상하고 토론하는 모임입니다.</p>', 1, 1);
INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '독서 감상 공유모임', '제한없음', '30-50', '독서', '경기도', '광명시', 0, 20, 16, '20240822', 'd7dd2f20-e984-4d41-96a5-c983c9fd80a1.jpg', '<p>책을 읽고 감상문을 공유하는 독서모임입니다.</p>', 1, 1);
INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '미술 전시 감상모임', '제한없음', '30-50', '전시', '경기도', '광주시', 0, 20, 16, '20240918', 'a8a26d72-c0ab-4215-a58c-fa6109bfe465.jpg', '<p>유명 작가의 미술품을 감상하는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '빵이 미친모임', '제한없음', '제한없음', '맛집탐방', '서울', '용산구', 1, 20, 17, '목요일', 'e757f0b2-6035-4604-af99-9d66955a9d19.jpg', '<p>빵에 미친사람 모여라</p>', 1, 1);
INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '경기도 맛집투어', '제한없음', '제한없음', '맛집탐방', '경기도', '전체', 1, 20, 18, '금요일', '9fdf6c3f-1fd3-4ddf-9f59-4d80d40a2319.jpg', '<p>경기도의 맛있는 음식을 탐방해요.</p>', 1, 1);
INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '서울 맛집뿌시기', '제한없음', '제한없음', '맛집탐방', '서울', '전체', 1, 20, 18, '토요일', '7c8df185-23b1-4b11-8c55-bfb07de05ba8.jpg', '<p>서울의 맛있는 음식을 탐방해요.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '전시에 미친자', 'F', '제한없음', '전시', '서울', '전체', 1, 20, 19, '토요일', 'a076db0e-9f26-4c8e-8071-0f0a135e7494.jpg', '<p>전시를 미친듯이 보러가는 모임입니다.</p>', 1, 1);

INSERT INTO club (CLUBNO, CLUBTITLE, CLUBGENDER, AGELIMIT, CATEGORY, CITY, DISTRICT, REGULARTYPE, MAXMEMBER, USERID, DDAY, CLUBIMAGE, DETAILINFO, RECRUITMENT, MEMBERCOUNT)
VALUES (club_seq.nextval, '예술작품 보러가자', '제한없음', '20+', '전시', '경기도', '전체', 1, 20, 20, '목요일', 'cca032ac-e1f2-44c1-ad76-e8f46b663f8b.jpg', '<p>전시를 감상하고 토론하는 모임입니다.</p>', 1, 1);


------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--question
INSERT INTO QUESTION VALUES(question_seq.nextval,'회원가입','회원가입 조건은 무엇인가요?','<br>어울림의 회원 자격은 함께하고픈 마음이 있으신 모든 분께 열려있습니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'정기모임','정기 모임 중 정모일 외에 다른 날에 만남을 추진하려면 어떻게 예약하나요?','<br>정기 모임을 예약하려면<br>계정에 로그인하고 [마이페이지][가입한 모임]으로 이동하여,<br>모임장과 모임 멤버들과 채팅을 통해 자유로이 일정을 정하여<br>모임 스케줄에 등록하시면 됩니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'정기모임','참가자를 미팅에 초대하려면 어떻게 해야 합니까?','<br>특정 참가자를 미팅에 초대하는 방법은 개인정보 보호를 위해 구현할 수 없습니다.<br>단, 여러 참여자에게 내 모임에 대한 홍보를 위해 모임 페이지를 <br>멋지게 꾸며보세요. 인기 모임에 산정이 되면<br> 많은 회원분들이 참여하실 것 입니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'소모임','소모임은 어떻게 만듭니까?','<br>소규모 모임을 만드는 방법도 정기모임을 만드는 방법과 다르지 않습니다.<br> 단 모임 생성시 <b>"정기모임"</b> 메뉴가 아닌 <b>"일회성"</b> 메뉴를 선택하시면 소모임이 생성됩니다.<br><br>저녁에 간단한 술 한잔이나, 일회성 공연 보기 등<br> 함께 하고 싶은 좋은 만남을 많이 구성해 보세요~');
INSERT INTO QUESTION VALUES(question_seq.nextval,'기타문의','불량 회원이나 모임을 신고하려면 어떻게 해야하나요?','<br>1.<b>모임신고</b><br> ☞  [마이페이지][내 모임] 메뉴에 들어가면 [신고]버튼이 있어서 모임을 신고할 수 있습니다.<br><br>2. <b>회원신고</b><br>☞ [마이페이지][내 모임]메뉴에서 [모임 멤버]목록에서 신고할 회원을 클릭하면 회원 프로필이 나타나는데 <br>해당 창의 우측 상단에 빨간색 느낌표를 클릭하여 신고하시면 됩니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'회원가입','계정에 등록하려면 어떻게 해야 합니까?','<br>회원가입을 하는 방법은 총 세 가지가 있습니다.<br><br><b>1. 개인 회원가입</b><br> ☞ 어울림 사이트를 통한 회원가입 방법으로 이메일등의 개인정보 입력과 전화번호 인증을 통한 회원가입<br><br><b>2. 네이버로 시작하기</b><br> ☞ 네이버 이메일을 통한 회원가입<br><br><b>3. 구글로 시작하기</b><br> ☞ 구글 이메일을 통한 회원가입<br><br>위 세가지 방법 중 편리한 방법을 선택하여 저희 어울림과 함께 하세요~');
INSERT INTO QUESTION VALUES(question_seq.nextval,'기타문의','문의 사항은 어떻게 작성하나요?','<br>문의 사항은 하단의 [About us] 메뉴를 클릭하여 <br> 메일로 작성해 주시면 친절하게 안내해 드리겠습니다.<br> 언제든지 궁금하신 사항이 있으시면 메일 보내주세요.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'회원가입','회원가입 조건은 무엇인가요?','<br>어울림의 회원 자격은 함께하고픈 마음이 있으신 모든 분께 열려있습니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'소모임','소모임이란 무엇인가요?','<br>특정한 이벤트가 있는 날 일회성으로 모이는 모임을 말합니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'정기모임','정기모임 가입조건이 있나요?','<br>정기 모임에 특별한 조건은 없지만 간혹 방장님이 성별이나 나이 등의 제한을 두는 경우가 있을 수 있습니다.<br> 해당 모임의 소개 페이지에 가시면 가입 조건이 간단히 명시되어 있으니 <br> 해당되시는 분은 자유롭게 신청하시면 됩니다.');
INSERT INTO QUESTION VALUES(question_seq.nextval,'어울림이란?','어울림은 어떤 사이트인가요?','<p><strong style="color: rgb(0, 138, 0);">어울림이란?</strong></p><p>    2024년 8월, 나와 사람들 간의 <strong style="color: rgb(153, 51, 255);">공동의 목표를 가지고 함께 어울릴 수 있는 만남의 장</strong>을 제공하고자 만들어진 커뮤니티 입니다.</p><p>    </p><p>    즐기고 싶은 많은 <strong style="color: rgb(153, 51, 255);">서적이나 공연, OTT, 여행, 스포츠, 맛탐방, 스터디, 전시</strong> 등의 </p><p>   다양한 취미를 홀로 즐기는 것이 아니라</p><p>   함께 즐길 수 있는 사람들 간의 공간을 만들어</p><p>    서로 대화하고 즐길 수 있으며, 함께 어울려 좋은 인연을 만들어가는 </p><p>    나와 사람들 간의 만남의 장을 제공하는 공간입니다.</p>');
commit;

-- 공지사항 데이터
delete from notice;
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임공지','불량 모임이나 불량 회원을 신고하는 방법입니다.','<p><strong>안녕하세요</strong></p><p><br></p><p>어울림 입니다.</p><p><br></p><p>새로 준비한 많은 소모임들이 메인에 공개되었습니다.</p><p><br></p><p>즐겁고 유익한 정보들이 많이 들어 있으니</p><p><br></p><p>다들 방문하셔서 많은 참여 부탁드립니다.</p><p><br></p><p>회원님들 사랑합니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '회원신고','<h3><strong>안녕하세요</strong></h3><p><br></p><p>모두 <span style="color: rgb(153, 51, 255);">훌륭한 회원분들</span>이라는 생각에 우리는 기본적으로 신고를 기피하고 있지만</p><p>간혹 불량 정보나 언행 등의 문제로 분쟁을 잠재우기 위한</p><p>신고제가 있습니다.</p><p><br></p><p>회원의 경우 신고가 들어가면 관리자 처리 여부에 따라 알림이 발생하고</p><p><strong style="color: rgb(230, 0, 0);">총 5번 신고</strong>가 들어오면 경고 메시지와 더불어 자동으로 <strong style="color: rgb(230, 0, 0);">회원 탈퇴</strong>가 됩니다.</p><p><br></p><p><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">서로 좋은 환경을 만들 수 있도록 함께 노력하는 어울림이 되었으면 좋겠습니다.</strong></p><p><br></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '정기모임','정기 모임에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>정기모임 멤버십에 대하여 공지합니다.</p><p><br></p><p><strong>▶ 정기모임 신청하기</strong></p><p>＊8개의 카테고리에서 나의 [취향]과 [관심]에 맞는 정기모임을 선택 신청합니다.</p><p>＊정기 모임의 최대 인원 제한은 없으며, 모임장의 권한에 따라 최대모임 인원수를 제한할 수도 있습니다.</p><p><br></p><p><strong>▶ 정기모임 회원권한은 가입후 모임장의 수락을 통하여 유효합니다.</strong></p><p><br></p><p><strong>▶ 정기모임 회수와 방법 : 모임장의 권한으로 각 정기모임마다 모임 일자가 다를 수 있습니다.</strong></p><p>＊각 모임의 상세페이지를 확인하고 신청하세요.</p><p><br></p><p><strong>▶ 모임별 단톡방을 만들어 모임 회원님들 간의 대화의 장을 제공하고 있습니다. 많이 사용해 주세요</strong></p><p><br></p><p><strong>▶ 정기 모임에 대한 기타 자세한 권한은 전적으로 모임장에게 주어집니다.</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '오픈알림','열심히 준비한 어울림을 여러분께 선보입니다.','<p><strong>안녕하세요!!</strong></p><p><br></p><p>어울림 관리자 울리미입니다.</p><p><br></p><p>그동안 열심히 준비한 커뮤니티가</p><p>아래와 같이 문을 열고자 합니다.</p><p>많이 방문하셔서 <span style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">즐겁고 따뜻한 여러분들만의 </span><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">공간</strong>을 만들기 바랍니다.</p><p><br></p><p><strong>▶ 커뮤니티 주소 :</strong><strong style="color: rgb(153, 51, 255);"><a href="http://localhost:5173/"> http://awoolim.or.kr</a></strong></p><p><strong>▶ 개설일 : </strong><strong style="color: rgb(153, 51, 255);">2024년 8월 14일</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임가입','회원님들 다양한 모임의 정보를 보고 신청하세요.','<h3>안녕하세요~</h3><p><br></p><p>저희가 준비한 다양한 모임의 정보를</p><p><a href="http://localhost:5173/">[메인 페이지]<a>에서 검색하고 확인할 수 있습니다.</p><p><br></p><p>조용한<span style="color: rgb(102, 185, 102);"> 음악♬ 과 차 한 잔</span> 드시면서</p><p>천천히 모임에 관한 정보를 보고</p><p><span style="color: rgb(240, 102, 102);">함께 하고 싶은 </span></p><p>모임을 찾으면 페이지 하단의 <strong style="background-color: rgb(255, 255, 0); color: rgb(230, 0, 0);">[신청하기]</strong> 버튼을 클릭해 보세요.</p><p><br></p><p>새로운 사람들과 멋진 인연이 시작 될 것입니다.</p><p><br></p><p>어울림 관리자 울림이 드림~~</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임공지','불량 모임이나 불량 회원을 신고하는 방법입니다.','<p><strong>안녕하세요</strong></p><p><br></p><p>어울림 입니다.</p><p><br></p><p>새로 준비한 많은 소모임들이 메인에 공개되었습니다.</p><p><br></p><p>즐겁고 유익한 정보들이 많이 들어 있으니</p><p><br></p><p>다들 방문하셔서 많은 참여 부탁드립니다.</p><p><br></p><p>회원님들 사랑합니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '회원신고','<h3><strong>안녕하세요</strong></h3><p><br></p><p>모두 <span style="color: rgb(153, 51, 255);">훌륭한 회원분들</span>이라는 생각에 우리는 기본적으로 신고를 기피하고 있지만</p><p>간혹 불량 정보나 언행 등의 문제로 분쟁을 잠재우기 위한</p><p>신고제가 있습니다.</p><p><br></p><p>회원의 경우 신고가 들어가면 관리자 처리 여부에 따라 알림이 발생하고</p><p><strong style="color: rgb(230, 0, 0);">총 5번 신고</strong>가 들어오면 경고 메시지와 더불어 자동으로 <strong style="color: rgb(230, 0, 0);">회원 탈퇴</strong>가 됩니다.</p><p><br></p><p><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">서로 좋은 환경을 만들 수 있도록 함께 노력하는 어울림이 되었으면 좋겠습니다.</strong></p><p><br></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '정기모임','정기 모임에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>정기모임 멤버십에 대하여 공지합니다.</p><p><br></p><p><strong>▶ 정기모임 신청하기</strong></p><p>＊8개의 카테고리에서 나의 [취향]과 [관심]에 맞는 정기모임을 선택 신청합니다.</p><p>＊정기 모임의 최대 인원 제한은 없으며, 모임장의 권한에 따라 최대모임 인원수를 제한할 수도 있습니다.</p><p><br></p><p><strong>▶ 정기모임 회원권한은 가입후 모임장의 수락을 통하여 유효합니다.</strong></p><p><br></p><p><strong>▶ 정기모임 회수와 방법 : 모임장의 권한으로 각 정기모임마다 모임 일자가 다를 수 있습니다.</strong></p><p>＊각 모임의 상세페이지를 확인하고 신청하세요.</p><p><br></p><p><strong>▶ 모임별 단톡방을 만들어 모임 회원님들 간의 대화의 장을 제공하고 있습니다. 많이 사용해 주세요</strong></p><p><br></p><p><strong>▶ 정기 모임에 대한 기타 자세한 권한은 전적으로 모임장에게 주어집니다.</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '오픈알림','열심히 준비한 어울림을 여러분께 선보입니다.','<p><strong>안녕하세요!!</strong></p><p><br></p><p>어울림 관리자 울리미입니다.</p><p><br></p><p>그동안 열심히 준비한 커뮤니티가</p><p>아래와 같이 문을 열고자 합니다.</p><p>많이 방문하셔서 <span style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">즐겁고 따뜻한 여러분들만의 </span><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">공간</strong>을 만들기 바랍니다.</p><p><br></p><p><strong>▶ 커뮤니티 주소 :</strong><strong style="color: rgb(153, 51, 255);"><a href="http://localhost:5173/"> http://awoolim.or.kr</a></strong></p><p><strong>▶ 개설일 : </strong><strong style="color: rgb(153, 51, 255);">2024년 8월 14일</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임가입','회원님들 다양한 모임의 정보를 보고 신청하세요.','<h3>안녕하세요~</h3><p><br></p><p>저희가 준비한 다양한 모임의 정보를</p><p><a href="http://localhost:5173/">[메인 페이지]<a>에서 검색하고 확인할 수 있습니다.</p><p><br></p><p>조용한<span style="color: rgb(102, 185, 102);"> 음악♬ 과 차 한 잔</span> 드시면서</p><p>천천히 모임에 관한 정보를 보고</p><p><span style="color: rgb(240, 102, 102);">함께 하고 싶은 </span></p><p>모임을 찾으면 페이지 하단의 <strong style="background-color: rgb(255, 255, 0); color: rgb(230, 0, 0);">[신청하기]</strong> 버튼을 클릭해 보세요.</p><p><br></p><p>새로운 사람들과 멋진 인연이 시작 될 것입니다.</p><p><br></p><p>어울림 관리자 울림이 드림~~</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임종류','저희 어울림에서 준비한 모임의 종류에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>저희 어울림에서 선보이고 있는 모임의 종류에 대하여 알려드립니다.</p><p><br></p><p>어울림의 모임의 종류는</p><p><strong style="color: rgb(153, 51, 255);"><em>스포츠, 전시, 친목, 맛집탐방, 스터디, 독서</em></strong> 등</p><p>다양한 취미 활동을</p><p>여러분들과 공유하며 취미에 맞는 지식과 온정을 나누며</p><p>활동할 수 있도록 준비해 놓았습니다.</p><p><br></p><p>관심 있는 분야에 빨리 등록하셔서</p><p>함께 나누는 기쁨을 누리시기 바랍니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임공지','불량 모임이나 불량 회원을 신고하는 방법입니다.','<p><strong>안녕하세요</strong></p><p><br></p><p>어울림 입니다.</p><p><br></p><p>새로 준비한 많은 소모임들이 메인에 공개되었습니다.</p><p><br></p><p>즐겁고 유익한 정보들이 많이 들어 있으니</p><p><br></p><p>다들 방문하셔서 많은 참여 부탁드립니다.</p><p><br></p><p>회원님들 사랑합니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '회원신고','<h3><strong>안녕하세요</strong></h3><p><br></p><p>모두 <span style="color: rgb(153, 51, 255);">훌륭한 회원분들</span>이라는 생각에 우리는 기본적으로 신고를 기피하고 있지만</p><p>간혹 불량 정보나 언행 등의 문제로 분쟁을 잠재우기 위한</p><p>신고제가 있습니다.</p><p><br></p><p>회원의 경우 신고가 들어가면 관리자 처리 여부에 따라 알림이 발생하고</p><p><strong style="color: rgb(230, 0, 0);">총 5번 신고</strong>가 들어오면 경고 메시지와 더불어 자동으로 <strong style="color: rgb(230, 0, 0);">회원 탈퇴</strong>가 됩니다.</p><p><br></p><p><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">서로 좋은 환경을 만들 수 있도록 함께 노력하는 어울림이 되었으면 좋겠습니다.</strong></p><p><br></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '정기모임','정기 모임에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>정기모임 멤버십에 대하여 공지합니다.</p><p><br></p><p><strong>▶ 정기모임 신청하기</strong></p><p>＊8개의 카테고리에서 나의 [취향]과 [관심]에 맞는 정기모임을 선택 신청합니다.</p><p>＊정기 모임의 최대 인원 제한은 없으며, 모임장의 권한에 따라 최대모임 인원수를 제한할 수도 있습니다.</p><p><br></p><p><strong>▶ 정기모임 회원권한은 가입후 모임장의 수락을 통하여 유효합니다.</strong></p><p><br></p><p><strong>▶ 정기모임 회수와 방법 : 모임장의 권한으로 각 정기모임마다 모임 일자가 다를 수 있습니다.</strong></p><p>＊각 모임의 상세페이지를 확인하고 신청하세요.</p><p><br></p><p><strong>▶ 모임별 단톡방을 만들어 모임 회원님들 간의 대화의 장을 제공하고 있습니다. 많이 사용해 주세요</strong></p><p><br></p><p><strong>▶ 정기 모임에 대한 기타 자세한 권한은 전적으로 모임장에게 주어집니다.</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '오픈알림','열심히 준비한 어울림을 여러분께 선보입니다.','<p><strong>안녕하세요!!</strong></p><p><br></p><p>어울림 관리자 울리미입니다.</p><p><br></p><p>그동안 열심히 준비한 커뮤니티가</p><p>아래와 같이 문을 열고자 합니다.</p><p>많이 방문하셔서 <span style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">즐겁고 따뜻한 여러분들만의 </span><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">공간</strong>을 만들기 바랍니다.</p><p><br></p><p><strong>▶ 커뮤니티 주소 :</strong><strong style="color: rgb(153, 51, 255);"><a href="http://localhost:5173/"> http://awoolim.or.kr</a></strong></p><p><strong>▶ 개설일 : </strong><strong style="color: rgb(153, 51, 255);">2024년 8월 14일</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임가입','회원님들 다양한 모임의 정보를 보고 신청하세요.','<h3>안녕하세요~</h3><p><br></p><p>저희가 준비한 다양한 모임의 정보를</p><p><a href="http://localhost:5173/">[메인 페이지]<a>에서 검색하고 확인할 수 있습니다.</p><p><br></p><p>조용한<span style="color: rgb(102, 185, 102);"> 음악♬ 과 차 한 잔</span> 드시면서</p><p>천천히 모임에 관한 정보를 보고</p><p><span style="color: rgb(240, 102, 102);">함께 하고 싶은 </span></p><p>모임을 찾으면 페이지 하단의 <strong style="background-color: rgb(255, 255, 0); color: rgb(230, 0, 0);">[신청하기]</strong> 버튼을 클릭해 보세요.</p><p><br></p><p>새로운 사람들과 멋진 인연이 시작 될 것입니다.</p><p><br></p><p>어울림 관리자 울림이 드림~~</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '회원신고','<h3><strong>안녕하세요</strong></h3><p><br></p><p>모두 <span style="color: rgb(153, 51, 255);">훌륭한 회원분들</span>이라는 생각에 우리는 기본적으로 신고를 기피하고 있지만</p><p>간혹 불량 정보나 언행 등의 문제로 분쟁을 잠재우기 위한</p><p>신고제가 있습니다.</p><p><br></p><p>회원의 경우 신고가 들어가면 관리자 처리 여부에 따라 알림이 발생하고</p><p><strong style="color: rgb(230, 0, 0);">총 5번 신고</strong>가 들어오면 경고 메시지와 더불어 자동으로 <strong style="color: rgb(230, 0, 0);">회원 탈퇴</strong>가 됩니다.</p><p><br></p><p><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">서로 좋은 환경을 만들 수 있도록 함께 노력하는 어울림이 되었으면 좋겠습니다.</strong></p><p><br></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '정기모임','정기 모임에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>정기모임 멤버십에 대하여 공지합니다.</p><p><br></p><p><strong>▶ 정기모임 신청하기</strong></p><p>＊8개의 카테고리에서 나의 [취향]과 [관심]에 맞는 정기모임을 선택 신청합니다.</p><p>＊정기 모임의 최대 인원 제한은 없으며, 모임장의 권한에 따라 최대모임 인원수를 제한할 수도 있습니다.</p><p><br></p><p><strong>▶ 정기모임 회원권한은 가입후 모임장의 수락을 통하여 유효합니다.</strong></p><p><br></p><p><strong>▶ 정기모임 회수와 방법 : 모임장의 권한으로 각 정기모임마다 모임 일자가 다를 수 있습니다.</strong></p><p>＊각 모임의 상세페이지를 확인하고 신청하세요.</p><p><br></p><p><strong>▶ 모임별 단톡방을 만들어 모임 회원님들 간의 대화의 장을 제공하고 있습니다. 많이 사용해 주세요</strong></p><p><br></p><p><strong>▶ 정기 모임에 대한 기타 자세한 권한은 전적으로 모임장에게 주어집니다.</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '정기모임','정기모임 가입 정보입니다.','<p>안녕하세요.</p><p><br></p><p>정기 모임 가입 방법에 대한 공지입니다.</p><p>저희 정기모임은 <strong>총 ;8개의 카테고리</strong>로 구성되어 본인의 [취향]과 [관심]에 맞는 정기 모임을 선택 신청할 수 있습니다.</p><p>모임 제한 인원은 없고 방장님이 그때그때 알아서 정합니다.</p><p>===========================================</p><p></p><p>- 멤버가입 신청하기 버튼을 눌러 신청을 하면 <strong style="color: rgb(230, 0, 0);">신청 대기</strong>가 되며, <strong>방장님이 수락</strong>을 하면 <strong style="color: rgb(153, 51, 255);">정식 모임 멤버</strong>가 됩니다.</p><p>-<strong style="color: rgb(107, 36, 178);"> 정기모임 모임 방법</strong> : <u>모임장의 권한으로 각 정기모임마다 모임 일자가 다를 수 있습니다</u>.	(예 : 주1회, 월3회, 월1회 등)</p><p>- 주제에 맞는 커리큘럼과 함께 나눌 이야기는 모임장님이 준비해주세요.</p><p>- 모임별로 <strong style="background-color: rgb(255, 255, 0); color: rgb(240, 102, 102);">단톡방</strong>을 만들어 자율적으로 의견을 나눌 수 있는 공간도 있습니다.</p><p>- 정기 모임에 대한 기타 자세한 권한은 전적으로 모임장에게 주어집니다.</p><p></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임공지','불량 모임이나 불량 회원을 신고하는 방법입니다.','<p><strong>안녕하세요</strong></p><p><br></p><p>어울림 입니다.</p><p><br></p><p>새로 준비한 많은 소모임들이 메인에 공개되었습니다.</p><p><br></p><p>즐겁고 유익한 정보들이 많이 들어 있으니</p><p><br></p><p>다들 방문하셔서 많은 참여 부탁드립니다.</p><p><br></p><p>회원님들 사랑합니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '회원신고','<h3><strong>안녕하세요</strong></h3><p><br></p><p>모두 <span style="color: rgb(153, 51, 255);">훌륭한 회원분들</span>이라는 생각에 우리는 기본적으로 신고를 기피하고 있지만</p><p>간혹 불량 정보나 언행 등의 문제로 분쟁을 잠재우기 위한</p><p>신고제가 있습니다.</p><p><br></p><p>회원의 경우 신고가 들어가면 관리자 처리 여부에 따라 알림이 발생하고</p><p><strong style="color: rgb(230, 0, 0);">총 5번 신고</strong>가 들어오면 경고 메시지와 더불어 자동으로 <strong style="color: rgb(230, 0, 0);">회원 탈퇴</strong>가 됩니다.</p><p><br></p><p><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">서로 좋은 환경을 만들 수 있도록 함께 노력하는 어울림이 되었으면 좋겠습니다.</strong></p><p><br></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '오픈알림','열심히 준비한 어울림을 여러분께 선보입니다.','<p><strong>안녕하세요!!</strong></p><p><br></p><p>어울림 관리자 울리미입니다.</p><p><br></p><p>그동안 열심히 준비한 커뮤니티가</p><p>아래와 같이 문을 열고자 합니다.</p><p>많이 방문하셔서 <span style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">즐겁고 따뜻한 여러분들만의 </span><strong style="background-color: rgb(255, 255, 102); color: rgb(0, 138, 0);">공간</strong>을 만들기 바랍니다.</p><p><br></p><p><strong>▶ 커뮤니티 주소 :</strong><strong style="color: rgb(153, 51, 255);"><a href="http://localhost:5173/"> http://awoolim.or.kr</a></strong></p><p><strong>▶ 개설일 : </strong><strong style="color: rgb(153, 51, 255);">2024년 8월 14일</strong></p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임가입','회원님들 다양한 모임의 정보를 보고 신청하세요.','<h3>안녕하세요~</h3><p><br></p><p>저희가 준비한 다양한 모임의 정보를</p><p><a href="http://localhost:5173/">[메인 페이지]<a>에서 검색하고 확인할 수 있습니다.</p><p><br></p><p>조용한<span style="color: rgb(102, 185, 102);"> 음악♬ 과 차 한 잔</span> 드시면서</p><p>천천히 모임에 관한 정보를 보고</p><p><span style="color: rgb(240, 102, 102);">함께 하고 싶은 </span></p><p>모임을 찾으면 페이지 하단의 <strong style="background-color: rgb(255, 255, 0); color: rgb(230, 0, 0);">[신청하기]</strong> 버튼을 클릭해 보세요.</p><p><br></p><p>새로운 사람들과 멋진 인연이 시작 될 것입니다.</p><p><br></p><p>어울림 관리자 울림이 드림~~</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임종류','저희 어울림에서 준비한 모임의 종류에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>저희 어울림에서 선보이고 있는 모임의 종류에 대하여 알려드립니다.</p><p><br></p><p>어울림의 모임의 종류는</p><p><strong style="color: rgb(153, 51, 255);"><em>스포츠, 전시, 친목, 맛집탐방, 스터디, 독서</em></strong> 등</p><p>다양한 취미 활동을</p><p>여러분들과 공유하며 취미에 맞는 지식과 온정을 나누며</p><p>활동할 수 있도록 준비해 놓았습니다.</p><p><br></p><p>관심 있는 분야에 빨리 등록하셔서</p><p>함께 나누는 기쁨을 누리시기 바랍니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '모임공지','불량 모임이나 불량 회원을 신고하는 방법입니다.','<p><strong>안녕하세요</strong></p><p><br></p><p>어울림 입니다.</p><p><br></p><p>새로 준비한 많은 소모임들이 메인에 공개되었습니다.</p><p><br></p><p>즐겁고 유익한 정보들이 많이 들어 있으니</p><p><br></p><p>다들 방문하셔서 많은 참여 부탁드립니다.</p><p><br></p><p>회원님들 사랑합니다.</p>');
INSERT INTO NOTICE(NOTICENO,KEYWORD,TITLE,CONTENT) VALUES(notice_seq.nextval, '정기모임','정기 모임에 대하여 공지합니다.','<h3>안녕하세요~</h3><p><br></p><p>정기모임 멤버십에 대하여 공지합니다.</p><p><br></p><p><strong>▶ 정기모임 신청하기</strong></p><p>＊8개의 카테고리에서 나의 [취향]과 [관심]에 맞는 정기모임을 선택 신청합니다.</p><p>＊정기 모임의 최대 인원 제한은 없으며, 모임장의 권한에 따라 최대모임 인원수를 제한할 수도 있습니다.</p><p><br></p><p><strong>▶ 정기모임 회원권한은 가입후 모임장의 수락을 통하여 유효합니다.</strong></p><p><br></p><p><strong>▶ 정기모임 회수와 방법 : 모임장의 권한으로 각 정기모임마다 모임 일자가 다를 수 있습니다.</strong></p><p>＊각 모임의 상세페이지를 확인하고 신청하세요.</p><p><br></p><p><strong>▶ 모임별 단톡방을 만들어 모임 회원님들 간의 대화의 장을 제공하고 있습니다. 많이 사용해 주세요</strong></p><p><br></p><p><strong>▶ 정기 모임에 대한 기타 자세한 권한은 전적으로 모임장에게 주어집니다.</strong></p>');



-----------------------------------------------------------------------------------------------------------------------------------------------
insert into clubmember values(clubmember_seq.nextval,1,2,sysdate,0);
insert into clubmember values(clubmember_seq.nextval,1,3,sysdate,0);
insert into clubmember values(clubmember_seq.nextval,1,4,sysdate,0);
insert into clubmember values(clubmember_seq.nextval,1,5,sysdate,0);
insert into clubmember values(clubmember_seq.nextval,1,6,sysdate,0);
commit;
