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
        {
          sender: "철수",
          content: "aa11",
          profileImage: "./src/images/adjust.png",
          nickname: "근육맨",
        },
        {
          sender: "나",
          content: "bb22",
          profileImage: "./src/images/bell.png",
          nickname: "나",
        },
        {
          sender: "철수",
          content: "aa33",
          profileImage: "/images/profile1.jpg",
          nickname: "근육맨",
        },
        {
          sender: "나",
          content: "bb44",
          profileImage: "/images/my_profile.jpg",
          nickname: "나",
        },
        {
          sender: "철수",
          content: "오늘 운동 어때?",
          profileImage: "/images/profile1.jpg",
          nickname: "근육맨",
        },
        {
          sender: "나",
          content: "좋아! 헬스장에서 보자!",
          profileImage: "/images/my_profile.jpg",
          nickname: "나",
        },
      ],
    },
    {
      id: 2,
      name: "독서",
      messages: [
        {
          sender: "영희",
          content: "aa11",
          profileImage: "./src/images/bell.png",
          nickname: "책벌레",
        },
        {
          sender: "민수",
          content: "bb22",
          profileImage: "/images/profile3.jpg",
          nickname: "독서광",
        },
        {
          sender: "영희",
          content: "aa33",
          profileImage: "/images/profile2.jpg",
          nickname: "책벌레",
        },
        {
          sender: "민수",
          content: "bb44",
          profileImage: "/images/profile3.jpg",
          nickname: "독서광",
        },
        {
          sender: "영희",
          content: "새로 나온 소설 읽었어?",
          profileImage: "/images/profile2.jpg",
          nickname: "책벌레",
        },
        {
          sender: "민수",
          content: "아니, 아직 못 읽었는데 추천해줘!",
          profileImage: "/images/profile3.jpg",
          nickname: "독서광",
        },
      ],
    },
    {
      id: 3,
      name: "스터디",
      messages: [
        {
          sender: "지혜",
          content: "aa11",
          profileImage: "/images/profile4.jpg",
          nickname: "스터디퀸",
        },
        {
          sender: "현우",
          content: "bb22",
          profileImage: "/images/profile5.jpg",
          nickname: "스터디왕",
        },
        {
          sender: "지혜",
          content: "aa33",
          profileImage: "/images/profile4.jpg",
          nickname: "스터디퀸",
        },
        {
          sender: "현우",
          content: "bb44",
          profileImage: "/images/profile5.jpg",
          nickname: "스터디왕",
        },
        {
          sender: "지혜",
          content: "주말에 스터디 모임 할까?",
          profileImage: "/images/profile4.jpg",
          nickname: "스터디퀸",
        },
        {
          sender: "현우",
          content: "좋은 생각이야! 시간은 어때?",
          profileImage: "/images/profile5.jpg",
          nickname: "스터디왕",
        },
      ],
    },
    {
      // 새로운 채팅방 추가
      id: 4,
      name: "맛집 탐방",
      messages: [
        {
          sender: "미식가",
          content: "어제 그 맛집 진짜 맛있더라!",
          profileImage: "/images/profile6.jpg",
          nickname: "미식가",
        },
        {
          sender: "나",
          content: "나도 가봤는데 완전 인정!",
          profileImage: "/images/my_profile.jpg",
          nickname: "나",
        },
      ],
    },
    {
      // 새로운 채팅방 추가
      id: 5,
      name: "여행 계획",
      messages: [
        {
          sender: "여행자",
          content: "다음 여행지는 어디로 갈까?",
          profileImage: "/images/profile7.jpg",
          nickname: "여행자",
        },
        {
          sender: "나",
          content: "난 제주도 어때?",
          profileImage: "/images/my_profile.jpg",
          nickname: "나",
        },
      ],
    },
  ];

  const openChatRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="chat-list-modal">
      <div className="modal-header">
        {selectedRoom ? ( // selectedRoom이 null이 아니면 (채팅방이 선택된 경우)
          <button onClick={() => setSelectedRoom(null)}>{"<"}</button> // "<" 버튼 표시
        ) : (
          <img src="./src/images/headerLogo.png" alt="" /> // 로고 표시
        )}
        <span>{selectedRoom ? selectedRoom.name : "채팅 목록"}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-list">
        {selectedRoom ? (
          <ChatRoomPage room={selectedRoom} onBack={onClose} /> // onBack에 onClose 전달
        ) : (
          <div className="room-list">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                className="room-item"
                onClick={() => openChatRoom(room)}
              >
                {room.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListModal;
