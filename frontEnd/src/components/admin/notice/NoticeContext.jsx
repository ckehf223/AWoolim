import React, { createContext, useState, useEffect } from 'react';
import Notice from '/src/components/admin/Notice';

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {



    const [noticeList, setNoticeList] = useState([]);

    function getList(url) {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setNoticeList(data)
            });
    }

    useEffect(() => {
        getList('http://localhost:8080/notice');
    }, []);

    const [notices, setNotices] = useState([]);


    const addNotice = (keyword, title, content) => {
        const newNotice = {
            noticeNo: notices.length + 1,
            keyword: keyword,
            title: title,
            content: content,
            count: 0,
            regDate: new Date().toISOString().split('T')[0]
        };
        setNotices([...notices, newNotice]);
    };

    const incrementCount = (noticeNo) => {
        setNotices(notices.map(notice =>
            notice.noticeNo === noticeNo ? { ...notice, count: notice.count + 1 } : notice
        ));
    };

    return (
        <NoticeContext.Provider value={{ notices, addNotice, incrementCount }}>
            {children}
        </NoticeContext.Provider>
    );
};
