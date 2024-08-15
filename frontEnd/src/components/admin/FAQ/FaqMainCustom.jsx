import '/src/css/admin/FaqMainCustom.css';
import instance from "/src/common/auth/axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQ, faA } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';
import axios from 'axios';

const FaqMainCustom = () => {
    const [questions, setQuestions] = useState([]);
    const [active, setActive] = useState(1);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = (query = '') => {
        const url = query ? `http://localhost:8080/api/faq/category?query=${query}` : `http://localhost:8080/api/faq/list`;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            }
        })
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
        <div className="ServiceFAQMain">
            <div className="faqHeader">
                <img src="/src/assets/images/faqMain.png" alt="FaQ" style={{ height: "50px", marginRight: "8px" }} /><h2>자주하는 질문</h2>
            </div>
            <hr style={{ color: 'lightgray' }}></hr>

            <div className="faqNav">
                <button className={active === 1 ? 'buttonActive' : ''} onClick={() => { fetchQuestion(""); setActive(1) }}>모두보기</button>
                <button className={active === 2 ? 'buttonActive' : ''} onClick={() => { fetchQuestion("정기모임"); setActive(2) }}>정기모임</button>
                <button className={active === 3 ? 'buttonActive' : ''} onClick={() => { fetchQuestion("소모임"); setActive(3) }}>소모임</button>
                <button className={active === 4 ? 'buttonActive' : ''} onClick={() => { fetchQuestion("회원"); setActive(4) }}>회원가입</button>
                <button className={active === 5 ? 'buttonActive' : ''} onClick={() => { fetchQuestion("기타"); setActive(5) }}>기타문의</button>
            </div>
            {questions.map((question, index) => (
                <div className='faqContents' key={question.questionNo}>
                    <input type="hidden" name="questionNo" value={question.questionNo} />
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

                    </div>

                    <div className={`faqAnswer ${visibleAnswers[index] ? 'show' : ''}`}>
                        <span>
                            <FontAwesomeIcon icon={faA} style={{ color: "blue", fontSize: "15px", fontWeight: "bold", paddingRight: "10px" }} />
                            <span dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(question.answer),
                            }}>
                            </span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FaqMainCustom;
