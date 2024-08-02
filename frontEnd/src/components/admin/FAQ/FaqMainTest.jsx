import '/src/css/admin/FaqMain.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faQ } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';



const FaqMain = () => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const toggleAnswer = () => {
        setIsAnswerVisible(!isAnswerVisible);
    }
    return (
        <div className="FaqMain">
            <div className="faqHeader">
                <h2>자주하는 질문</h2>
                <hr />
            </div>
            <div className='faqBtn'>
                <button><FontAwesomeIcon icon={faFilePen} />&nbsp;&nbsp;글쓰기 </button>
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
                    <span className='fq1'>[카테고리]</span>
                    <span className='fq2'><a href='#'><FontAwesomeIcon icon={faQ} style={{ color: "red", fontSize: "15px", fontWeight: "bold", paddingRight: "10px" }} /> 첫번째 질문입니다.</a></span>
                </div>
                <div className='faqAnswer'>
                    <span>첫번째 질문에 대한 응답 내용입니다.</span>
                </div>
            </div>

        </div>
    )
}

export default FaqMain;