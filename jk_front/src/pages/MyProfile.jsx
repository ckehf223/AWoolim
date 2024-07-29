import { useState } from 'react';
import './MyProfile.css'

const MyProfile = () => {
  const [isNickNameEditing, setIsNickNameEditing] = useState(false);
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const [nickName, setNickName] = useState('마봉팔');
  const [introMg, setIntroMg] = useState('안녕하세요~');
  const [imageSrc, setImageSrc] = useState('/src/images/blank_image.png');
  const [backImageSrc, setBackImageSrc] = useState('');
  const [tempNickName, setTempNickName] = useState(nickName);
  const [tempIntroMg, setTempIntroMg] = useState(introMg);

  const onChangeNickNameInput = (e) => {
    setTempNickName(e.target.value);
  }

  const onChangeIntroMgInput = (e) => {
    setTempIntroMg(e.target.value);
  }

  const handleNickNameEditClick = () => {
    setIsNickNameEditing(true);
    setTempNickName(nickName);
  };

  const handleNickNameCancelClick = () => {
    setIsNickNameEditing(false);
    setTempNickName(nickName);
  };

  const handleNickNameSaveClick = () => {
    setIsNickNameEditing(false);
    setNickName(tempNickName);
  };

  const handleIntroEditClick = () => {
    setIsIntroEditing(true);
    setTempIntroMg(introMg);
  };

  const handleIntroCancelClick = () => {
    setIsIntroEditing(false);
    setTempIntroMg(introMg);
  };

  const handleIntroSaveClick = () => {
    setIsIntroEditing(false);
    setIntroMg(tempIntroMg);
  };
  const onDeleteImage = () => {
    setImageSrc('/src/images/blank_image.png');
  }
  const onBackDeleteImage = () => {
    setBackImageSrc('');
  }
  //이미지 미리보기 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc('/src/images/blank_image.png');
    }
  };
  //이미지 미리보기 
  const handleBackImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackImageSrc('');
    }
  };

  return (
    <>
      <div className="MyProfile">
        <div className="MyProfileHeader">
          <h2>프로필 관리</h2>
        </div>
        <div className="MyProfileInfoArea">
          <input type="file" id="MyProfileFile" name='MyProfileFile' accept=".jpg, .jpeg, .png, .gif, .webp" onChange={handleImageChange} />
          <input type="file" id="MyProfileBackFile" name='MyProfileBackFile' accept=".jpg, .jpeg, .png, .gif, .webp" onChange={handleBackImageChange} />
          <div className="MyProfileImageArea">
            <div className='MyProfileBackImage' style={{ backgroundImage: `url(${backImageSrc})` }}></div>
            <img src={imageSrc} alt="미리보기" />
            <div className='MyProfileIntroArea'>
              <div className='MyProfileNickName'>{nickName}</div>
              <div className='MyProfileIntroMg'>{introMg}</div>
            </div>
          </div>
          <div className="MyProfileImgEditor">
            <div className="MyProfileChangeButtonArea">
              <div>
                <label className="MyProfileChangeButton" htmlFor='MyProfileBackFile' >배경 이미지 변경</label>
                <button className="MyProfileDeleteButton" onClick={onBackDeleteImage}>삭제</button>
              </div>
              <div>
                <label className="MyProfileChangeButton" htmlFor='MyProfileFile' >프로필 이미지 변경</label>
                <button className="MyProfileDeleteButton" onClick={onDeleteImage}>삭제</button>
              </div>
            </div>
          </div>
        </div>
        <div className="MyProfileUpdateInfoArea">
          <h4>프로필 정보</h4>

          {!isNickNameEditing ? (
            <div className="MyProfileInfoGroup">
              <h5>닉네임</h5>
              <div className="MyProfileInfoBox">
                <div className="MyPageUnit_content">
                  <p>{nickName}</p>
                  <button onClick={handleNickNameEditClick}>변경</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="MyProfileModifyBox">
              <div className="MyProfileInputBox">
                <h6>닉네임</h6>
                <div className="MyProfileInputItem">
                  <input type="text" value={tempNickName} onChange={onChangeNickNameInput} />
                </div>
                <p>변경 후 30일이 지나야 다시 변경 가능하므로 신중히 변경해주세요.</p>
              </div>
              <div className="MyProfileInputButton">
                <button className="MyProfileCancelButton" onClick={handleNickNameCancelClick}>취소</button>
                <button className="MyProfileRegisterButton" onClick={handleNickNameSaveClick}>저장</button>
              </div>
            </div>
          )}

          {!isIntroEditing ? (
            <div className="MyProfileInfoGroup">
              <h5>상태메세지</h5>
              <div className="MyProfileInfoBox">
                <div className="MyPageUnit_content">
                  <p>{tempIntroMg}</p>
                  <button onClick={handleIntroEditClick}>변경</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="MyProfileModifyBox">
              <div className="MyProfileInputBox">
                <h6>상태메세지</h6>
                <div className="MyProfileInputItem">
                  <input type="text" value={tempIntroMg} onChange={onChangeIntroMgInput} />
                </div>
              </div>
              <div className="MyProfileInputButton">
                <button className="MyProfileCancelButton" onClick={handleIntroCancelClick}>취소</button>
                <button className="MyProfileRegisterButton" onClick={handleIntroSaveClick}>저장</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MyProfile