import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
const ModalComponent = ({ isOpen, toggle, title, children }) => {

  return (

    <Modal className='CustomModal1'
      isOpen={isOpen}
      toggle={toggle}

    >

      <ModalHeader className='CustomModalHeader1'>
        {title}
        <Button className='CustomModalCloseButton1' onClick={toggle}>✖</Button>
      </ModalHeader>

      <ModalBody className='CustomModalBody1'>
        {children}
      </ModalBody>


    </Modal >
  )
}

export default ModalComponent
