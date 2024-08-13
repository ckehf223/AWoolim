import { useEffect, useState } from 'react';
import '/src/css/member/ClubMember.css'
import { useNavigate, useParams } from 'react-router-dom';
import useModal from '/src/common/useModal';
import { Button } from 'reactstrap'
import UserProfileModal from '/src/components/member/UserProfileModal';
import instance from '/src/common/auth/axios';
import WithdrawalModal from './WithdrawalModal';
const ClubMember = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const nav = useNavigate();
  const { isModalOpen, toggleModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedExitUser, setSelectedExitUser] = useState(null);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  useEffect(() => {
    const getClubMembers = async () => {
      try {
        const response = await instance.get(`/api/club/getClubMemberList/${param.no}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setData(response.data);
        setMemberData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("모임 멤버 리스트 로딩중 에러 발생" + error);
      }
    }
    getClubMembers();
  }, [param.no])


  const openUserModal = (member) => {
    setSelectedUser(member);
    toggleModal();
  };
  const openWithdrawalModal = (member) => {
    setSelectedExitUser(member);
    toggleExitModal();
  }
  const toggleExitModal = () => setIsExitModalOpen(!isExitModalOpen);

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const onClickSearch = () => {
    setData(() => memberData.filter((member) => searchInput === '' ? member : (member.NICKNAME ? member.NICKNAME === searchInput : member.USERNAME === searchInput)))
  }
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
            <div className='ClubMemberSearchArea'>
              <div className='ClubMemberSearchBox'>
                <input type="text" placeholder='멤버 검색' value={searchInput} onChange={onChangeSearch} />
                <img src="/src/assets/images/search.png" alt="검색이미지" onClick={onClickSearch} />
              </div>
            </div>
            <div className='ClubMemberHeaderArea'>
              <div className='ClubMemberProfile'>프로필</div>
              <div className='ClubMemberGender'>성별</div>
              <div className='ClubMemberAge'>나이</div>
              <div className='ClubMemberDate'>가입일</div>
            </div>
            <div className='ClubMemberArea'>

              {memberData.length === 0 ? (<div className='UserMadeClubNoneArea'>
                <p>모임 멤버가 없습니다.</p>
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
                    <div className='ClubMemberDeleteBox'>
                      <img src="/src/assets/images/deleteUser.png" alt="멤버 삭제 이미지" onClick={() => { openWithdrawalModal(member) }} />
                    </div>
                  </div>
                )
              }))}
              <UserProfileModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                backgroundImage={"data:image/jpeg;base64," + selectedUser?.USERBACKIMAGE}
                profileImage={"data:image/jpeg;base64," + selectedUser?.USERIMAGE}
                name={selectedUser?.NICKNAME ? selectedUser?.NICKNAME : selectedUser?.USERNAME}
                details={selectedUser?.USERINTRO}
                userId={selectedUser?.USERID}
              />

              <WithdrawalModal
                isOpen={isExitModalOpen}
                toggle={toggleExitModal}
                title='모임 멤버 탈퇴'
                userName={selectedExitUser?.NICKNAME ? selectedExitUser?.NICKNAME : selectedExitUser?.USERNAME}
                targetId={selectedExitUser?.USERID}
                clubNo={param.no}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ClubMember;