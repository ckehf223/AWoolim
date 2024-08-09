import React, { useState, useEffect } from "react";
import "/src/css/member/chatlistmodal.css";
import ChatRoomPage from "./ChatRoomPage";

function ChatListModal({ onClose }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // 서버에서 채팅방 데이터를 가져오는 함수
    const fetchChatRooms = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/chatrooms");
        const data = await response.json();
        setChatRooms(data);
      } catch (error) {
        console.error("채팅방 데이터 가져오기 오류:", error);
      }
    };

    fetchChatRooms(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  const openChatRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="chat-list-modal">
      <div className="modal-header">
        {selectedRoom ? ( // selectedRoom이 null이 아니면 (채팅방이 선택된 경우)
          <button onClick={() => setSelectedRoom(null)}>{"<"}</button> // "<" 버튼 표시
        ) : (
          <img src="/src/assets/images/headerLogo.png" alt="로고" /> // 로고 표시
        )}
        <span>{selectedRoom ? selectedRoom.name : "채팅 목록"}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-list">
        {selectedRoom ? (
          <ChatRoomPage
            room={selectedRoom}
            onBack={() => setSelectedRoom(null)}
          /> // 채팅방 페이지로 이동
        ) : (
          <div className="room-list">
            {chatRooms.map((room, index) => (
              <div
                key={room.chatRoomNo || index}
                className="room-item"
                onClick={() => openChatRoom(room)}
              >
                {room.chatRoomName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListModal;
