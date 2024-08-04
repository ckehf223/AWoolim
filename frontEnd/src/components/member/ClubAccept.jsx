import { useState } from 'react';
import '/src/css/member/ClubMember.css'
import { useNavigate } from 'react-router-dom';
import useModal from '/src/common/useModal';
import UserProfileModal from '/src/components/member/UserProfileModal';
const MemberData = [
  {
    no: 1,
    id: 'ckehf223',
    name: '마봉팔',
    message: '학원이 너무 멀다',
    image: 'blank_image.png',
    backImg: 'frankenstein.webp',
    gender: '남성',
    age: '29',
    regdate: '2024-07-01',
  },
  {
    no: 2,
    id: 'kim123',
    name: '',
    message: '집에가고 싶어',
    image: 'frankenstein.webp',
    backImg: 'image.png',
    gender: '여성',
    age: '20',
    regdate: '2024-04-22',
  },
  {
    no: 3,
    id: 'hong312',
    name: '홍길동',
    message: '나쁜놈들이 너무 많다',
    image: 'blank_image.png',
    backImg: 'frankenstein.webp',
    gender: '남성',
    age: '55',
    regdate: '2023-08-16',
  },
];

const ClubAccept = () => {
  const [data, setData] = useState(MemberData);
  const [searchInput, setSearchInput] = useState('');
  const { isModalOpen, toggleModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserModal = (member) => {
    setSelectedUser(member);
    toggleModal();
  };

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const onClickSearch = () => {
    setData(() => MemberData.filter((member) => searchInput === '' ? member : (member.name !== '' ? member.name === searchInput : member.id === searchInput)))
  }
  return (
    <>
      <div className='ClubMember'>
        <div className='ClubMemberHeaderArea'>
          <div className='ClubMemberProfile'>프로필</div>
          <div className='ClubMemberGender'>성별</div>
          <div className='ClubMemberAge'>나이</div>
          <div className='ClubMemberDate'>신청일</div>
        </div>
        <div className='ClubMemberArea'>

          {MemberData.length === 0 ? (<div className='UserMadeClubNoneArea'>
            <p>모임 신청 내역이 없습니다.</p>
          </div>) : (data.map((member) => {
            return (
              <div className='ClubMemberBox' key={member.no}>
                <div className='ClubMemberInfoBox'>
                  <div className='ClubMemberImageBox'>
                    <img src={`/src/images/${member.image}`} onClick={() => { openUserModal(member) }} />
                  </div>
                  <div className='ClubMemberProfileInfo'>
                    <p className='ClubMemberName'>{member.name !== '' ? member.name : member.id}</p>
                    <p className='ClubMemberMg'>{member.message}</p>
                  </div>
                  <div className='ClubMemberGenderArea'>
                    <p>{member.gender}</p>
                  </div>
                  <div className='ClubMemberAgeArea'>
                    <p>{member.age}세</p>
                  </div>
                  <div className='ClubMemberDateArea'>
                    <p>{member.regdate}</p>
                  </div>
                </div>
                <div className='ClubAcceptButtonBox'>
                  <img src="/src/assets/images/check.png" alt="신청 수락 이미지" />
                  <img src="/src/assets/images/remove.png" alt="신청 거절 이미지" />
                </div>
              </div>
            )
          }))}
          <UserProfileModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            backgroundImage={selectedUser?.backImg}
            profileImage={selectedUser?.image}
            name={selectedUser?.name === '' ? selectedUser?.id : selectedUser?.name}
            details={selectedUser?.message}
          >
          </UserProfileModal>

        </div>
      </div>
    </>
  )
}
export default ClubAccept;