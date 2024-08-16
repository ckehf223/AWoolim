import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import '/src/css/member/modal/UserExitClubModal.css'
import instance from '/src/auth/axios';

const WithdrawalModal = ({
  isOpen = false,
  toggle = () => { },
  title = '',
  userName = '',
  targetId = '',
  clubNo = ''
}) => {
  const handleCancelClick = () => {
    toggle();
  };

  const handleSendClick = async () => {

    try {
      await instance.post(`http://localhost:8080/api/club/exitClubMember`,
        {
          userId: targetId,
          clubNo: clubNo,
        }
        , {
          headers: { 'Content-Type': 'application/json' }
        })
      alert(`${userName}님을 퇴출하였습니다.`);
      toggle();
      window.location.reload();
    } catch (error) {
      console.error("모임멤버 퇴출 처리중 오류발생" + error);
    }

  };
  return (
    <>
      <Modal className='ExitModal' isOpen={isOpen} toggle={toggle} centered>
        <div className="ExitModal-dialog">
          <div className="ExitModal-content">
            <ModalHeader className='ExitModalHeader'>
              <b>{title}</b>
              <Button className='ExitModalCloseButton' onClick={handleCancelClick}>✖</Button>
            </ModalHeader>
            <ModalBody className='ExitModalBody'>
              <div>
                <p><b>모임 멤버 </b>: {userName}</p>
              </div>
              <div className='ExitModalInputBox'>
                <p><b>{`${userName}님을 해당 모임에서 퇴출 시키시겠습니까?`} </b></p>
              </div>
              <div className='ExitModalSendButtonArea'>
                <button className='ExitModalSendButton' onClick={() => { handleSendClick() }}>확인</button>
                <p>* 모임 퇴출 후 다시 되돌릴 수 없습니다.</p>
              </div>
            </ModalBody>
          </div>
        </div>
      </Modal >
    </>
  )
}

export default WithdrawalModal;