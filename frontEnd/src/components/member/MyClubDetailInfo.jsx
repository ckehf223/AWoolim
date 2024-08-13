import { useEffect, useState } from "react";
import useModal from "/src/common/useModal";
import "/src/css/member/MyClubDetailInfo.css";
import UserProfileModal from "/src/components/member/UserProfileModal";
import ReportModal from "/src/components/member/ReportModal";
import DOMPurify from "dompurify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "/src/common/AuthContext";

const MyClubDetailInfo = () => {
  const { isAuthenticated, loginId } = useAuth();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { isModalOpen, toggleModal } = useModal();
  const [isReportModalOpen, setReportIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clubData, setClubData] = useState("");
  const [clubManager, setClubManager] = useState("");
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
        <div className="myClubDetailInfo">
          <div className="myClubDetailWrap">
            <div className="myClubDetailTopArea">
              <div className="myClubDetailTopTitleBox">
                <div className="myClubDetailHeader">
                  <div className="myClubDetailHeaderBox">
                    <div className="myClubDetailHeaderIcon">
                      <div className="myClubDetailCategoryWrapDiv">
                        <img
                          className="myClubDetailCategoryIcon"
                          src="/src/assets/images/categoryIcon.png"
                        />
                        <span className="myclubspanspan">
                          {clubData.club.category}
                        </span>
                        <span className="myclubspanspanspan">
                          ({isRecruitment ? "모집중" : "모집마감"})
                        </span>
                      </div>
                    </div>

                    {isAuthenticated && loginId !== clubData.club.userId && (
                      <div className="myClubDetailReportBox">
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
                <span className="myclubclubtitle">
                  {clubData.club.clubTitle}
                </span>

                <div className="myClubDetailTop_contentArea">
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
              <div className="myClubDetailTopMiddleBox">
                <div className="myClubDetailTopImageArea">
                  <img
                    src={`data:image/jpeg;base64,${clubData.imageData["clubImage0"]}`}
                  />
                </div>
                <div className="myClubDetailMiddleContentArea">
                  <div>
                    <img src="/src/assets/images/leader.png" />
                    <span className="myclubdetailspanspan">모임장:</span>
                    <span className="myclubdetailspanspanspan">
                      {clubManager.nickName
                        ? clubManager.nickName
                        : clubManager.userName}
                    </span>
                  </div>
                  <div>
                    <img src="/src/assets/images/age.png" />
                    <span className="myclubdetailspanspan">나이제한:</span>
                    <span className="myclubdetailspanspanspan">
                      {clubData.club.ageLimit}
                    </span>
                  </div>
                  <div>
                    <img src="/src/assets/images/gender.png" />
                    <span className="myclubdetailspanspan">제한성별:</span>
                    <span className="myclubdetailspanspanspan">
                      {clubData.club.clubGender}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="myClubDetailSectionArea">
              <div className="myClubDetailIntroDuceArea">
                <span>모임 소개</span>
                <div
                  className="myClubDetailIntroDuceText"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(clubData.club.detailInfo),
                  }}
                ></div>
              </div>
              <div className="myClubDetailMemberArea">
                <div>
                  <span>모임 멤버</span>
                  <span>({clubData.club.memberCount})</span>
                </div>
                <div className="myClubDetailMemberBox">
                  {clubData.memberList.map((member) => (
                    <div
                      className="myClubDetailMemberInfoBox"
                      key={member.userId}
                      onClick={() =>
                        openUserModal({
                          userId: member.userId,
                          nickName: member.nickName
                            ? member.nickName
                            : member.userName,
                          message: member.userIntro,
                          backgroundImage: `data:image/jpeg;base64,${
                            clubData.imageData["backImage" + member.userId]
                          }`,
                          profileImage: `data:image/jpeg;base64,${
                            clubData.imageData["userImage" + member.userId]
                          }`,
                        })
                      }
                    >
                      <img
                        src={`data:image/jpeg;base64,${
                          clubData.imageData["userImage" + member.userId]
                        }`}
                      />
                      <div className="myClubDetailMemberInfo">
                        <p className="myClubDetailMemberNickname">
                          {member.nickName ? member.nickName : member.userName}{" "}
                          <span>
                            {clubData.club.userId === member.userId
                              ? "(모임장)"
                              : ""}
                          </span>
                        </p>
                        <p className="myClubDetailMemberIntro">
                          {member.userIntro}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="myClubDetailTop_contentArea">
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
          </div>
        </div>
      )}
    </>
  );
};
export default MyClubDetailInfo;
