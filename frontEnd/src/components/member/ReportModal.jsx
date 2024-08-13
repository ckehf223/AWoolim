import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "/src/css/member/ReportModal.css";
import instance from "../../common/auth/axios";
const ReportModal = ({
  isOpen = false,
  toggle = () => {},
  title = "",
  targetId = "",
  targetName = "",
  userId = "",
  type = "",
}) => {
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleCancelClick = () => {
    setContent("");
    toggle();
  };

  const handleSendClick = async () => {
    if (content !== null && content !== "") {
      try {
        await instance.post(
          "http://localhost:8080/api/report/register",
          {
            userId: userId,
            targetId: targetId,
            content: content,
            type: type,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsSuccess(true);
      } catch (error) {
        console.error("report Error " + error);
      }
    }
  };
  return (
    <Modal className="ReportModal" isOpen={isOpen} toggle={toggle} centered>
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader className="ReportModalHeader">
            <span>{title}</span>
            <button
              className="ReportModalCloseButton"
              onClick={handleCancelClick}
            >
              X
            </button>
          </ModalHeader>
          <ModalBody className="ReportModalBody">
            <div className="ReportModalTargetIdArea">
              <span>신고대상 : </span>
              <span className="ReportTargetId">{targetName}</span>
            </div>
            <div className="ReportModalContentArea">
              <p className="ReportModalContentAreaTitle">내용 작성</p>
              <input
                type="text"
                value={content}
                onChange={onChangeContent}
                placeholder="내용 입력을 입력하세요"
                readOnly={isSuccess}
              />
              <p className="ReportModalWarningMessage">
                허위 신고시 제제 대상이 될 수 있습니다.
              </p>
            </div>
            {!isSuccess ? (
              <div className="ReportModalSendButtonArea">
                <button
                  className="ReportModalSendButton"
                  onClick={handleSendClick}
                >
                  신고
                </button>
              </div>
            ) : (
              <p className="ReportModalSuccessMessage">
                신고가 완료되었습니다.
              </p>
            )}
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
