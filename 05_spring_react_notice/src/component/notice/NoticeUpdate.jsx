import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function NoticeUpdate(){

    //기존 게시글 정보 받아오기
    const params = useParams();

    //파라미터로 전달된 게시글번호 추출
    const noticeNo = params.noticeNo;
    
    //기존 게시글 상세정보를 DB로부터 불러와 저장할 state 변수 생성
    const [notice, setNotice] = useState({
        noticeNo : "", noticeTitle : "", noticeContent : "", noticeWriter : "", noticeDate : ""
    });

    //기존 게시글 정보 불러오기
    //최초 1번만 렌더링되도록 useEffect Hook 안에 axios 작성
    useEffect(function(){
        let options ={};
        options.url = "http://localhost:9999/notice/detail/" + noticeNo;
        options.method = "get";

        axios(options)
        .then(function(res){
            console.log(res);
            setNotice(res.data);
        })
        .catch(function(err){
            console.log(err);
        })
    }, []);

    //값을 수정하기 위해, 현재 화면에 표시되는 값인 기존 notice 객체의 값을 수정
    /*
    function updateNoticeTitle(e){
        let titleVal = e.target.value;  //현재 제목 값
        notice.noticeTitle = titleVal;  //notice 객체의 제목값을 변경
        setNotice({...notice});         //setter 메소드로 변경한 값을 저장
    }
    function updateNoticeWriter(e){
        let writerVal = e.target.value;
        notice.noticeWriter = writerVal;
        setNotice({...notice});
    }
    function updateNoticeContent(e){
        let contentVal = e.target.value;
        notice.noticeContent = contentVal;
        setNotice({...notice});
    }
    */

    //3개의 함수를 1개로 통합
    function changeNoticeValue(e){
        //e.target.id => 현재 이벤트가 발생한 곳의 아이디 속성값 : 각 요소별로 다름
        //객체 속성에 접근하는 방법 (JS) : 객체명.속성명=변경값 or 객체명[속성명]=변경값
        notice[e.target.id] = e.target.value;   //현재 이벤트가 발생하고 있는 곳의 value 값을 추출해, 현재 이벤트가 발생하는 각 아이디의 속성값으로 해당 값을 전달함
        setNotice({...notice});     //setter 메소드로 값 전달
    }

    //스크립트에서 Link와 같이 컴포넌트 전환을 하기 위해 사용되는 Hook인 useNavigate(); 사용
    const navigate = useNavigate();

    //수정하기 버튼 클릭 시 동작 함수
    function updateNotice(){
        let options = {};
        options.url = 'http://localhost:9999/notice/update';
        options.method = 'post';
        options.data = notice;

        axios(options)
        .then(function(res){
            //게시글 수정에 성공했을 경우 (res.data == 1), 해당 글 상세보기 컴포넌트로 전환
            if (res.data > 0){
                //선언했던 navigate를 통해 컴포넌트 전환
                navigate("/notice/detail/"+noticeNo);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

    return(
        <>
            <h1>게시글 수정하기</h1>

            <hr/>

            <div>
                <div>
                    <label htmlFor='noticeTitle'>제목</label>
                    <input type='text' id='noticeTitle' value={notice.noticeTitle} onChange={changeNoticeValue}></input>
                </div>
                <div>
                    <label htmlFor='noticeWriter'>작성자</label>
                    <input type='text' id='noticeWriter' value={notice.noticeWriter} onChange={changeNoticeValue}></input>
                </div>
                <div>
                    <label htmlFor='noticeContent'>내용</label>
                    <textarea id='noticeContent' value={notice.noticeContent} onChange={changeNoticeValue}></textarea>
                </div>
                <div>
                    <button onClick={updateNotice}>수정하기</button>
                </div>
            </div>
        </>
    )
    
}