import React, { useState } from "react";
import "/src/css/chatroompage.css";

function ChatRoomPage({ room, onBack }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // 메시지 전송 로직 추가 (예: WebSocket 또는 API 호출)
    setMessage("");
  };

  return (
    <div className="chat-room-page">
      <div className="chat-header">
        <button onClick={onBack}>&lt; 뒤로</button>
      </div>
      <div className="chat-messages">
        <ul>
          {room.messages.map((msg, index) => (
            <li key={index}>
              <b>{msg.sender}:</b> {msg.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChatRoomPage;
