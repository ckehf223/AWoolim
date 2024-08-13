import { useEffect, useState } from "react";
import "/src/css/member/UserMyClub.css";
import useModal from "/src/common/useModal";
import UserExitClubModal from "/src/components/member/UserExitClubModal";
import instance from "/src/common/auth/axios";
import { useNavigate } from "react-router-dom";

const UserMyClub = () => {
  const [clubData, setClubData] = useState({ apprList: [], disaList: [] });
  const [apprClub, setApprClub] = useState([]);
  const [disaClub, setDisaClub] = useState([]);
  const [sortData, setSortData] = useState("전체");
  const { isModalOpen, toggleModal } = useModal();
  const [selectedClub, setSelectedClub] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const getMyClub = async () => {
      try {
        const response = await instance.get(
          "http://localhost:8080/api/club/readMyClub",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setClubData(response.data);
        setApprClub(response.data.apprList);
        setDisaClub(response.data.disaList);
        console.log(response.data);
      } catch (error) {
        console.error("내 참여모임 정보 로딩중 오류" + error);
      }
    };
    getMyClub();
  }, []);

  const openExitModal = ({ title, clubNo, clubTitle, isAccept }) => {
    setSelectedClub({ title, clubNo, clubTitle, isAccept });
    toggleModal();
  };

  const onChangeSort = (e) => {
    const { value } = e.target;
    setSortData(value);

    const filteredApprClub =
      value === "전체"
        ? clubData.apprList
        : clubData.apprList.filter((club) => club.category === value);
    const filteredDisaClub =
      value === "전체"
        ? clubData.disaList
        : clubData.disaList.filter((club) => club.category === value);

    setApprClub(filteredApprClub);
    setDisaClub(filteredDisaClub);
  };

  return (
    <>
      <div className="UserMyClub">
        <div className="UserMyClubWrap">
          <div className="UserMyClubContentBorder">
            <div className="UserMyClubTitle">
              <h4>참여 중인 모임</h4>
            </div>
          </div>
          <div className="UserMyClubMainArea">
            <div className="UserMyClubArea">
              {(clubData.apprList.length > 0 ||
                clubData.disaList.length > 0) && (
                  <div className="UserMyClubSortBox">
                    <select
                      className="UserMyClubSort"
                      value={sortData}
                      onChange={onChangeSort}
                    >
                      <option value="전체" defaultChecked>
                        전체
                      </option>
                      <option value="친목">친목</option>
                      <option value="독서">독서</option>
                      <option value="전시">전시</option>
                      <option value="스포츠">스포츠</option>
                      <option value="스터디">스터디</option>
                      <option value="맛집탐방">맛집탐방</option>
                      <option value="취미활동">취미활동</option>
                    </select>
                  </div>
                )}

              {clubData.apprList.length === 0 &&
                clubData.disaList.length === 0 ? (
                <div className="UserMyClubNoneArea">
                  <p>
                    현재 참여중인 <b>모임</b>이 없습니다.
                  </p>
                </div>
              ) : (
                <>
                  {apprClub.map((club) => (
                    <div className="UserMyClubBox" key={club.clubNo}>
                      <div className="UserMyClubInfoBox">
                        <div className="UserMyClubImageBox">
                          <img
                            src={`data:image/jpeg;base64,${club.clubImage}`}
                            alt="모임 사진"
                          />
                        </div>
                        <div className="UserMyClubInfo">
                          <p className="UserMyClubCategory">{club.category}</p>
                          <p className="UserMyClubTitle">{club.clubTitle}</p>
                        </div>
                      </div>
                      <div className="UserMyClubInfo">
                        <p className="UserMyClubCategory">
                          {club.regularType === 1 ? "정기모임" : "단기 모임"}
                        </p>
                        <p className="UserMyClubTitle">{club.dday}</p>
                      </div>
                      <div className="UserMyClubInfo">
                        <p className="UserMyClubCategory">멤버</p>
                        <p className="UserMyClubTitle">
                          {" "}
                          {club.memberCount} 명
                        </p>
                      </div>
                      <div className="UserMyClubButtonArea">
                        <img
                          className="UserMyClubBoardImg"
                          src="/src/assets/images/home.png"
                          alt="모임 게시판 이미지"
                          onClick={() => { nav(`/includeclub/detailInfo/${club.clubNo}`) }}
                        />
                        <img
                          className="UserMyClubExitImg"
                          src="/src/assets/images/exit.png"
                          alt="모임 나가기 이미지"
                          onClick={() => {
                            openExitModal({
                              title: "모임 탈퇴",
                              clubNo: club.clubNo,
                              clubTitle: club.clubTitle,
                              isAccept: 1,
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {disaClub.map((club) => (
                    <div className="UserMyClubBox" key={club.clubNo}>
                      <div className="UserMyClubInfoBox">
                        <div className="UserMyClubImageBox">
                          <img
                            src={`data:image/jpeg;base64,${club.clubImage}`}
                            alt="모임 사진"
                          />
                        </div>
                        <div className="UserMyClubInfo">
                          <p className="UserMyClubCategory">{club.category}</p>
                          <p className="UserMyClubTitle">{club.clubTitle}</p>
                        </div>
                      </div>
                      <div className="UserMyClubDisaArea">
                        <p>승인 대기중</p>
                      </div>
                      <div className="UserMyClubButtonArea">
                        <button
                          className="UserMyClubExitButton"
                          onClick={() => {
                            openExitModal({
                              title: "신청 취소",
                              clubNo: club.clubNo,
                              clubTitle: club.clubTitle,
                              isAccept: 0,
                            });
                          }}
                        >
                          신청 취소
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <UserExitClubModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                title={selectedClub?.title}
                clubNo={selectedClub?.clubNo}
                clubTitle={selectedClub?.clubTitle}
                isAccept={selectedClub?.isAccept}
              ></UserExitClubModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMyClub;
