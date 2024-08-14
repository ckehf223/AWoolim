import { useEffect, useState } from "react";
import "/src/css/member/UserMadeClub.css";
import { useNavigate } from "react-router-dom";
import instance from "/src/common/auth/axios";

const UserMadeClub = () => {
  const [clubData, setClubData] = useState({ clubList: [], countMap: {} });
  const nav = useNavigate();

  useEffect(() => {
    const getMyMadeClub = async () => {
      try {
        const response = await instance.get(
          "http://localhost:8080/api/club/read/madeClubList",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setClubData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("내가 만든 모임 정보 로딩중 오류", error);
      }
    };
    getMyMadeClub();
  }, []);

  const handleBoardImgClick = (clubNo) => {
    // 'groupnav' 페이지로 이동합니다. 클럽 번호를 URL에 포함시킵니다.
    nav(`/mycreateclub/${clubNo}`);
  };

  return (
    <div className="UserMadeClub">
      <div className="UserMadeClubWrap">
        <div className="UserMadeClubContentBorder">
          <div className="UserMadeClubTitle">
            <h4>내 모임</h4>
          </div>
        </div>
        <div className="UserMadeClubMainArea">
          <div className="UserMadeClubArea">
            <p>
              <b>최대 3개 생성 가능</b>
            </p>

            {clubData.clubList === null || clubData.clubList.length === 0 ? (
              <div className="UserMadeClubNoneArea">
                <p>
                  현재 개설한 <b>모임</b>이 없습니다.
                </p>
              </div>
            ) : (
              clubData.clubList.map((club) => (
                <div className="UserMadeClubBox" key={club.clubNo}>
                  <div className="UserMadeClubImageBox">
                    <img
                      src={`data:image/jpeg;base64,${club.clubImage}`}
                      alt="모임 사진"
                    />
                  </div>
                  <div className="UserMadeClubInfo">
                    <p className="UserMadeClubCategory">
                      {club.recruitment === 1 ? "모집중" : "모집마감"}
                    </p>
                    <p className="UserMadeClubTitle">{club.clubTitle}</p>
                  </div>
                  <div className="UserMadeClubMgBox">
                    <div className="UserMadeClubInfo">
                      <p className="UserMadeClubCategory">인원</p>
                      <p className="UserMadeClubTitle">
                        {club.memberCount} / {club.maxMember}명
                      </p>
                    </div>
                  </div>
                  <div className="UserMadeClubMgBox">
                    <div className="UserMadeClubInfo">
                      <p className="UserMadeClubCategory">신청</p>
                      <p className="UserMadeClubTitle">
                        {clubData.countMap["count" + club.clubNo]} 건
                      </p>
                    </div>
                  </div>
                  <div className="UserMadeClubButtonArea">
                    <img
                      className="UserMadeClubBoardImg"
                      src="/src/assets/images/home.png"
                      alt="모임 게시판 이미지"
                      onClick={() => handleBoardImgClick(club.clubNo)} // 클릭 시 페이지 전환
                    />
                    <img
                      className="UserMadeClubExitImg"
                      src="/src/assets/images/settings.png"
                      alt="모임 설정 이미지"
                      onClick={() => {
                        nav(`/mypage/clubmanager/modify/${club.clubNo}`);
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMadeClub;
