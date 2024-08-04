import React from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import '/src/css/member/UserProfileModal.css'
import useModal from '/src/common/useModal'
import ReportModal from '/src/components/member/ReportModal'
//내 아이디와 같으면 신고버튼 안보이게 하기
const UserProfileModal = ({
  isOpen = false,
  toggle = () => { },
  backgroundImage = '',
  profileImage = '',
  name = '',
  details = '',
}
) => {
  const { isModalOpen, toggleModal } = useModal();

  return (
    <Modal className='UserProfileModal' isOpen={isOpen} toggle={toggle} centered>
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader
            className='UserProfileModalHeader'
            style={{ backgroundImage: `url(/src/assets/images/${backgroundImage})` }}>
            <img className='UserProfileModalReportImage' src="/src/images/report4.png" alt="신고이미지" onClick={toggleModal} />
            <ReportModal
              isOpen={isModalOpen}
              toggle={toggleModal}
              title='신고하기'
              targetId={name} >
            </ReportModal>
            <Button className='UserProfileModalCloseButton' onClick={toggle} >✖</Button>
            <img src={`/src/assets/images/${profileImage}`} alt="Profile" className='UserProfileModalProfileImage' />
          </ModalHeader>
          <ModalBody className='UserProfileModalBody'>
            <div className='UserProfileModalProfileName'>{name}</div>
            <div className='UserProfileModalProfileDetails'>{details}</div>
          </ModalBody>
        </div>
      </div>
    </Modal>
  )
}

export default UserProfileModal