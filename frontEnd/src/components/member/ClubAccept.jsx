import { useEffect, useState } from 'react';
import '/src/css/member/ClubMember.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'
import useModal from '/src/common/useModal';
import instance from '/src/common/auth/axios';
import UserProfileModal from '/src/components/member/UserProfileModal';


const ClubAccept = () => {
  const param = useParams();
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const { isModalOpen, toggleModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getClubMembers = async () => {
      try {
        const response = await instance.get(`http://localhost:8080/api/club/getAcceptMemberList/${param.no}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setData(response.data);
      } catch (error) {
        console.error("모임 멤버 리스트 로딩중 에러 발생" + error);
      }
    }
    getClubMembers();
  }, [param.no])

  const accept = async (userId) => {
    try {
      const response = await instance.post(`http://localhost:8080/api/club/acceptClubMember`,
        {
          userId: userId,
          clubNo: param.no
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.data === 1) {
        alert(userId + ' 신청 수락 하였습니다.');
        window.location.reload();
      } else {
        alert('모임 정원보다 많은 인원을 수용할 수 없습니다.\n 확인 후 다시 시도해 주세요');
      }
    } catch (error) {
      console.error("모임멤버 신청 수락 요청 중 에러발생" + error)
    }
  }
  const refuse = async (userId) => {
    try {
      await instance.post(`http://localhost:8080/api/club/refuseClubMember`,
        {
          userId: userId,
          clubNo: param.no
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      alert(userId + ' 신청 거절 하였습니다.');
      window.location.reload();
    } catch (error) {
      console.error("모임멤버 신청 거절 요청 중 에러발생" + error)
    }
  }


  const openUserModal = (member) => {
    setSelectedUser(member);
    toggleModal();
  };

  return (
    <>
      <div className='MyClubManagerMainArea'>
        <div>
          <Button variant="primary" onClick={() => nav(`/mypage/clubmanager/modify/${param.no}`)}>정보 수정</Button>{' '}
          <Button variant="primary" onClick={() => nav(`/mypage/clubmanager/member/${param.no}`)}>모임 멤버</Button>{' '}
          <Button variant="primary" onClick={() => nav(`/mypage/clubmanager/accept/${param.no}`)}>신청 관리</Button>{' '}
        </div>
        <div className='MyClubManagerContentArea'>
          <div className='ClubMember'>
            <div className='ClubMemberHeaderArea'>
              <div className='ClubMemberProfile'>프로필</div>
              <div className='ClubMemberGender'>성별</div>
              <div className='ClubMemberAge'>나이</div>
              <div className='ClubMemberDate'>신청일</div>
            </div>
            <div className='ClubMemberArea'>

              {data.length === 0 ? (<div className='UserMadeClubNoneArea'>
                <p>모임 신청 내역이 없습니다.</p>
              </div>) : (data.map((member) => {
                return (
                  <div className='ClubMemberBox' key={member.USERID}>
                    <div className='ClubMemberInfoBox'>
                      <div className='ClubMemberImageBox'>
                        <img src={`data:image/jpeg;base64,${member.USERIMAGE}`} onClick={() => { openUserModal(member) }} />
                      </div>
                      <div className='ClubMemberProfileInfo'>
                        <p className='ClubMemberName'>{member.NICKNAME ? member.NICKNAME : member.USERNAME}</p>
                        <p className='ClubMemberMg'>{member.USERINTRO}</p>
                      </div>
                      <div className='ClubMemberGenderArea'>
                        <p>{member.USERGENDER === 'M' ? '남' : '여'}</p>
                      </div>
                      <div className='ClubMemberAgeArea'>
                        <p>{new Date().getFullYear() - parseInt(member.USERBIRTH.split('.')[0])}세</p>
                      </div>
                      <div className='ClubMemberDateArea'>
                        <p>{member.REGDATE}</p>
                      </div>
                    </div>
                    <div className='ClubAcceptButtonBox'>
                      <img src="/src/assets/images/check.png" alt="신청 수락 이미지" onClick={() => { accept(member.USERID) }} />
                      <img src="/src/assets/images/remove.png" alt="신청 거절 이미지" onClick={() => { refuse(member.USERID) }} />
                    </div>
                  </div>
                )
              }))}
              <UserProfileModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                backgroundImage={"data:image/jpeg;base64," + selectedUser?.USERBACKIMAGE}
                profileImage={"data:image/jpeg;base64," + selectedUser?.USERIMAGE}
                name={selectedUser?.NICKNAME !== '' ? selectedUser?.NICKNAME : selectedUser?.USERNAME}
                details={selectedUser?.USERINTRO}
                userId={selectedUser?.USERID}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ClubAccept;