import '/src/css/admin/NoticeWrite.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomQuill from "/src/common/CustomQuill";

const NoticeReWrite = () => {
    const { noticeNo } = useParams();
    const navi = useNavigate();
    const [notice, setNotice] = useState({
        keyword: '',
        title: '',
        content: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/notices/read/${noticeNo}`)
            .then(reponse => {
                setNotice(reponse.data);
            })
            .catch(error => console.log("Notice Fetching 실패", error));
    }, [noticeNo]);

    const handelChange = (e) => {
        const { name, value } = e.target;
        setNotice({
            ...notice,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        notice.content = content;
        axios.put(`http://localhost:8080/admin/notices/update/${noticeNo}`, notice)
            .then(() => {
                navi(`/admin/noticeRead/${noticeNo}`);
            })
            .catch(
                error => {
                    console.error("Update Notice error", error);
                });
    };

    //Quill 활용
    const [content, setContent] = useState(notice.content);
    useEffect(() => {
        setContent(notice.content);
    }, [notice.content]);

    return (
        <div className="NoticeWrite">
            <form onSubmit={handleSubmit}>
                <div className="NwHeader">
                    <h2>▶ 공지사항 수정하기</h2>
                </div>
                <div className="NwTitle">
                    <table>
                        <tr>
                            <td><input className="NwTitleInput" type="text" name='keyword' value={notice.keyword} onChange={handelChange} /></td>
                        </tr>
                        <tr>
                            <td><input className="NwTitleInput" type="text" name='title' value={notice.title} onChange={handelChange} /></td>
                        </tr>
                    </table>
                </div>

                <div className="NwMid">
                    {/* Quill활용 */}
                    <CustomQuill content={content} setContent={setContent} width={'950'} height={'300'} />
                </div>
                <div className="NwFooter">
                    <button type="submit">작성</button>
                    <button onClick={() => { navi(`/admin/noticeRead/${noticeNo}`) }}> 취소</button>
                </div>
            </form>
        </div>
    )
};

export default NoticeReWrite;