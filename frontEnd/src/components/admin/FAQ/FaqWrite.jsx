import './FaqWrite.css'
import { useNavigate } from 'react-router-dom'

const FaqWrite = () => {
    const navi = useNavigate();

    return (
        <div className="FaqWrite">
            <div className="FwHeader">
                <h3><img src="src\assets\images\faqSmall.png" alt="" /> 자주하는 질문 작성</h3>
            </div>
            <hr />
            <div className="fwQuestion">
                <h4>☞ 질문을 입력하세요</h4>
                <textarea name="fwQuestion" id="fwQuestion" maxLength={"1000px"} rows={"10"} placeholder='질문을 입력하세요'>

                </textarea>
            </div>

            <div className="fwAnswer">
                <h4>☞ 답변을 입력하세요</h4>
                <textarea name="fwAnswer" id="fwAnswer" maxLength={"1000px"} rows={"10"} placeholder='답변을 입력하세요'>

                </textarea>
                <hr />
            </div>

            <div className='fwBtn'>
                <button type="submit">작성</button>
                <button onClick={() => { navi('/faq') }}> 취소</button>

            </div>

        </div>
    )
}

export default FaqWrite;