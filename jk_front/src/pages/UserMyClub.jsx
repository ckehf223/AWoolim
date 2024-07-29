import { useState } from 'react';
import './UserMyClub.css'
import useModal from '../components/useModal';
import UserExitClubModal from '../components/UserExitClubModal';
const myClubData = [
  {
    clubNo: 1,
    category: '실내스포츠',
    clubName: '오늘 다같이 미쳐보자',
    clubImage: '/src/images/image.png',
  },
  {
    clubNo: 2,
    category: '친목모임',
    clubName: '오늘 다같이 죽어보자',
    clubImage: '/src/images/image.png',
  },
  {
    clubNo: 3,
    category: '야외스포츠',
    clubName: '오늘 다같이 이겨보자',
    clubImage: '/src/images/image.png',
  },
];

const UserMyClub = () => {
  const [data, setData] = useState(myClubData);
  const [sortData, setSortData] = useState('전체');
  const { isModalOpen, toggleModal } = useModal();


  const openExitModal = () => {
    toggleModal();
  }

  const onChangeSort = (e) => {
    setSortData(e.target.value)
    setData(() => {
      return myClubData.filter((club) => e.target.value === '전체' ? club : club.category === e.target.value);
    })
  }
  return (
    <>
      <div className='UserMyClub'>
        <div className='UserMyClubWrap'>
          <div className='UserMyClubContentBorder'>
            <div className='UserMyClubTitle'>
              <h3>참여 중인 모임</h3>
            </div>
          </div>
          <div className='UserMyClubMainArea'>

            <div className='UserMyClubArea'>
              {myClubData.length !== 0 && (
                <div className='UserMyClubSortBox'>
                  <select className='UserMyClubSort' value={sortData} onChange={onChangeSort}>
                    <option defaultValue="전체" defaultChecked>전체</option>
                    <option value="야외스포츠">야외스포츠</option>
                    <option value="실내스포츠">실내스포츠</option>
                    <option value="봉사활동">봉사활동</option>
                    <option value="스터디">스터디</option>
                    <option value="파티">파티</option>
                    <option value="공연">공연</option>
                    <option value="친목">친목</option>
                  </select>
                </div>
              )}

              {myClubData.length === 0 ?
                (
                  <div className='UserMyClubNoneArea'>
                    <p>현재 참여중인 <b>모임</b>이 없습니다.</p>
                  </div>

                ) : (
                  data.map((club) => {
                    return (
                      <div className='UserMyClubBox' key={club.clubNo}>
                        <div className='UserMyClubInfoBox'>
                          <div className='UserMyClubImageBox'>
                            <img src={club.clubImage} alt="모임 사진" />
                          </div>
                          <div className='UserMyClubInfo'>
                            <p className='UserMyClubCategory'>{club.category}</p>
                            <p className='UserMyClubTitle'>{club.clubName}</p>
                          </div>
                        </div>
                        <div className='UserMyClubButtonArea'>
                          <img className='UserMyClubBoardImg' src="/src/images/home.png" alt="모임 게시판 이미지" />
                          <img className='UserMyClubExitImg' src="/src/images/exit.png" alt="모임 나가기 이미지" onClick={openExitModal} />
                        </div>
                      </div>
                    )
                  }))}
              <UserExitClubModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                title={'모임 나가기'}
              >
              </UserExitClubModal>
            </div>
          </div>

        </div>
      </div >
    </>
  )
}
export default UserMyClub;