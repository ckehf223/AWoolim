import { useState } from 'react';
import useModal from '../components/useModal';
import './ClubDetailInfo.css'
import UserProfileModal from '../components/UserProfileModal';
import ReportModal from '../components/ReportModal';
import DOMPurify from 'dompurify';
const values = "<p>어렸을 때 부터 우리는 <span style='background-color: rgb(230, 0, 0);'>가난했었고</span>"
  + " 왜 이렇게 사는게 힘들기만 한지</p><p>누가 인생이 아름답다고 말한건지</p>"
  + "<p>태어났을 때부터</p><p>삶이 내게 준 건 끝없이</p>"
  + "<p>이겨내야 했던 고난들 뿐인걸</p><p>그럴때마다 나는 거울 속에</p>"
  + "<p>나에게 물어봤지 무얼 잘못했지</p>"
  + "</p><p><span style='color: rgb(255, 255, 0); background-color: rgb(0, 0, 0);'>내게만이래 달라질 것 같지 않아</span>"
  + "</p><p><span style='color: rgb(255, 255, 0); background-color: rgb(0, 0, 0);'>내일 또 모레</span>"
  + "</p><p><br ></p><p>하지만 그러면 안돼</p><p>주저앉으면 안돼 세상이 주는대로</p>"
  + "<p>그저 주어진 대로</p><p>이렇게 불공평한 세상이 주는대로</p><p>그저 받기만 하면 모든 것은 그대로</p>"
  + "<p><br /></p><p><em style='background-color: rgb(255, 153, 0); color: rgb(255, 255, 255);'>싸울텐가 포기할텐가</em></p>"
  + "<p><em style='background-color: rgb(255, 153, 0); color: rgb(255, 255, 255);'>주어진 운명에 굴복하고 말텐가</em></p>"
  + "<p><em style='background-color: rgb(255, 153, 0); color: rgb(255, 255, 255);'>세상 앞에 고개 숙이지마라</em></p>"
  + "<p><em style='background-color: rgb(255, 153, 0); color: rgb(255, 255, 255);'>기죽지 마라</em></p>"
  + "<p>이겨내야 했던 고난들 뿐인걸</p><p>그럴때마다 나는 거울 속에</p>"
  + "<p><em style='background-color: rgb(255, 153, 0); color: rgb(255, 255, 255);'>그리고 우릴 봐라</em></p>"
  + "<p><br ></p><p>지치고 힘들 땐 내게 기대</p><p>언제나 네 곁에 서 있을게</p>"
  + "<p>혼자라는 생각이 들지 않게</p><p><u>내가 너의 손잡아 줄게</u></p><p><br /></p><p><br /></p>";

const ClubDetailInfo = () => {
  const { isModalOpen, toggleModal } = useModal();
  const [isReportModalOpen, setReportIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserModal = ({ nickName, message, backgroundImage, profileImage }) => {
    setSelectedUser({ nickName, message, backgroundImage, profileImage });
    toggleModal();
  };

  const reportToggleModal = () => setReportIsModalOpen(!isReportModalOpen);

  const openReportModal = ({ nickName }) => {
    setSelectedUser({ nickName });
    reportToggleModal();
  };
  return (
    <>
      <div className='ClubDetailInfo'>
        <div className='ClubDetailWrap'>
          <div className='ClubDetailTopArea'>
            <div className='ClubDetailTopTitleBox'>
              <div className='ClubDetailHeader'>
                <div className='ClubDetailHeaderBox'>
                  <div className='ClubDetailHeaderIcon'>
                    <img className='ClubDetailCategoryIcon' src="/src/images/categoryIcon.png" />
                    <h3>카테고리 영역</h3>
                  </div>
                  <div className='ClubDetailReportBox'>
                    <img src="/src/images/report6.png" alt="신고이미지" onClick={() => openReportModal({ nickName: '김춘자' })} />
                    <ReportModal
                      isOpen={isReportModalOpen}
                      toggle={reportToggleModal}
                      title='신고하기'
                      targetId={selectedUser?.nickName} >
                    </ReportModal>
                  </div>
                </div>
              </div>
              <h1>미술관 친구들 - 저기, 나랑 전시보러 가지 않을래?</h1>
              <div className='ClubDetailTop_contentArea'>
                <div><img src="/src/images/location.png" /><span>지역정보</span></div>
                <div><img src="/src/images/timetable.png" /><span>모임 날짜</span></div>
                <div><img src="/src/images/group.png" /><span>인원</span></div>
              </div>
            </div>
            <div className='ClubDetailTopMiddleBox'>
              <div className='ClubDetailTopImageArea'>
                <img src="/src/images/frankenstein.webp" />
              </div>
              <div className='ClubDetailTop_middelContentArea'>
                <div><img src="/src/images/leader.png" /><strong>모임장:</strong><span>닉네임</span></div>
                <div><img src="/src/images/age.png" /><strong>제한나이:</strong><span>22</span></div>
                <div><img src="/src/images/gender.png" /><strong>제한성별:</strong><span>제한없음</span></div>
              </div>
            </div>
          </div>

          <div className='ClubDetailSectionArea'>
            <div className='ClubDetailIntroDuceArea'>
              <h3>모임 소개</h3>
              <div className='ClubDetailIntroDuceText' dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(values),
              }}>
              </div>
            </div>
            <div className='ClubDetailMemberArea'>
              <h4>모임 멤버 (100)</h4>
              <div className='ClucDetailMemberBox'>

                <div className='ClubDetailMemberInfoBox'
                  onClick={() => openUserModal({
                    nickName: '마봉팔',
                    message: '집에가고싶다~',
                    backgroundImage: '/src/images/frankenstein.webp',
                    profileImage: '/src/images/blank_image.png'
                  })}>
                  <img src="/src/images/blank_image.png" />
                  <div className='ClubDetailMemberInfo'>
                    <p className='ClubDetailMemberNickname'>마봉팔</p>
                    <p className='ClubDetailMemberIntro'>집에가고싶다~</p>
                  </div>
                </div>
              </div>
              <div>
                <UserProfileModal
                  isOpen={isModalOpen}
                  toggle={toggleModal}
                  backgroundImage={selectedUser?.backgroundImage}
                  profileImage={selectedUser?.profileImage}
                  name={selectedUser?.nickName}
                  details={selectedUser?.message}
                >
                </UserProfileModal>
              </div>

            </div>
          </div>
          <div className='ClubDetailBottomArea'>
            <h3>같은 카테고리 인기 모임!</h3>
            <div className='ClubDetailPopGroup'>
              <div>인기 컨텐츠 1</div>
              <div>인기 컨텐츠 1</div>
              <div>인기 컨텐츠 1</div>
              <div>인기 컨텐츠 1</div>
              <div>인기 컨텐츠 1</div>
            </div>
          </div>

          <div className='ClubDetailSignButtonArea'>
            <div className='ClubDetailSignButtonBox'>
              <div>바로 신청하기</div>
              <button className='ClubDetailSignButton'>신청하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ClubDetailInfo