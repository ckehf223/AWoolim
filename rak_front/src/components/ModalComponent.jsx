import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const ModalComponent = ({ isOpen, toggle, title, children }) => {

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
        <Button color='secondary' onClick={toggle}>✖</Button>
      </ModalFooter>
    </Modal >
  )
}

export default ModalComponent