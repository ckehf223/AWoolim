import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { useState } from 'react'

const ModalComponent = ({ isOpen, toggle, title, children, onDelete, onSend, inputVisible }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
    toggle();
  }

  return (

    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
    >

      <ModalHeader>
        {title}
      </ModalHeader>

      <ModalBody>
        {children}
        {/* {
          inputVisible && (
            <Input
              type='textarea'
              placeholder='내용을 입력하세요'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></Input>
          )
        } */}
      </ModalBody>

      <ModalFooter>
        {onDelete && <Button outline color='danger' onClick={onDelete}>삭제</Button>}
        <Button outline color='secondary' onClick={toggle}>✖</Button>
        {inputVisible && <Button outline color='primary' onClick={() => onSend(message)}>전송</Button>}
      </ModalFooter>
    </Modal >
  )
}

export default ModalComponent