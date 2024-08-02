import './FaqWrite.css'
import { useNavigate } from 'react-router-dom'

const FaqReWrite = () => {
    const navi = useNavigate();

    return (
        <div className="FaqWrite">
            <div className="FwHeader">
                <h3><img src="src\assets\images\faqSmall.png" alt="" /> 자주하는 질문 수정</h3>
            </div>
            <hr />
            <div className="fwQuestion">
                <h4>☞ 질문을 입력하세요</h4>
                <textarea name="fwQuestion" id="fwQuestion" maxLength={"1000px"} rows={"10"} placeholder='질문을 입력하세요'>
                    첫번째 질문입니다.
                </textarea>
            </div>

            <div className="fwAnswer">
                <h4>☞ 답변을 입력하세요</h4>
                <textarea name="fwAnswer" id="fwAnswer" maxLength={"1000px"} rows={"10"}>
                    첫번째 질문에 대한 답입니다.
                </textarea>
                <hr />
            </div>

            <div className='fwBtn'>
                <button type="submit">수정</button>
                <button>삭제</button>
                <button onClick={() => { navi('/faq') }}> 취소</button>

            </div>

        </div>
    )
}

export default FaqReWrite;