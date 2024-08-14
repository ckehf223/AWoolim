import { useEffect, useState } from "react";
import useModal from "/src/common/useModal";
import "/src/css/member/ClubDetailInfo.css";
import UserProfileModal from "/src/components/member/UserProfileModal";
import ReportModal from "/src/components/member/ReportModal";
import DOMPurify from "dompurify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import instance from "/src/common/auth/axios";
import { useAuth } from "/src/common/AuthContext";
const ClubDetailInfo = () => {
  const { isAuthenticated, loginId } = useAuth();
  const nav = useNavigate();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { isModalOpen, toggleModal } = useModal();
  const [isReportModalOpen, setReportIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clubData, setClubData] = useState("");
  const [clubManager, setClubManager] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isRecruitment, setIsRecruitment] = useState();
  useEffect(() => {
    const clubData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/club/read/${param.no}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setClubData(response.data);
        setClubManager(
          response.data.memberList.find((member) => {
            return member.userId === response.data.club.userId;
          })
        );
        setIsRecruitment(response.data.club.recruitment === 1 ? true : false);
        setIsLoading(false);
      } catch (error) {
        console.error("클럽 정보 로딩 중 오류", error);
        setIsLoading(false);
      }
    };
    clubData();
  }, [param]);
  const clubSignUp = async () => {
    if (!isAuthenticated) {
      nav("/login");
    } else if (
      clubData.memberList.find(
        (member) => String(member.userId) === String(loginId)
      )
    ) {
      alert("이미 참여중인 모임입니다.");
    } else {
      try {
        const response = await instance.post(
          `http://localhost:8080/api/club/clubmember/signUp/${clubData.club.clubNo}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        switch (response.data) {
          case 1:
            alert("이미 신청한 모임입니다.");
            break;
          case 0:
            alert(
              "신청이 완료되었습니다\n 모임장의 승인이 완료되면 참여 하실 수 있습니다."
            );
            setIsSignUp(true);
            break;
          case -1:
            alert(
              "신청을 하는 중 문제가 발생하였습니다 \n 잠시 후 다시 시도해주세요"
            );
        }
      } catch (error) {
        console.error("clubSignUp Error" + error);
      }
    }
  };
  const openUserModal = ({
    nickName,
    message,
    backgroundImage,
    profileImage,
    userId,
  }) => {
    setSelectedUser({
      nickName,
      message,
      backgroundImage,
      profileImage,
      userId,
    });
    toggleModal();
  };

  const reportToggleModal = () => setReportIsModalOpen(!isReportModalOpen);
  const openReportModal = ({ nickName, userId, targetId }) => {
    setSelectedUser({ nickName, userId, targetId });
    reportToggleModal();
  };
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="ClubDetailInfo">
          <div className="ClubDetailWrap">
            <div className="ClubDetailTopArea">
              <div className="ClubDetailTopTitleBox">
                <div className="ClubDetailHeader">
                  <div className="ClubDetailHeaderBox">
                    <div className="ClubDetailHeaderIcon">
                      <div className="ClubDetailCategoryWrapDiv">
                        <img
                          className="ClubDetailCategoryIcon"
                          src="/src/assets/images/categoryIcon.png"
                        />
                        <span className="clubspanspan">
                          {clubData.club.category}
                        </span>
                        <span className="clubspanspanspan">
                          ({isRecruitment ? "모집중" : "모집마감"})
                        </span>
                      </div>
                    </div>
                    {isAuthenticated && loginId !== clubData.club.userId && (
                      <div className="ClubDetailReportBox">
                        <img
                          src="/src/assets/images/report6.png"
                          alt="신고이미지"
                          onClick={() =>
                            openReportModal({
                              nickName: clubData.club.clubTitle,
                              userId: loginId,
                              targetId: clubData.club.clubNo,
                            })
                          }
                        />
                        <ReportModal
                          isOpen={isReportModalOpen}
                          toggle={reportToggleModal}
                          title="신고하기"
                          targetId={selectedUser?.targetId}
                          userId={selectedUser?.userId}
                          targetName={selectedUser?.nickName}
                          type={"club"}
                        ></ReportModal>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <span className="clubclubtitle">{clubData.club.clubTitle}</span>
                <div className="ClubDetailTop_contentArea">
                  <div>
                    <img src="/src/assets/images/location.png" />
                    <span>
                      {" "}
                      {clubData.club.city + " " + clubData.club.district}{" "}
                    </span>
                  </div>
                  <div>
                    <img src="/src/assets/images/timetable.png" />
                    <span> {clubData.club.dday} </span>
                  </div>
                  <div>
                    <img src="/src/assets/images/group.png" />
                    <span>
                      {clubData.club.memberCount +
                        " / " +
                        clubData.club.maxMember}
                      명
                    </span>
                  </div>
                </div>
              </div>
              <div className="ClubDetailTopMiddleBox">
                <div className="ClubDetailTopImageArea">
                  <img
                    src={`data:image/jpeg;base64,${clubData.imageData["clubImage0"]}`}
                  />
                </div>
                <div className="ClubDetailTop_middelContentArea">
                  <div>
                    <img src="/src/assets/images/leader.png" />
                    <span className="clubdetailspanspan">모임장:</span>
                    <span className="clubdetailspanspanspan">
                      {clubManager.nickName
                        ? clubManager.nickName
                        : clubManager.userName}
                    </span>
                  </div>
                  <div>
                    <img src="/src/assets/images/age.png" />
                    <span className="clubdetailspanspan">나이제한:</span>
                    <span className="clubdetailspanspanspan">
                      {clubData.club.ageLimit}
                    </span>
                  </div>
                  <div>
                    <img src="/src/assets/images/gender.png" />
                    <span className="clubdetailspanspan">제한성별:</span>
                    <span className="clubdetailspanspanspan">
                      {clubData.club.clubGender}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ClubDetailSectionArea">
              <div className="ClubDetailIntroDuceArea">
                <span>모임 소개</span>
                <div
                  className="ClubDetailIntroDuceText"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(clubData.club.detailInfo),
                  }}
                ></div>
              </div>
              <div className="ClubDetailMemberArea">
                <div>
                  <span>모임 멤버</span>
                  <span>({clubData.club.memberCount})</span>
                </div>
                <div className="ClucDetailMemberBox">
                  {clubData.memberList.map((member) => (
                    <div
                      className="ClubDetailMemberInfoBox"
                      key={member.userId}
                      onClick={() =>
                        openUserModal({
                          userId: member.userId,
                          nickName: member.nickName
                            ? member.nickName
                            : member.userName,
                          message: member.userIntro,
                          backgroundImage: `data:image/jpeg;base64,${clubData.imageData["backImage" + member.userId]
                            }`,
                          profileImage: `data:image/jpeg;base64,${clubData.imageData["userImage" + member.userId]
                            }`,
                        })
                      }
                    >
                      <img
                        src={`data:image/jpeg;base64,${clubData.imageData["userImage" + member.userId]
                          }`}
                      />
                      <div className="ClubDetailMemberInfo">
                        <p className="ClubDetailMemberNickname">
                          {member.nickName ? member.nickName : member.userName}{" "}
                          <span>
                            {clubData.club.userId === member.userId
                              ? "(모임장)"
                              : ""}
                          </span>
                        </p>
                        <p className="ClubDetailMemberIntro">
                          {member.userIntro}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ClubDetailTop_contentArea">
              <div>
                <UserProfileModal
                  userId={selectedUser?.userId}
                  isOpen={isModalOpen}
                  toggle={toggleModal}
                  backgroundImage={selectedUser?.backgroundImage}
                  profileImage={selectedUser?.profileImage}
                  name={selectedUser?.nickName}
                  details={selectedUser?.message}
                ></UserProfileModal>
              </div>
            </div>
            <div className="ClubDetailBottomArea">
              <h3>실시간 인기 모임</h3>
              <div className="ClubDetailPopGroup">
                {clubData.clubList.map((club) => (
                  <div key={club.clubNo} className="ClubDetailPopGroupInfoBox">
                    <div className="ClubDetailPopGroupImage">
                      <img
                        src={`data:image/jpeg;base64,${clubData.imageData["clubImage" + club.clubNo]
                          }`}
                        onClick={() => {
                          nav(`/club/${club.clubNo}`);
                        }}
                      />
                    </div>
                    <div className="ClubDetailPopGroupInfo">
                      <span className="clubitemclubtitle">
                        {club.clubTitle}
                      </span>
                      <div>
                        <span>
                          {club.city} {club.district}
                        </span>
                        <span> {club.category} 모임</span>
                      </div>
                      <div>
                        <span>모임 날짜: {club.dDay}</span>
                        <span>
                          인원: {club.memberCount}/{club.maxMember}
                        </span>
                      </div>
                      <span className="clubitemdetailinfo">
                        {club.detailInfo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {loginId !== clubData.club.userId && (
              <div>
                {isRecruitment &&
                  clubData.club.maxMember - clubData.club.memberCount > 0 ? (
                  <div className="ClubDetailSignButtonArea">
                    <div className="ClubDetailSignButtonBox">
                      <div className="ClubDetailSignTextArea">
                        <p>참여 모집중!</p>
                        <p>
                          남은 자리{" "}
                          <span>
                            {clubData.club.maxMember -
                              clubData.club.memberCount}
                          </span>{" "}
                        </p>
                      </div>
                      {!isSignUp && (
                        <button
                          className="ClubDetailSignButton"
                          onClick={() => {
                            clubSignUp();
                          }}
                        >
                          신청하기
                        </button>
                      )}
                      {isSignUp && (
                        <button className="ClubDetailSignButton">
                          신청 완료
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="ClubDetailSignButtonArea">
                    <div className="ClubDetailSignButtonBox">
                      <div className="ClubDetailSignTextArea">
                        <p>모집 마감</p>
                      </div>
                      <button className="ClubDetailSignButton">
                        신청 불가
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ClubDetailInfo;
