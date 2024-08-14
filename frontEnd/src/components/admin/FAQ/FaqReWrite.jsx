import '/src/css/admin/FaqWrite.css'
import instance from '/src/common/auth/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import CustomQuill from '/src/common/CustomQuill';

const FaqReWrite = () => {
    const navi = useNavigate();
    const { questionNo } = useParams();
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        instance.get(`/api/faq/read/${questionNo}`)
            .then(response => {
                setAnswer(response.data.answer);
                setCategory(response.data.category);
                setTitle(response.data.title);
            })
            .catch(error => console.log("QUESTION FETCHING ERROR", error));
    }, [questionNo]);


    const handleSubmit = (e) => {
        const question = {
            category,
            title,
            answer
        }
        instance.post(`/api/faq/update/${questionNo}`, question)
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.log("UPDATE QUESTION ERROR", error));
    };


    const handleDelete = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

        if (isConfirmed) {
            const question = {
                category,
                title,
                answer
            }
            instance.post(`/api/faq/delete/${questionNo}`, question)
                .then(() => {
                    window.alert("삭제 완료되었습니다.");
                    window.location.reload();
                })
                .catch(error => console.log("DELETE QUESTION ERROR", error));
        }
    }



    return (
        <div className="FaqWrite">
            <form onSubmit={handleSubmit}>
                <div className="FwHeader">
                    <h3><img src="/src/assets/images/faqSmall.png" alt="" /> 자주하는 질문 수정</h3>
                </div>
                <hr />

                <div className="fwCategory">
                    <h5>☞ 카테고리 입력</h5>
                    <input name='category' id="category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                </div>

                <div className="fwQuestion">
                    <h5>☞ 질문을 입력하세요</h5>
                    <textarea name="title" id="title" value={title} onChange={(e) => { setTitle(e.target.value) }} maxLength={"1000px"} rows={"7"} />
                </div>

                <div className="fwAnswer">
                    <h5>☞ 답변을 입력하세요</h5>
                    <CustomQuill content={answer} setContent={setAnswer} width={'1160'} height={'200'} />
                    <hr />
                </div>

                <div className='fwBtn'>
                    <button type="submit">수정</button>
                    <button type="button" onClick={handleDelete}>삭제</button>
                    <button onClick={() => { navi('/admin/faq') }}> 취소</button>

                </div>
            </form>
        </div >
    )
};

export default FaqReWrite;