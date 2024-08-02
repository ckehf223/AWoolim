import './NoticeRead.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import DOMPurify from 'dompurify';          //Quill데이터 가져오기
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
// import { NoticeContext } from './NoticeContext';

const NoticeRead = () => {

    const { noticeNo } = useParams();
    const navi = useNavigate();
    const [notice, setNotice] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/notices/read/${noticeNo}`)
            .then(response => {
                setNotice(response.data);
            })
            .catch(error => console.error("notice Fetching에 실패했습니다.", error))
    }, [noticeNo]);

    const handleEdit = () => {
        navi(`/noticeReWrite/${noticeNo}`);
    }

    return (
        <div className="NoticeRead">
            <div className="NrHeader">
                <h1>공지사항</h1>
                <hr />
            </div>

            <div >
                <div className="NrTitle">
                    <span className='Nt1'>{notice.keyword}</span>
                    <span><h2>{notice.title}</h2></span>
                    <span>관리자  {new Date(notice.regDate).toLocaleDateString()}</span>
                </div>
                <hr />
                <div className="NrContents">
                    <p dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(notice.content),
                    }}>
                    </p>
                </div>
            </div>

            <hr />
            <div className="NrFooter">
                <button onClick={handleEdit}><FontAwesomeIcon icon={faFilePen} />&nbsp;&nbsp;수정하기 </button>&nbsp;
                <button onClick={() => { return navi('/') }}>목록</button>
            </div>
        </div>
    )
};

export default NoticeRead;