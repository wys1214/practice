import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateMember(){

    //서버에 회원 1명 정보를 조회 요청 후, 수정정보를 입력받아 서버에 수정 요청

    const params = useParams();
    const memberId = params.memberId;

    //서버에서 조회한 회원 정보를 저장할 state 변수
    const [member, setMember] = useState({
        memberId : "",
        memberName : "",
        memberPhone : "",
        memberIntro : "",
        enrollDate : ""
    });

    useEffect(function(){

        let options = [];
        options.url = "http://localhost:9999/member/"+memberId;
        options.method = "get";

        axios(options)
        .then(function(res){
            console.log(res);

            if(res.data.resData != null){   //회원이 존재할 때 setMember 사용
                setMember(res.data.resData);
            }

        })
        .catch(function(err){
            console.log(err);
        })

    }, []);

    //입력값 변경 시 호출 함수
    function chgValue(e){
        
        //member[속성값]
        member[e.target.id] = e.target.value;
        setMember({...member});
        
    }

    const navigate = useNavigate();

    //수정버튼 클릭 시 동작 함수
    function updMember(){
        let options = [];
        options.url = "http://localhost:9999/member";
        options.method = "patch";
        options.data = member;

        axios(options)
        .then(function(res){
            console.log(res);
            if(res.data.resData){   //등록, 수정, 삭제 시 resData 는 boolean 사용
                //전체 회원 조회 화면으로 이동
                navigate("/allMember");
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    return (
        <div>
            <h2>회원 정보 수정</h2>

            <div>
                <table border={1}>
                    <tbody>
                        <tr>
                            <th>회원 아이디</th>
                            <td>{member.memberId}</td>
                        </tr>
                        <tr>
                            <th>회원 이름</th>
                            <td>
                                <input type='text' id='memberName' value={member.memberName} onChange={chgValue} />
                            </td>
                        </tr>
                        <tr>
                            <th>회원 전화번호</th>
                            <td>{member.memberPhone}</td>
                        </tr>
                        <tr>
                            <th>회원 소개글</th>
                            <td>
                                <input type='text' id='memberIntro' value={member.memberIntro} onChange={chgValue} />
                            </td>
                        </tr>
                        <tr>
                            <th>회원 가입일</th>
                            <td>{member.enrollDate}</td>
                        </tr>
                        <tr>
                            <th colspan='2'><button onClick={updMember}>수정</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </div>
    )
}