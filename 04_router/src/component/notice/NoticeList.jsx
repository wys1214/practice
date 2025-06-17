import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function NoticeList(){

    //DB에서 조회해 온 게시글 리스트
    let [noticeList, setNoticeList] = useState([
        {noticeNo : 1, noticeTitle : "제목1", noticeContent : "내용1", noticeWriter : "작성자1"},
        {noticeNo : 2, noticeTitle : "제목2", noticeContent : "내용2", noticeWriter : "작성자2"},
        {noticeNo : 3, noticeTitle : "제목3", noticeContent : "내용3", noticeWriter : "작성자3"},
        {noticeNo : 4, noticeTitle : "제목4", noticeContent : "내용4", noticeWriter : "작성자4"},
        {noticeNo : 5, noticeTitle : "제목5", noticeContent : "내용5", noticeWriter : "작성자5"}
    ]);

    return (
        <div>
            <h1>게시글 목록</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>게시글 번호</th>
                        <th>게시글 게목</th>
                        <th>게시글 내용</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {noticeList.map(function(notice, index){
                        return <Notice key={"notice"+index} notice={notice} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

function Notice(props){
    const notice = props.notice; //게시글 1개 정보

    const navigate = useNavigate();

    //작성자 정보 클릭 시, 동작 함수
    function moveComponent(){
        //개발자 로직 처리 코드

        navigate("/notice/detail", {state : notice.noticeNo});
    }

    return (
        <tr>
            {/* (1) Link로 이동하며, 게시글 번호 전달 */}
            <td><Link to="/notice/detail" state={notice.noticeNo}>{notice.noticeNo}</Link></td>
            {/* (2) Link로 이동하며, 게시글 번호 전달(path : /~? 까지 에 포함시켜 전달) 라우터에 path 등록 시, :noticeNo 작성할 것 */}
            <td><Link to={"/notice/detail/"+notice.noticeNo}>{notice.noticeTitle}</Link></td>
            {/* (3) Link로 이동하며, 게시글 번호 전달(path에 ?key=value : 쿼리스트링으로 전달 ) */}
            <td><Link to={"/notice/detail?noticeNo="+notice.noticeNo}>{notice.noticeContent}</Link></td>
            {/* (4) 스크립트에서 컴포넌트 전환 및 데이터 전달 */}
            <td onClick={moveComponent}>{notice.noticeWriter}</td>
        </tr>
    )
}