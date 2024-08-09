import React from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import '/src/css/member/UserProfileModal.css'
import useModal from '/src/common/useModal'
import ReportModal from '/src/components/member/ReportModal'
import { useAuth } from '/src/common/AuthContext';
//내 아이디와 같으면 신고버튼 안보이게 하기
const UserProfileModal = ({
  isOpen = false,
  toggle = () => { },
  backgroundImage = '',
  profileImage = '',
  name = '',
  details = '',
  userId = '',
}
) => {
  const { isAuthenticated, loginId } = useAuth();
  const { isModalOpen, toggleModal } = useModal();

  return (
    <Modal className='UserProfileModal' isOpen={isOpen} toggle={toggle} centered>
      <div className="UserProfileModal-dialog">
        <div className="UserProfileModal-content">
          <ModalHeader
            className='UserProfileModalHeader'
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            {(isAuthenticated && loginId !== userId) && <img className='UserProfileModalReportImage' src="/src/assets/images/report4.png" alt="신고이미지" onClick={toggleModal} />}
            <ReportModal
              isOpen={isModalOpen}
              toggle={toggleModal}
              title='신고하기'
              targetId={userId}
              userId={loginId}
              targetName={name}
              type={'user'}>
            </ReportModal>
            <button className='UserProfileModalCloseButton' onClick={toggle} >✖</button>
            <img src={profileImage} alt="Profile" className='UserProfileModalProfileImage' />
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