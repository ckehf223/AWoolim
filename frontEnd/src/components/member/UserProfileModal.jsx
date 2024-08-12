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
          <ModalBody className='UserProfileModalHeader'
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            {(isAuthenticated && loginId !== userId) && <img className='UserProfileModalReportImage' src="/src/assets/images/report4.png" alt="신고이미지" onClick={toggleModal} />}
            <button className='UserProfileModalCloseButton' onClick={toggle} >✖</button>
            <div className='UserProfilModalInfoBox'>
              <img src={profileImage} alt="Profile" className='UserProfileModalProfileImage' />
              <div className='UserProfileModalBody'>
                <div className='UserProfileModalProfileName'>{name}</div>
                <div className='UserProfileModalProfileDetails'>{details}</div>
              </div>
            </div>
          </ModalBody>
        </div>
      </div>
      <ReportModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        title='신고하기'
        targetId={userId}
        targetName={name}
        userId={loginId}
        type={'user'}>
      </ReportModal>
    </Modal>
  )
}

export default UserProfileModal