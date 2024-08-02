import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import './ReportModal.css'
const ReportModal = ({ isOpen = false,
  toggle = () => { },
  title = '',
  targetId = '',
}
) => {
  const [content, setContent] = useState('');
  const onChangeContent = (e) => {
    setContent(e.target.value);
  }
  const handleCancelClick = () => {
    setContent('');
    toggle();
  };

  const handleSendClick = () => {
    toggle();
  };

  return (

    <Modal className='ReportModal' isOpen={isOpen} toggle={toggle} centered>
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader className='ReportModalHeader'>
            <b>{title}</b>
            <Button className='ReportModalCloseButton' onClick={handleCancelClick}>✖</Button>
          </ModalHeader>
          <ModalBody className='ReportModalBody'>
            <div className='ReportModalTargetIdArea'>
              <b>신고대상</b>
              <span className='ReportTargetId'>{targetId}</span>
            </div>
            <div className='ReportModalContentArea'>
              <p>내용 작성</p>
              <input type="text" value={content} onChange={onChangeContent} />
            </div>
            <div className='ReportModalSendButtonArea'>
              <button className='ReportModalSendButton' onClick={handleSendClick}>전송</button>
            </div>
          </ModalBody>
        </div>
      </div>
    </Modal >
  )
}

export default ReportModal
