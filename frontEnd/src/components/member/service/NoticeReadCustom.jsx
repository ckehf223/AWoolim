import '/src/css/member/service/NoticeReadCustom.css'
import instance from "/src/auth/axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';          //Quill데이터 가져오기
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const NoticeReadCustom = () => {

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

    return (
        <div className="NoticeReadCustom">
            <div className="NrHeader">
                <div className="NoticeCustom_Header">
                    <h1><FontAwesomeIcon icon={faBullhorn} /> 공지사항</h1>
                </div>
            </div>

            <div >
                <div className="NrTitle">
                    <span className='Nt1'>[{notice.keyword}]</span>
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
                <button onClick={() => { return navi('/service/notice') }}><FontAwesomeIcon icon={faList} />&nbsp;목록</button>
            </div>
        </div>
    )
};

export default NoticeReadCustom;