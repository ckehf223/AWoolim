import '/src/css/admin/FaqWrite.css'
import instance from '/src/common/auth/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const FaqReWrite = () => {
    const navi = useNavigate();
    const { questionNo } = useParams();
    const [question, setQuestion] = useState({
        category: '',
        title: '',
        answer: '',
    });

    useEffect(() => {
        instance.get(`http://localhost:8080/admin/faq/read/${questionNo}`)
            .then(response => {
                setQuestion(response.data)
            })
            .catch(error => console.log("QUESTION FETCHING ERROR", error));
    }, [questionNo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion({
            ...question,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        instance.post(`http://localhost:8080/admin/faq/update/${questionNo}`, question)
            .then(() => {
                navi(`/admin/faq`);
            })
            .catch(error => console.log("UPDATE QUESTION ERROR", error));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        instance.post(`http://localhost:8080/admin/faq/delete/${questionNo}`, question)
            .then(() => {
                alert("삭제 성공");
                navi(`/admin/faq`);
            })
            .catch(error => console.log("DELETE QUESTION ERROR", error));
    }



    return (
        <div className="FaqWrite">
            <form onSubmit={handleSubmit}>
                <div className="FwHeader">
                    <h3><img src="/src/assets/images/faqSmall.png" alt="" /> 자주하는 질문 수정</h3>
                </div>
                <hr />

                <div className="fwCategory">
                    <h4>☞ 카테고리 입력</h4>
                    <input name='category' id="category" value={question.category} onChange={handleChange} />
                </div>

                <div className="fwQuestion">
                    <h4>☞ 질문을 입력하세요</h4>
                    <textarea name="title" id="title" value={question.title} onChange={handleChange} maxLength={"1000px"} rows={"10"} />
                </div>

                <div className="fwAnswer">
                    <h4>☞ 답변을 입력하세요</h4>
                    <textarea name="answer" id="answer" value={question.answer} onChange={handleChange} maxLength={"1000px"} rows={"10"} />
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