import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

export default function NoticeDetail(){

    //useParams 를 통해 URL을 통해 전달된 파라미터 추출
    const params = useParams();

    //App 컴포넌트에 라우터 등록 시 지정했던 파라미터 추출 명칭인 noticeNo 사용
    console.log(params.noticeNo)

    //게시글 상세 정보를 저장할 state 변수 생성
    const [notice, setNotice] = useState({
        noticeNo : "", noticeTitle : "", noticeContent : "", noticeWriter : "", noticeDate : ""
    });

    //스크립트에서 Link와 같이 컴포넌트 전환을 하기 위해 사용되는 Hook인 useNavigate(); 사용
    //특정 함수 안에서가 아니라 컴포넌트의 가장 바깥쪽에 선언해야 함
    const navigate = useNavigate();

    //삭제하기 버튼 클릭 시 동작 함수
    function deleteNotice(){
        let options = {};
        options.url = 'http://localhost:9999/notice/delete/' + params.noticeNo;
        options.method = 'get';

        axios(options)
        .then(function(res){
            console.log(res);
            //게시글 삭제에 성공했을 경우 (res.data == 1), NoticeList 컴포넌트로 전환
            if (res.data > 0){
                //선언했던 navigate를 통해 컴포넌트 전환
                alert("게시글 삭제 성공");
                navigate("/notice/list");
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    let options ={};
    options.url = "http://localhost:9999/notice/detail/" + params.noticeNo;
    options.method = "get";

    //최초 1번만 렌더링되도록 useEffect Hook 안에 axios 작성
    useEffect(function(){
        axios(options)
        .then(function(res){
            console.log(res);

            setNotice(res.data);
        })
        .catch(function(err){
            console.log(err);
        })
    }, []);

    return (
        <>
            <h1>게시글 상세보기</h1>

            <hr/>

            <div>
                <table border={1}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td colSpan={5}>{notice.noticeTitle}</td>
                        </tr>
                        <tr>
                            <th>번호</th>
                            <td>{notice.noticeNo}</td>
                            <th>작성자</th>
                            <td>{notice.noticeWriter}</td>
                            <th>작성일</th>
                            <td>{notice.noticeDate}</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td colSpan={5}>{notice.noticeContent}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={deleteNotice}>삭제하기</button>
                    <Link to={"/notice/update/"+notice.noticeNo}>수정하기</Link>
                </div>
            </div>

        </>
    )
}