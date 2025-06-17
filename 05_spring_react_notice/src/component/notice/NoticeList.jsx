import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
//비동기 모듈인 axios 설치 (npm install axios)
import axios from "axios";

export default function NoticeList(){
 
    //서버에서 조회한 게시글 목록 (기존 방식)
    let [noticeList, setNoticeList] = useState([
        {noticeNo : 1, noticeTitle : "게시글 1", noticeContent : "게시글 내용1", noticeWriter : "user01", noticeDate : "2025-6-17"},
        {noticeNo : 2, noticeTitle : "게시글 2", noticeContent : "게시글 내용2", noticeWriter : "user02", noticeDate : "2025-6-17"},
        {noticeNo : 3, noticeTitle : "게시글 3", noticeContent : "게시글 내용3", noticeWriter : "user03", noticeDate : "2025-6-17"},
    ])

    /* useEffect(실행함수, 의존성 배열) : 컴포넌트 렌더링이 일어난 후 실행되는 함수
     *  - 첫 번째 매개변수인 '실행함수' 가 실행되는 조건
     *  1) 첫 렌더링 이후 (1번만 실행됨)
     *  2) 2번째 매개변수인 의존성 배열에 변경이 생겼을 경우
     */
    
    //이렇게 설정되지 않았을 경우 setNoticeList(res.data); 때문에 계속해서 재렌더링되는 문제가 발생
    useEffect(function(){
        //서버에 게시글 목록 요청 : 어플리케이션이 서로 다르기 때문에 별도의 url 작성
        let options = {};
        options.url = "http://localhost:9999/notice/getList";
        options.method = "get";
        
        //ajax와 유사하게 option에 설정된 값을 전달 후 then 으로 결과값을 전달받음
        axios(options)
        .then(function(res){    //res는 응답 데이터가 포함된 객체
            setNoticeList(res.data);    //data 에 저장된 데이터를 setState 함수의 파라미터로 전달
        })
        //에러 발생시 catch로 받아 수행
        .catch(function(err){

        })
    }, []);


    return(
        <>
            <h1>게시글 목록 확인</h1>

            <div className="write-wrap">
                <Link to='/notice/write'>게시글 작성</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {noticeList.map(function(notice, index){
                        return <tr key={"notice"+index}>
                                <td>{notice.noticeNo}</td>
                                <td><Link to={"/notice/detail/"+notice.noticeNo}>{notice.noticeTitle}</Link></td>
                                <td>{notice.noticeContent}</td>
                                <td>{notice.noticeDate}</td>
                            </tr>
                    })}
                </tbody>
            </table>

        </>
    )
}