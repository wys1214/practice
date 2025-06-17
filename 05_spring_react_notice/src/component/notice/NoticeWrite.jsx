import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function NoticeWrite(){

    //사용자 입력값 상태 관리 변수
    const [noticeTitle, setNoticeTitle]=useState("");
    const [noticeWriter, setNoticeWriter]=useState("");
    const [noticeContent, setNoticeContent]=useState("");

    function inputNoticeTitle(e){
        setNoticeTitle(e.target.value);
    }
    function inputNoticeWriter(e){
        setNoticeWriter(e.target.value);
    }
    function inputNoticeContent(e){
        setNoticeContent(e.target.value);
    }

    //스크립트에서 Link와 같이 컴포넌트 전환을 하기 위해 사용되는 Hook인 useNavigate(); 사용
    //특정 함수 안에서가 아니라 컴포넌트의 가장 바깥쪽에 선언해야 함
    const navigate = useNavigate();

    //작성하기 버튼 클릭 시 동작 함수
    function regNotice(){
        let options = {};
        options.url = 'http://localhost:9999/notice/write';
        options.method = 'post';
        options.data = {
            noticeTitle, noticeWriter, noticeContent
        };

        axios(options)
        .then(function(res){
            //게시글 작성에 성공했을 경우 (res.data == 1), NoticeList 컴포넌트로 전환
            if (res.data > 0){
                //선언했던 navigate를 통해 컴포넌트 전환
                navigate("/notice/list");
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

    return(
        <>
            <h1>게시글 작성</h1>

            <hr/>

            <div>
                <div>
                    <label htmlFor='noticeTitle'>제목</label>
                    <input type='text' id='noticeTitle' value={noticeTitle} onChange={inputNoticeTitle}></input>
                </div>
                <div>
                    <label htmlFor='noticeWriter'>작성자</label>
                    <input type='text' id='noticeWriter' value={noticeWriter} onChange={inputNoticeWriter}></input>
                </div>
                <div>
                    <label htmlFor='noticeContent'>내용</label>
                    <textarea id='noticeContent' value={noticeContent} onChange={inputNoticeContent}></textarea>
                </div>
                <div>
                    <button onClick={regNotice}>작성하기</button>
                </div>
            </div>
        </>
    )
}