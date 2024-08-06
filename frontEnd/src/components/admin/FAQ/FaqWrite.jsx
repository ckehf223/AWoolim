import '/src/css/admin/FaqWrite.css'
import { useNavigate } from 'react-router-dom'
import instance from "/src/common/auth/axios";
import { useState } from 'react';

const FaqWrite = () => {
    const navi = useNavigate();
    const [question, setQuestion] = useState({
        category: '',
        title: '',
        answer: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion({
            ...question,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(question);
        instance.post(`http://localhost:8080/admin/faq/insert`, question)
            .then((response) => {
                console.log("CREATE QUESTION SUCCESS", response);
                navi('/admin/faq');
            })
            .catch(error => {
                console.error("CREATE QUESTION ERROR", error);
            });
    };

    return (
        <div className="FaqWrite">
            <form onSubmit={handleSubmit}>
                <div className="FwHeader">
                    <h3><img src="/src/assets/images/faqSmall.png" alt="" /> 자주하는 질문 작성</h3>
                </div>
                <hr />

                <div className="fwCategory">
                    <h4>☞ 카테고리 입력</h4>
                    <input name='category' id="category" value={question.category} onChange={handleChange} placeholder='카테고리를 입력하세요' />
                </div>

                <div className="fwQuestion">
                    <h4>☞ 질문을 입력하세요</h4>
                    <textarea name="title" id="title" value={question.title} onChange={handleChange}
                        maxLength={"1000px"} rows={"10"} placeholder='질문을 입력하세요' />
                </div>

                <div className="fwAnswer">
                    <h4>☞ 답변을 입력하세요</h4>
                    <textarea name="answer" id="answer" value={question.answer} onChange={handleChange}
                        maxLength={"1000px"} rows={"10"} placeholder='답변을 입력하세요' />
                </div>

                <div className='fwBtn'>
                    <button type="submit">작성</button>
                    <button onClick={() => { navi('/admin/faq') }}> 취소</button>

                </div>
            </form>
        </div>
    )
}

export default FaqWrite;