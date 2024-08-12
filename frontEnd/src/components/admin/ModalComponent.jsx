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
      </ModalBody>

      <ModalFooter>
        {onDelete && <Button outline color='danger' onClick={onDelete}>삭제</Button>}
        <Button outline color='secondary' onClick={toggle}>✖</Button>
        {inputVisible && <Button outline color='primary' onClick={() => onSend(handleSend)}>전송</Button>}
      </ModalFooter>
    </Modal >
  )
}

export default ModalComponent