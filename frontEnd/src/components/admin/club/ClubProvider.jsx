import React from "react";
import { createContext, useState, useEffect } from "react";
import instance from '/src/auth/axios'


const ClubContext = createContext();

const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await instance.get('/admin/clublist');
        // 날짜 형식 변환 로직 추가
        const clubsWithFormattedDate = response.data.map(club => ({
          ...club,
          dDay: new Date(club.dDay).toLocaleDateString()
        }));
        setClubs(clubsWithFormattedDate);
      } catch (error) {
        console.error('Error fetching clubs : ', error);
      }
    }
    fetchClubs();
  }, []);

  return (
    <ClubContext.Provider value={{ clubs }}>
      {children}
    </ClubContext.Provider>
  )

}

export { ClubContext, ClubProvider };