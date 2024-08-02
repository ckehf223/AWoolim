import React, { useState, useEffect } from "react";
import "/src/css/chatroompage.css";

function ChatRoomPage({ room, onBack }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(room.messages);
  const [profileImages, setProfileImages] = useState({});

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "나",
        content: message,
        profileImage: "/path/to/my/profile.jpg", // 실제 프로필 이미지 경로로 변경
        nickname: "내 닉네임", // 실제 닉네임으로 변경
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    const uniqueSenders = [...new Set(messages.map((msg) => msg.sender))];

    uniqueSenders.forEach((sender) => {
      const image = new Image();
      image.src =
        messages.find((msg) => msg.sender === sender)?.profileImage || "";
      image.onload = () => {
        setProfileImages((prev) => ({ ...prev, [sender]: image.src }));
      };
    });
  }, [messages]);

  return (
    <div className="chat-room-page">
      <div className="chat-messages">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "나" ? "my-message" : "other-message"
              }`}
            >
              {msg.sender !== "나" && (
                <div className="profile-container">
                  {profileImages[msg.sender] ? (
                    <img
                      src={profileImages[msg.sender]}
                      alt={`${msg.sender} 프로필`}
                      className="profile-image"
                    />
                  ) : (
                    <div className="profile-placeholder"></div>
                  )}
                  <div className="message-content">
                    <span className="nickname">{msg.nickname}</span>
                  </div>
                </div>
              )}
              <p
                className={`content ${msg.sender === "나" ? "my-content" : ""}`}
              >
                {msg.content}
              </p>
            </div>
          ))}
        </div>
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
