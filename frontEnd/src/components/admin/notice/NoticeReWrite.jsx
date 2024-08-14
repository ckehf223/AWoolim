import '/src/css/admin/NoticeWrite.css'
import instance from "/src/common/auth/axios";
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
    const [content, setContent] = useState('');

    useEffect(() => {
        instance.get(`/api/notices/read/${noticeNo}`)
            .then(response => {
                setNotice(response.data);
                setContent(response.data.content);    //Quill 데이터 직접 적용 
                console.log(response.data);
            })
            .catch(error => console.log("NOTICE FETCHING ERROR", error));
    }, [noticeNo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice({
            ...notice,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        notice.content = content;
        instance.post(`/api/notices/update/${noticeNo}`, notice)
            .then(() => {
                navi(`/admin/noticeRead/${noticeNo}`);
            })
            .catch(
                error => {
                    console.error("Update Notice error", error);
                });
    };

    return (
        <div className="NoticeWrite">
            <form onSubmit={handleSubmit}>
                <div className="NwHeader">
                    <h2>▶ 공지사항 수정하기</h2>
                </div>
                <div className="NwTitle">
                    <table>
                        <tr>
                            <td><input className="NwTitleInput" type="text" name='keyword' value={notice.keyword} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><input className="NwTitleInput" type="text" name='title' value={notice.title} onChange={handleChange} /></td>
                        </tr>
                    </table>
                </div>

                <div className="NwMid">
                    {/* Quill활용 */}
                    <CustomQuill content={content} setContent={setContent} width={'1200'} height={'500'} />
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