import '/src/css/admin/faq/FaqWrite.css'
import { useNavigate } from 'react-router-dom'
import instance from "/src/auth/axios";
import { useState } from 'react';
import CustomQuill from '/src/common/CustomQuill';

const FaqWrite = () => {
    const navi = useNavigate();
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const question = {
            category,
            title,
            answer
        }
        instance.post(`/api/faq/insert`, question)
            .then((response) => {
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
                    <h5>☞ 카테고리 입력</h5>
                    <input id='category' value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='카테고리를 입력하세요' />
                </div>

                <div className="fwQuestion">
                    <h5>☞ 질문을 입력하세요</h5>
                    <textarea value={title} onChange={(e) => { setTitle(e.target.value) }}
                        maxLength={"1000px"} rows={"7"} placeholder='질문을 입력하세요' />
                </div>

                <div className="fwAnswer">
                    <h5>☞ 답변을 입력하세요</h5>
                    <CustomQuill content={answer} setContent={setAnswer} width={'1160'} height={'200'} />
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