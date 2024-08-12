import React, { useState, useEffect, useRef } from "react";
import "/src/css/member/chatroompage.css";

const SOCKET_URL = "ws://localhost:8080/ws/chat";

function ChatRoomPage({ room, onBack, profile }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const userId = profile?.userId;

    if (!userId) {
      console.error("User ID not found");
      alert("User ID를 찾을 수 없습니다. 다시 로그인하세요.");
      return;
    }

    // WebSocket 연결 설정
    socketRef.current = new WebSocket(SOCKET_URL);

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // WebSocket 연결을 유지하도록 설정
    socketRef.current.onclose = (event) => {
      console.log(
        `WebSocket connection closed: ${event.code}, reason: ${event.reason}`
      );
    };

    // 메시지 초기 로딩
    fetchMessages();

    // 뒤로가기 버튼이나 종료 버튼에서만 WebSocket 연결을 닫도록 설정
    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }
    };
  }, [room.clubNo, profile]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/chat/${room.clubNo}/messages`
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && profile?.userId !== null) {
      const chatMessage = {
        userId: profile.userId,
        message: message,
        clubNo: room.clubNo,
      };

      socketRef.current.send(JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-room-page">
      <div className="chat-messages" ref={messageListRef}>
        <div className="message-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.userId === profile.userId ? "my-message" : "other-message"
              }`}
            >
              {msg.userId !== profile.userId && (
                <div className="message-info">
                  <img
                    className="profile-image"
                    src={
                      msg.profileImage || "/path/to/default/profile/image.png"
                    }
                    alt="프로필"
                  />
                  <span className="nickname">{msg.nickname}</span>
                </div>
              )}
              <p>{msg.message}</p>
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChatRoomPage;
