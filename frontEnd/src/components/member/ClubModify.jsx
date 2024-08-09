import { useEffect, useMemo, useState } from 'react';
import '/src/css/member/ClubModify.css'
import CustomQuill from '/src/common/CustomQuill';
import { Button } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom';
import instance from '/src/common/auth/axios';


const ClubModify = () => {
  const param = useParams();
  const nav = useNavigate();
  const [clubData, setClubData] = useState('');
  const [clubTitle, setClubTitle] = useState('')
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [maxMember, setMaxMember] = useState('')
  const [clubGender, setClubGender] = useState('')
  const [ageLimit, setAgeLimit] = useState('');
  const [regularyType, setRegularyType] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [fileInput, setFileInput] = useState('');
  const [imageSrc, setImageSrc] = useState(``);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');


  useEffect(() => {
    const clubData = async () => {
      try {
        const response = await instance.get(`http://localhost:8080/api/club/modify/${param.no}`, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        setClubData(response.data);
        setCategory(response.data.category);
        setAgeLimit(response.data.ageLimit);
        setClubGender(response.data.clubGender);
        setMaxMember(response.data.maxMember);
        setClubTitle(response.data.clubTitle);
        setRegularyType(response.data.regularType);
        setMessage(response.data.regularType === 0 ? '만나는 날' : '모임 주기');
        setType(response.data.regularType === 0 ? 'date' : 'text');
        setDayValue(response.data.dday);
        setSelectedButton(response.data.regularType);
        setImageSrc('data:image/jpeg;base64,' + response.data.clubImage);
        setSelectedCity(response.data.city);
        setSelectedDistrict(response.data.district);
        setContent(response.data.detailInfo);
        console.log(response.data);
      } catch (error) {
        console.error("클럽 정보 로딩 중 오류", error);
      }
    };
    clubData();
  }, [param]);

  //react-quill 라이브러리 사용
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
    };
  }, []);

  const areaData = [
    {
      city: '서울',
      data: ['전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구',
        '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구',
        '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구',
        '용산구', '은평구', '종로구', '중구', '중랑구']
    },
    {
      city: '부산광역시',
      data: ['전체', '강서구', '금정구', '기장군', '남구', '동구', '동래구',
        '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구',
        '영도구', '중구', '해운대구']
    },
    {
      city: '대구광역시',
      data: ['전체', '남구', '달서구', '달성군', '동구', '북구', '서구',
        '수성구', '중구']
    },
    {
      city: '인천광역시',
      data: ['전체', '강화군', '계양구', '남동구', '동구', '미추홀구', '부평구',
        '서구', '연수구', '웅진군', '중구']
    },
    {
      city: '광주광역시',
      data: ['전체', '광산구', '남구', '동구', '북구', '서구']
    },
    {
      city: '대전광역시',
      data: ['전체', '대덕구', '동구', '서구', '유성구', '중구',]
    },
    {
      city: '울산광역시',
      data: ['전체', '남구', '동구', '북구', '을주군', '중구',]
    },
    {
      city: '경기도',
      data: ['전체', '가평군', '고양시', '과천시', '광명시', '광주시', '구리시',
        '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시',
        '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시',
        '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시',
        '포천시', '하남시', '화성시']
    },
    {
      city: '강원도',
      data: ['전체', '강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군',
        '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시',
        '태백시', '평창군', '홍천군', '화천군', '횡성군']
    },
    {
      city: '충청북도',
      data: ['전체', '괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군',
        '제천시', '증평군', '진천군', '청주시', '충주시']
    },
    {
      city: '충청남도',
      data: ['전체', '계룡시', '공주시', '금산군', '논산시', '당진시', '보령시',
        '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시',
        '청양군', '태안군', '홍성군',]
    },
    {
      city: '경상북도',
      data: ['전체', '경산시', '경주시', '고령군', '구미시', '군위군', '김천시',
        '문경시', '봉화군', '상주시', '상주군', '안동시', '영덕군', '영양군', '영주시',
        '영천시', '예천군', '울릉군', '을진군', '의성군', '청도군', '청송군', '칠곡군', '포항시']
    },
    {
      city: '경상남도',
      data: ['전체', '거제시', '거창군', '고성군', '김해시', '남해군', '밀양시',
        '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시',
        '통영시', '하동군', '함안군', '함양군', '합천군']
    },
    {
      city: '전라북도',
      data: ['전체', '고창군', '군산시', '김제시', '남원시', '무주군', '부안군',
        '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군']
    },
    {
      city: '전라남도',
      data: ['전체', '강진군', '고흥군', '곡성군', '광양시', '구례군',
        '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군',
        '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군',
        '진도군', '함평군', '해남군', '화순군']
    },
    {
      city: '제주특별자치도',
      data: ['전체', '서귀포시', '제주시']
    }
  ]

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedDistrict('');
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  const getDistricts = (city) => {
    const selectedArea = areaData.find(area => area.city === city);
    return selectedArea ? selectedArea.data : [];
  };

  const changeMaxPerson = (e) => {
    const regex = /^\d*$/;
    if (regex.test(e.target.value)) {
      setMaxMember(e.target.value);
    }
  }

  //이미지 미리보기 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      setFileInput(file.name);
      reader.readAsDataURL(file);
    }
  };


  //input값 업데이트
  const onSetInput = function (e) {
    setDayValue(e.target.value);
  };

  const handleClick = (buttonId) => {
    setSelectedButton(buttonId);
    setRegularyType(buttonId);
    if (buttonId === 0) {
      setType('date');
      setMessage('만나는 날');
      setDayValue('');
    } else {
      setType('text');
      setMessage('모임 주기');
      setDayValue('');
    }
  };

  const onRegisterClub = () => {
    if (dayValue === '' || regularyType === '' || selectedButton === '' || selectedCity === ''
      || clubTitle === '' || !category === '' || ageLimit === '' || maxMember === '') {
      alert('모임명,카테고리,모임주기,정원,모집 나이,지역은 필수입력 사항입니다.');
    } else {
      try {
        const formData = new FormData();
        formData.append('clubNo', clubData.clubNo);
        formData.append('clubTitle', clubTitle);
        formData.append('clubGender', clubGender);
        formData.append('category', category);
        formData.append('city', selectedCity);
        formData.append('ageLimit', ageLimit);
        formData.append('regularType', regularyType);
        formData.append('maxMember', maxMember);
        formData.append('dDay', dayValue);
        formData.append('detailInfo', content);
        formData.append('clubImage', file);
        if (selectedDistrict === '') {
          formData.append('district', '전체');
        } else {
          formData.append('district', selectedDistrict);
        }
        if (imageSrc !== '' && imageSrc.split('base64,')[1] !== clubData.clubImage) {
          formData.append('checkImage', '1');
        } else {
          formData.append('checkImage', '0');
        }

        instance.post('/api/club/modify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          alert('모임수정이 완료되었습니다.');
          window.location.reload();
        }).catch(error => {
          console.log(error);
          alert('모임 수정 요청 중 오류가 발생하였습니다 \n 잠시 후 다시 시도해주세요');
        })
      } catch (error) {
        console.log(error);
        alert('모임 수정 요청 중 오류가 발생하였습니다 \n 잠시 후 다시 시도해주세요');
      }
    }
  }



  const buttonStyles = {
    default: { backgroundColor: 'white', color: 'black' },
    selected: { backgroundColor: 'black', color: 'white' },
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
          <div className="ClubModify">
            <div className="ClubModifyWrap">
              <div className="ClubModifyTopArea">
                <div className="ClubModifyTopBox">
                  <div className="ClubModifyfileBox">
                    <h5><b>모임 프로필 사진</b></h5>
                    <div className="ClubModifyPreview">
                      <img src={imageSrc} alt="미리보기" />
                    </div>
                    <input className="ClubModifyupload-name" value={fileInput} onChange={handleImageChange} placeholder="첨부파일" readOnly />
                    <label htmlFor="imageUpload">파일찾기</label>
                    <input type="file" id="imageUpload" accept=".jpg, .jpeg, .png, .gif, .webp" onChange={handleImageChange} />
                  </div>
                  <div className="ClubModifyNcBox">
                    <div className="ClubModifyStateBox">
                      <label htmlFor="ClubState">모집 상태</label>
                      <select type="text" name="ClubState" id="ClubState" >
                        <option value={1}>모집 중</option>
                        <option value={0}>모집 마감</option>
                      </select>
                    </div>
                    <div className="ClubModifyNameBox">
                      <label htmlFor="ClubName">모임명</label>
                      <input type="text" name="ClubName" id="ClubName" value={clubTitle} onChange={(e) => { setClubTitle(e.target.value) }} />
                    </div>
                    <div className="ClubModifyCategoryBox">
                      <label htmlFor="ClubModifyCategory">카테고리</label>
                      <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option value={""}>선택하세요</option>
                        <option value="친목">친목</option>
                        <option value="독서">독서</option>
                        <option value="전시">전시</option>
                        <option value="스포츠">스포츠</option>
                        <option value="스터디">스터디</option>
                        <option value="맛집탐방">맛집탐방</option>
                        <option value="취미활동">취미활동</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="ClubModifyChoiceArea">
                  <div className="ClubModifyChoice">
                    <button className="daySelect" style={selectedButton === 0 ? buttonStyles.selected : buttonStyles.default} onClick={() => { handleClick(0) }}>일회성</button>
                    <button className="daySelect" style={selectedButton === 1 ? buttonStyles.selected : buttonStyles.default} onClick={() => { handleClick(1) }}>정기모임</button>
                  </div>

                  <div className="ClubModifyChoiceSection">
                    <div className="ClubModifyChoiceBoxArea">
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="">{message}</label>
                        <input type={type} name="regularyType" value={dayValue} onChange={onSetInput} />
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="MaxPerson">정원</label>
                        <input type="text" name="MaxPerson" id="MaxPerson" value={maxMember} onChange={changeMaxPerson} />
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="ClubGender">모집 성별</label>
                        <select name="ClubGender" id="ClubGender" value={clubGender} onChange={(e) => { setClubGender(e.target.value) }}>
                          <option defaultValue="제한없음" defaultChecked>제한없음</option>
                          <option value="M">남자만</option>
                          <option value="F">여자만</option>
                        </select>
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="">모집 나이</label>
                        <input type="text" value={ageLimit} onChange={(e) => { setAgeLimit(e.target.value) }} />
                      </div>
                      <div className="ClubModifyChoiceBox">
                        <label htmlFor="">지역</label>
                        <input type="text" readOnly value={selectedCity + " " + selectedDistrict} />
                      </div>
                    </div>
                    <div className="ClubModifyVenueBox">
                      <h3>지역 선택</h3>
                      <div className="ClubModifyVenueChoice">
                        <div className="ClubModifyVenueChoiceLocal">
                          <ul>
                            {areaData.map((area, index) => (
                              <li key={index} onClick={() => handleCityClick(area.city)}>
                                {area.city}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="ClubModifyVenueChoiceCity">
                          <ul>
                            {getDistricts(selectedCity).map((district, index) => (
                              <li key={index} data-dis={district} onClick={() => handleDistrictClick(district)}>{district}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ClubModifySection">
                <h3>상세 정보</h3>
                <CustomQuill width={'900'} height={'300'} content={content} setContent={setContent} />
              </div>
              <div className="ClubModifyButtonArea">
                <button className="modifyButton" onClick={() => { onRegisterClub() }}>수정</button>
              </div>
            </div>
          </div >
        </div>
      </div>
    </>
  )
}

export default ClubModify