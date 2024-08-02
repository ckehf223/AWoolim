import { useState } from 'react';
import './UserMadeClub.css'
import { useNavigate } from 'react-router-dom';
const myClubData = [
  {
    clubNo: 1,
    category: '모집중',
    clubName: '오늘 다같이 미쳐보자',
    clubImage: '/src/images/frankenstein.webp',
  },
  {
    clubNo: 2,
    category: '모집마감',
    clubName: '오늘 다같이 죽어보자',
    clubImage: '/src/images/image.png',
  },
  {
    clubNo: 3,
    category: '모집마감',
    clubName: '오늘 다같이 이겨보자',
    clubImage: '/src/images/image.png',
  },
];
const UserMadeClub = () => {
  const [data, setData] = useState(myClubData);
  const nav = useNavigate();
  return (
    <>
      <div className='UserMadeClub'>
        <div className='UserMadeClubWrap'>
          <div className='UserMadeClubContentBorder'>
            <div className='UserMadeClubTitle'>
              <h4>내 모임</h4>
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
                          <div className='UserMadeClubMgBox'>
                            <div className='UserMadeClubInfo'>
                              <p className='UserMadeClubCategory'>인원</p>
                              <p className='UserMadeClubTitle'>13 명</p>
                            </div>
                            <div className='UserMadeClubInfo'>
                              <p className='UserMadeClubCategory'>신청</p>
                              <p className='UserMadeClubTitle'>3 건</p>
                            </div>
                          </div>
                        </div>
                        <div className='UserMadeClubButtonArea'>
                          <img className='UserMadeClubBoardImg' src="/src/images/home.png" alt="모임 게시판 이미지" />
                          <img className='UserMadeClubExitImg' src="/src/images/settings.png" alt="모임 설정 이미지" onClick={() => { nav('/mypage/clubmanager/modify') }} />
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