import React, { useState, useEffect } from "react";
import "/src/css/member/chatlistmodal.css";
import ChatRoomPage from "./ChatRoomPage";

function ChatListModal({ onClose, profile }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      onClose();
      return;
    }

    token = token.trim();
    if (!token.startsWith("Bearer ")) {
      token = `Bearer ${token}`;
    }

    const fetchChatRooms = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/chatrooms", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setChatRooms(data);
      } catch (error) {
        console.error("채팅방 데이터 가져오기 오류:", error);
      }
    };

    fetchChatRooms();
  }, [onClose]);

  const openChatRoom = (room) => {
    console.log("Opening chat room:", room);
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
            console.log("Modal close button clicked");
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
            profile={profile}
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
