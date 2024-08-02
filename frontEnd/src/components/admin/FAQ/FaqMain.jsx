import './FaqMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faQ, faA } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FaqMain = () => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const navi = useNavigate();

    const toggleAnswer = () => {
        setIsAnswerVisible(!isAnswerVisible);
    };

    return (
        <div className="FaqMain">
            <div className="faqHeader">
                <img src="src\assets\images\faqMain.png" alt="FaQ" style={{ height: "50px", marginRight: "8px" }} /><h2>자주하는 질문</h2>
            </div>
            <hr style={{ color: 'lightgray' }}></hr>
            <div className='faqBtn'>
                <button onClick={() => { navi('/faqWrite') }}><FontAwesomeIcon icon={faFilePen} />&nbsp;&nbsp;글쓰기 </button>&nbsp;

            </div>
            <div className="faqNav">
                <button>모두보기</button>
                <button>카테고리1</button>
                <button>카테고리2</button>
                <button>카테고리3</button>
                <button>카테고리4</button>
                <button>카테고리5</button>
            </div>

            <div className='faqContents'>
                <div className='faqQuestion'>
                    <div className='fqContents'>
                        <span className='fq1'>[카테고리]</span>
                        <span className='fq2'>
                            <a href='#' onClick={toggleAnswer}>
                                <FontAwesomeIcon icon={faQ} style={{ color: "red", fontSize: "15px", fontWeight: "bold", paddingRight: "10px" }} />
                                첫번째 질문입니다.
                            </a>
                        </span>
                    </div>
                    <div className='fqBtn'>
                        <button onClick={() => { navi('/faqReWrite') }}>수정하기 </button>
                    </div>
                </div>

                <div className={`faqAnswer ${isAnswerVisible ? 'show' : ''}`}>
                    <span><FontAwesomeIcon icon={faA} style={{ color: "blue", fontSize: "15px", fontWeight: "bold", paddingRight: "10px" }} />첫번째 질문에 대한 응답 내용입니다.</span>
                </div>

            </div>
        </div>
    );
}

export default FaqMain;
