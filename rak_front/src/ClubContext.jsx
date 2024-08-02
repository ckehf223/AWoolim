import React from "react";
import { createContext, useState } from "react";
import update from "immutability-helper";


const ClubContext = createContext();

const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([
    { id: 1, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 2, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 3, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 4, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 5, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 6, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 7, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 8, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 9, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 10, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 11, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 12, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 13, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 14, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 15, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 16, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 17, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 18, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 19, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 20, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 21, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
    { id: 22, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 23, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 24, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['최성락', '이석진', '정우경'], category: '운동', people: 30, date: '2024-07-27', regular: '정기' },
  ]);

  const deleteClub = (id) => {
    const clubIndex = clubs.findIndex(club => club.id === id);
    if (clubIndex !== -1) {
      const updatedClubs = update(clubs, { $splice: [[clubIndex, 1]] });
      setClubs(updatedClubs);
    }
  }

  return (
    <ClubContext.Provider value={{ clubs, deleteClub }}>
      {children}
    </ClubContext.Provider>
  )

}

export { ClubContext, ClubProvider };