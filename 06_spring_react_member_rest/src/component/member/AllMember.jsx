import { useEffect, useState } from "react"

//서버에 http 비동기 통신 요청을 보내기 위한 라이브러리
import axios from 'axios';
import { Link } from "react-router-dom";

export default function AllMember(){

    //회원 목록을 저장할 state 변수
    const [memberList, setMemberList] = useState([]);

    //서버에 회원 목록 요청
    useEffect(function(){
        let options = [];
        options.url = 'http://localhost:9999/member';
        options.method = 'get';

        axios(options)
        .then(function(res){
            console.log(res);
            
            //서버에서 응답한 ResponseDto = res.data
            //현재 전체회원 정보는 그 하위의 resData에 담겨 있으므로 한번 더 경로를 설정해줌
            setMemberList(res.data.resData);
        })
        .catch(function(err){
            console.log(err);
        });

    },[])

    return (
        <div>
            <h2>전체 회원 조회</h2>

            <hr/>

            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>회원 아이디</th>
                            <th>회원 이름</th>
                            <th>회원 전화번호</th>
                            <th>회원 소개글</th>
                            <th>회원 가입일</th>
                            <th>회원 삭제</th>
                            <th>회원 정보 수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList.map(function(member, index){
                            return <Member key={"member"+index} member={member} memberList={memberList} setMemberList={setMemberList}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

//memberList의 객체 1개 정보를 가지고 하나의 tr 태그로 리턴
function Member(props){

    const member = props.member;    //부모 컴포넌트가 전달한 객체 추출
    const memberList = props.memberList;
    const setMemberList = props.setMemberList;

    function deleteMember(){
        let options=[];
        options.url="http://localhost:9999/member/"+member.memberId;
        options.method='delete';

        axios(options)
        .then(function(res){
            if(res.data.resData){   //delete의 resData는 boolean 으로 설정되어 있음
                //갱신된 회원목록을 setter 함수로 저장해 갱신
                let newMemberList = memberList.filter(function(fMember, fIndex){
                    return member != fMember;
                });

                setMemberList(newMemberList);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

    return (
        <tr>
            <td>{member.memberId}</td>
            <td>{member.memberName}</td>
            <td>{member.memberPhone}</td>
            <td>{member.memberIntro}</td>
            <td>{member.enrollDate}</td>
            <td><button onClick={deleteMember}>삭제</button></td>
            <td><Link to={"/updMember/" + member.memberId}>수정</Link></td>
        </tr>
    )
}