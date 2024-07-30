import React, { useState } from "react";
import "/src/css/chatlistmodal.css";
import ChatRoomPage from "./ChatRoomPage";

function ChatListModal({ onClose }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const chatRooms = [
    {
      id: 1,
      name: "운동",
      messages: [
        { sender: "a", content: "aa11" },
        { sender: "b", content: "bb22" },
        { sender: "a", content: "aa33" },
        { sender: "b", content: "bb44" },
      ],
    },
    {
      id: 2,
      name: "독서",
      messages: [
        { sender: "a", content: "aa11" },
        { sender: "b", content: "bb22" },
        { sender: "a", content: "aa33" },
        { sender: "b", content: "bb44" },
      ],
    },
    {
      id: 3,
      name: "스터디",
      messages: [
        { sender: "a", content: "aa11" },
        { sender: "b", content: "bb22" },
        { sender: "a", content: "aa33" },
        { sender: "b", content: "bb44" },
      ],
    },
  ];

  const openChatRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="chat-list-modal">
      <div className="modal-header">
        <h2>{selectedRoom ? selectedRoom.name : "채팅 목록"}</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-list">
        {selectedRoom ? (
          <ChatRoomPage
            room={selectedRoom}
            onBack={() => setSelectedRoom(null)}
          />
        ) : (
          <ul>
            {chatRooms.map((room) => (
              <li key={room.id} onClick={() => openChatRoom(room)}>
                {room.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChatListModal;
