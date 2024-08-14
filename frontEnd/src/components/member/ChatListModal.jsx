import React, { useState, useEffect } from "react";
import "/src/css/member/chatlistmodal.css";
import ChatRoomPage from "/src/components/member/ChatRoomPage";
import instance from "/src/common/auth/axios";

function ChatListModal({ onClose }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await instance.get("/api/chat/chatrooms", {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error("채팅방 데이터 가져오기 오류:", error);
      }
    };
    fetchChatRooms();
  }, [onClose])


  const openChatRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="chatlistmodal-chat-list-modal">
      <div className="chatlistmodal-modal-header">
        {selectedRoom ? (
          <button onClick={() => setSelectedRoom(null)}>{"<"}</button>
        ) : (
          <img src="/src/assets/images/headerLogo.png" alt="로고" />
        )}
        <span>{selectedRoom ? selectedRoom.name : "채팅 목록"}</span>
        <button
          onClick={() => {
            onClose();
          }}
        >
          X
        </button>
      </div>
      <div className="chatlistmodal-chat-list">
        {selectedRoom ? (
          <ChatRoomPage
            room={selectedRoom}
            onBack={() => setSelectedRoom(null)}
          />
        ) : (
          <div className="chatlistmodal-room-list">
            {chatRooms.length > 0 ? (
              chatRooms.map((room, index) => (
                <div
                  key={room.chatRoomNo || index}
                  className="chatlistmodal-room-item"
                  onClick={() => openChatRoom(room)}
                >
                  {room.chatRoomName}
                </div>
              ))
            ) : (
              <p>채팅방이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListModal;
