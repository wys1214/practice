import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function JoinMember(){

    //회원 정보를 저장할 State 변수 member
    const [member, setMember] = useState({
        memberId : "",
        memberName : "",
        memberPhone : "",
        memberIntro : ""
    });

    function chgVal(e){
        member[e.target.id] = e.target.value;
        setMember({...member});
    }

    const navigate = useNavigate();

    function insertMember(){

        let options = [];
        options.url = "http://localhost:9999/member";
        options.method = "post";
        options.data = member;

        axios(options)
        .then(function(res){
            alert("회원 등록 성공");
            navigate("/allMember");
        })
        .catch(function(err){

        })
    }

    return (
        <div>
            <table border={1}>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td><input type='text' id='memberId' onChange={chgVal}/></td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td><input type='text' id='memberName' onChange={chgVal}/></td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td><input type='text' id='memberPhone' onChange={chgVal}/></td>
                    </tr>
                    <tr>
                        <th>소개</th>
                        <td><input type='text' id='memberIntro' onChange={chgVal}/></td>
                    </tr>
                    <tr>
                        <th colSpan={2}><button onClick={insertMember}>등록</button></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}