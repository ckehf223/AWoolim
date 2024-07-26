import { useState } from 'react';
import useModal from '../components/useModal';
import './ClubDetailInfo.css'
import ModalComponent from '../components/ModalComponent ';
const ClubDetailInfo = () => {
  // const { isModalOpen, toggleModal } = useModal();
  // const [selectedUser, setSelectedUser] = useState(null);

  // const openUserModal = ({ nickName, message }) => {
  //   setSelectedUser({ nickName, message });
  //   toggleModal();
  // };
  return (
    <>
      <div className='ClubDetailInfo'>
        <div className='ClubDetailWrap'>
          <div className='ClubDetailTopArea'>
            <div className='ClubDetailTopTitleBox'>
              <div className='ClubDetailHeader'>
                <img className='CategoryIcon' src="/src/images/categoryIcon.png" />
                <h3>카테고리 영역</h3>
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
              <div className='ClubDetailIntroDuceText'>
                소개 텍스트 영역
              </div>
            </div>
            <div className='ClubDetailMemberArea'>
              <h4>모임 멤버 (100)</h4>
              <div className='ClucDetailMemberBox'>

                <div className='ClubDetailMemberInfoBox'>
                  <img src="/src/images/blank_image.png" />
                  <div className='ClubDetailMemberInfo'>
                    <p className='ClubDetailMemberNickname'>마봉팔</p>
                    <p className='ClubDetailMemberIntro'>집에가고싶다~</p>
                  </div>
                </div>
              </div>
              {/* <ModalComponent isOpen={isModalOpen} toggle={toggleModal} title='유저정보' >
                <div>
                  <div>이름: {selectedUser?.name}</div>
                  <div>이메일: {selectedUser?.email}</div>
                  <div>역할: {selectedUser?.role}</div>
                </div>
              </ModalComponent> */}

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