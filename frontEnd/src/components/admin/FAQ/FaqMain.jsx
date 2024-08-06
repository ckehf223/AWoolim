import '/src/css/admin/FaqMain.css';
import instance from "/src/common/auth/axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faQ, faA } from '@fortawesome/free-solid-svg-icons';

const FaqMain = () => {
    const navi = useNavigate();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = (query = '') => {
        const url = query ? `http://localhost:8080/admin/faq/category?query=${query}` : `http://localhost:8080/admin/faq/list`;
        instance.get(url)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error(`QUESTION FETCH ERROR`, error);
                setQuestions([]);
            })
    }

    const [visibleAnswers, setVisibleAnswers] = useState({});

    const toggleAnswer = (index) => {
        setVisibleAnswers(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className="FaqMain">
            <div className="faqHeader">
                <img src="/src/assets/images/faqMain.png" alt="FaQ" style={{ height: "50px", marginRight: "8px" }} /><h2>자주하는 질문</h2>
            </div>
            <hr style={{ color: 'lightgray' }}></hr>
            <div className='faqBtn'>
                <button onClick={() => { navi('/admin/faqWrite') }}><FontAwesomeIcon icon={faFilePen} />&nbsp;&nbsp;글쓰기 </button>&nbsp;
            </div>
            <div className="faqNav">
                <button onClick={() => fetchQuestion("")}>모두보기</button>
                <button onClick={() => fetchQuestion("정기모임")}>정기모임</button>
                <button onClick={() => fetchQuestion("소모임")}>소모임</button>
                <button onClick={() => fetchQuestion("회원")}>회원가입</button>
                <button onClick={() => fetchQuestion("기타")}>기타문의</button>
            </div>
            {questions.map((question, index) => (
                <div className='faqContents' key={question.questionNo}>
                    <div className='faqQuestion'>
                        <div className='fqContents'>
                            <span className='fq1'>[{question.category}]</span>
                            <span className='fq2'>
                                <button href='#' onClick={() => toggleAnswer(index)}>
                                    <FontAwesomeIcon icon={faQ} style={{ color: "red", fontSize: "15px", fontWeight: "bold", paddingRight: "10px" }} />
                                    {question.title}
                                </button>
                            </span>
                        </div>
                        <div className='fqBtn'>
                            <button onClick={() => { navi(`/admin/faqReWrite/${question.questionNo}`) }}>수정</button>
                        </div>
                    </div>

                    <div className={`faqAnswer ${visibleAnswers[index] ? 'show' : ''}`}>
                        <span><FontAwesomeIcon icon={faA} style={{ color: "blue", fontSize: "15px", fontWeight: "bold", paddingRight: "10px" }} />{question.answer}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FaqMain;
