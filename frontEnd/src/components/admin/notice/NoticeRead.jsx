import '/src/css/admin/NoticeRead.css'
import instance from "/src/common/auth/axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import DOMPurify from 'dompurify';          //Quill데이터 가져오기
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faTrash, faList } from '@fortawesome/free-solid-svg-icons';
// import { NoticeContext } from './NoticeContext';

const NoticeRead = () => {

    const { noticeNo } = useParams();
    const navi = useNavigate();
    const [notice, setNotice] = useState({});

    useEffect(() => {
        instance.get(`/api/notices/read/${noticeNo}`)
            .then(response => {
                setNotice(response.data);
            })
            .catch(error => console.error("notice Fetching에 실패했습니다.", error))
    }, [noticeNo]);

    const handleEdit = () => {
        navi(`/admin/noticeReWrite/${noticeNo}`);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (isConfirmed) {
            instance.delete(`/api/notices/delete/${noticeNo}`, notice)
                .then(() => {
                    navi(`/admin/notice`);
                    window.alert("삭제 완료되었습니다.")
                })
                .catch(
                    error => {
                        console.error("Delete Notice error", error);
                    }
                )
        }
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
                <button onClick={handleEdit}><FontAwesomeIcon icon={faFilePen} />&nbsp;수정 </button>&nbsp;
                <button type="button" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} />&nbsp;삭제</button>&nbsp;
                <button onClick={() => { return navi('/admin/notice') }}><FontAwesomeIcon icon={faList} />&nbsp;목록</button>
            </div>
        </div>
    )
};

export default NoticeRead;