import '/src/css/admin/notice/NoticeWrite.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import instance from "/src/auth/axios";
import CustomQuill from '/src/common/CustomQuill';


const NoticeWrite = () => {
    const navi = useNavigate();
    const [content, setContent] = useState('');  //Quill 사용

    const [notice, setNotice] = useState({
        keyword: '',
        title: '',
        content: '',
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setNotice({
            ...notice,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        notice.content = content;
        e.preventDefault();
        instance.post('/api/notices/insert', notice)
            .then(() => {
                navi('/admin/notice');
            })
            .catch(error => {
                console.error("CREATE NOTICE ERROR", error);
            });
    };

    return (
        <div className="NoticeWrite">
            <form onSubmit={handleSubmit}>
                <div className="NwHeader">
                    <h2>▶ 공지사항 작성하기</h2>
                </div>
                <div className="NwTitle">
                    <table>
                        <tr>
                            {/* <td>제목</td> */}
                            <td>
                                <input className="NwTitleInput" type="text" name="keyword" value={notice.keyword} onChange={handelChange}
                                    placeholder="키워드 입력하세요" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="NwTitleInput" type="text" name="title" value={notice.title} onChange={handelChange}
                                    placeholder="제목을 입력하세요" />
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="NwMid">
                    <CustomQuill content={content} setContent={setContent} width={'100%'} height={'500'} />
                </div>
                <div className="NwFooter">
                    <button type="submit">등록</button>
                    <button onClick={() => { navi('/admin/notice') }}> 취소</button>
                </div>
            </form>
        </div>
    )
};

export default NoticeWrite;