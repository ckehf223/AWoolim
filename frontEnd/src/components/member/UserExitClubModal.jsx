import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import '/src/css/member/UserExitClubModal.css'
import instance from '/src/common/auth/axios';
const UserExitClubModal = ({
  isOpen = false,
  toggle = () => { },
  title = '',
  clubNo = '',
  clubTitle = ''
}
) => {
  const [message, setMessage] = useState();
  const handleSendClick = async () => {
    if (message === '확인하였습니다') {
      try {
        await instance.post(`http://localhost:8080/api/club/exitClub/${clubNo}`,
          {
            headers: { 'Content-Type': 'application/json' }
          })
        alert('모임 탈퇴,취소가 완료되었습니다.');
        setMessage('');
        toggle();
        window.location.reload();
      } catch (error) {
        console.error("모임 탈퇴,취소 처리중 오류발생" + error);
      }
    }
  };

  console.log(clubNo);
  const handleCancelClick = () => {
    setMessage('');
    toggle();
  };

  return (

    <Modal className='ExitModal' isOpen={isOpen} toggle={toggle} centered>
      <div className="ExitModal-dialog">
        <div className="ExitModal-content">
          <ModalHeader className='ExitModalHeader'>
            <b>{title}</b>
            <Button className='ExitModalCloseButton' onClick={handleCancelClick}>✖</Button>
          </ModalHeader>
          <ModalBody className='ExitModalBody'>
            <div>
              <p><b>모임명 </b>: {clubTitle}</p>
            </div>
            <div className='ExitModalInputBox'>
              <p>*모임 탈퇴,취소를 원하시면 <b>`확인하였습니다` </b></p>
              <p> 입력 후 전송버튼을 눌러주세요</p>
              <input placeholder='문구를 입력하세요!' value={message} onChange={(e) => { setMessage(e.target.value) }} />
            </div>
            <div className='ExitModalSendButtonArea'>
              <button className='ExitModalSendButton' onClick={handleSendClick}>나가기</button>
              <p>* 모임 탈퇴,취소 후 다시 되돌릴 수 없습니다.</p>
            </div>
          </ModalBody>
        </div>
      </div>
    </Modal >
  )
}

export default UserExitClubModal
