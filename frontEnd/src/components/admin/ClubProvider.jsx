import React from "react";
import { createContext, useState, useEffect } from "react";
import instance from '/src/common/auth/axios'


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

  const deleteClub = async () => {
    try {
      await instance.delete(`/admin/club/${id}`);
      setClubs(clubs.filter(club => club.clubNo !== id));
    } catch (error) {
      console.error('Error deleting club: ', error);
    }
  };

  return (
    <ClubContext.Provider value={{ clubs, deleteClub }}>
      {children}
    </ClubContext.Provider>
  )

}

export { ClubContext, ClubProvider };