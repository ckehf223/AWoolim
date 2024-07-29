import { useState } from 'react';
import './UserMadeClub.css'
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
const UserMadeClub = () => {
  const [data, setData] = useState(myClubData);
  return (
    <>
      <div className='UserMadeClub'>
        <div className='UserMadeClubWrap'>
          <div className='UserMadeClubContentBorder'>
            <div className='UserMadeClubTitle'>
              <h3>내 모임</h3>
            </div>
          </div>
          <div className='UserMadeClubMainArea'>
            <div className='UserMadeClubArea'>
              <p><b>내가 만든 모임은 최대 3개</b></p>

              {myClubData.length === 0 ?
                (
                  <div className='UserMadeClubNoneArea'>
                    <p>현재 개설한 <b>모임</b>이 없습니다.</p>
                  </div>

                ) : (
                  data.map((club) => {
                    return (
                      <div className='UserMadeClubBox' key={club.clubNo}>
                        <div className='UserMadeClubInfoBox'>
                          <div className='UserMadeClubImageBox'>
                            <img src={club.clubImage} alt="모임 사진" />
                          </div>
                          <div className='UserMadeClubInfo'>
                            <p className='UserMadeClubCategory'>{club.category}</p>
                            <p className='UserMadeClubTitle'>{club.clubName}</p>
                          </div>
                        </div>
                        <div className='UserMadeClubButtonArea'>
                          <img className='UserMadeClubBoardImg' src="/src/images/home.png" alt="모임 게시판 이미지" />
                          <img className='UserMadeClubExitImg' src="/src/images/settings.png" alt="모임 설정 이미지" />
                        </div>
                      </div>
                    )
                  }))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserMadeClub;