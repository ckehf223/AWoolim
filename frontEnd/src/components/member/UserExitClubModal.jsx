import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import './UserExitClubModal.css'
const UserExitClubModal = ({
  isOpen = false,
  toggle = () => { },
  title = '',
}
) => {
  const handleCancelClick = () => {
    toggle();
  };

  const handleSendClick = () => {
    toggle();
  };

  return (

    <Modal className='ExitModal' isOpen={isOpen} toggle={toggle} >
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader className='ExitModalHeader'>
            <b>{title}</b>
            <Button className='ExitModalCloseButton' onClick={handleCancelClick}>✖</Button>
          </ModalHeader>
          <ModalBody className='ExitModalBody'>
            <div className='ExitModalSendButtonArea'>
              <button className='ExitModalSendButton' onClick={handleSendClick}>나가기</button>
              <p>* 모임 탈퇴 후 다시 되돌릴 수 없습니다.</p>
            </div>
          </ModalBody>
        </div>
      </div>
    </Modal >
  )
}

export default UserExitClubModal
