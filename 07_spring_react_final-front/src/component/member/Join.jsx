import { useState } from "react";
import "./member.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import createInstance from "../../axios/Interceptor";

//회원가입
export default function Join() {
    //.env에 저장된 환경변수 값 읽어오기
    const serverUrl = import.meta.env.VITE_BACK_SERVER; //http://localhost:9999

    //인터셉터에서 커스터마이징한 axios Instance 사용하기
    const axiosInstance = createInstance();

    //각 입력 값 변경 시, 저장 변수(서버 전송용)
    const [member, setMember] = useState({
        memberId : "",
        memberPw : "",
        memberName : "",
        memberPhone : ""
    });

    //아이디, 비밀번호, 이름, 전화번호 onChange 호출 함수
    function chgMember(e){
        member[e.target.id] = e.target.value;  //사용자 입력값 State 변수에 할당.
        setMember({...member});                //State 변수 복사 및 전달하여 리랜더링 유도
    }

    //비밀번호 확인 값 변경 시, 저장 변수 (서버 전송 X. 화면에서 처리를 위함)
    const [memberPwRe, setMemberPwRe] = useState('');
    //비밀번호 확인 값 onChange 호출 함수
    function chgMemberPwRe(e){
        setMemberPwRe(e.target.value);
    }


    /* 아이디 유효성 체크 결과, 중복체크 결과를 저장할 변수
       0 : 검증 이전 상태
       1 : 회원가입 가능한 상태(유효성 검증 통과 && 중복체크 통과)
       2 : 유효성 체크 실패
       3 : 중복된 아이디가 존재하는 경우
    */
    const [idChk, setIdChk] = useState(0);
    //아이디 입력 후, 포커스를 잃었을 때 호출함수 (onBlur)
    function checkMemberId(e){
        //아이디 정규 표현식
        const regExp = /^[a-zA-Z0-9]{8,20}$/;

        if(!regExp.test(member.memberId)){
            //유효성 검증 실패인 경우
            setIdChk(2);
        }else{
            //유효성 검증 성공인 경우 => DB에 중복된 아이디 존재하는지 체크하기 위해, 서버에 아이디 전달하며 중복체크 요청
            let options = {};
            options.url = serverUrl + '/member/' + member.memberId + '/chkId';
            options.method = 'get'; //조회 == GET

            axiosInstance(options)
            .then(function(res){
                //res.data == ResponseDTO
                //res.data.resData == count == 중복체크 결과
                if(res.data.resData == 1){
                    //중복된 아이디가 존재하는 경우
                    setIdChk(3);
                }else if(res.data.resData == 0){
                    //중복된 아이디가 존재하지 않는 경우
                    setIdChk(1);
                }
            })
            .catch(function(err){
                console.log(err);
            });

        }
    }

    /* 비밀번호 검증 결과 저장 변수
       0 : 검사 이전 상태
       1 : 유효성 체크 통과 && 비밀번호 확인값 일치
       2 : 유효성 체크 실패
       3 : 비밀번호 확인값 불일치
    */
    const [pwChk, setPwChk] = useState(0);

    //비밀번호, 비밀번호 확인 값 onBlur 함수
    function chkMemberPw(e){
        //비밀번호 정규 표현식
        const regExp = /^[a-zA-Z0-9!@#$]{6,30}$/; //영어 대/소문자, 특수문자, 숫자 6~30글자

        if(e.target.id == 'memberPw'){ //비밀번호 입력

            if(!regExp.test(e.target.value)){
                //비밀번호 유효성 체크 실패
                setPwChk(2);
            }else if(memberPwRe != ''){ //비밀번호 확인 입력된 경우

                if(e.target.value == memberPwRe){ //비밀번호 == 비밀번호 확인
                    setPwChk(1);
                }else{
                    setPwChk(3);
                }
            }else{ //비밀번호는 유효성 검증 통과 && 비밀번호 확인이 입력되지 않은 경우
                setPwChk(3);
            }


        }else { //비밀번호 확인 입력 
            if(member.memberPw == e.target.value) { //비밀번호 == 비밀번호 확인

                if(regExp.test(member.memberPw)){ //비밀번호 유효성 검증 통과
                    setPwChk(1);
                }
            }else { //비밀번호와 확인값 불일치
                setPwChk(3);
            }
        }
    }

    //회원가입 정상 처리 후, 컴포넌트 전환을 위함.
    const navigate = useNavigate();

    //회원가입 처리 함수
    function join(){
        if(idChk == 1 && pwChk == 1){ //아이디, 비밀번호 정상 입력

            let options = {};
            options.url = serverUrl + '/member';
            options.method = 'post'; //등록 == POST
            options.data = member;

            axiosInstance(options)
            .then(function(res){
                //res.data == ResponseDTO
                //res.data.resData == 회원가입 결과 (true or false)
                //res.data.clientMsg == 서버에서 응답해준 메시지
                Swal.fire({
                    title : '알림',
                    text : res.data.clientMsg,
                    icon : res.data.alertIcon,
                    confirmButtonText : '확인'
                })
                .then(function(result){
                    if(res.data.resData){ //회원가입 정상 처리
                        navigate('/login'); //로그인 컴포넌트로 전환.
                    }
                });
            })
            .catch(function(err){
                console.log(err);
            });

        }else {
            Swal.fire({
                title : '알림',
                text : '입력값이 유효하지 않습니다.',
                icon : 'warning',
                confirmButtonText : '확인'
            });
        }
    }

    return (
        <section className="section join-wrap">
            <div className="page-title">회원가입</div>
            <form onSubmit={function(e){
                e.preventDefault();    //기본 submit 이벤트 제어
                join();                //회원가입 처리 함수 호출
            }}>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberId">아이디</label>
                    </div>
                    <div className="input-item">
                        <input type="text" id="memberId" value={member.memberId} onChange={chgMember} onBlur={checkMemberId}/>
                    </div>
                    <p className={"input-msg" + (idChk == 0 ? '' : idChk == 1 ? ' valid' : ' invalid')}>
                        {
                        idChk == 0
                        ? ''
                            : idChk == 1
                                ? '사용 가능한 아이디입니다.'
                                    : idChk == 2
                                        ? '아이디는 영어 대/소문자 8~20글자 입니다.'
                                            : '이미 사용중인 아이디입니다.'
                        }
                    </p>
                </div>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPw">비밀번호</label>
                    </div>
                    <div className="input-item">
                        <input type="password" id="memberPw" value={member.memberPw} onChange={chgMember} onBlur={chkMemberPw}/>
                    </div>
                </div>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPwRe">비밀번호 확인</label>
                    </div>
                    <div className="input-item">
                        <input type="password" id="memberPwRe" value={memberPwRe} onChange={chgMemberPwRe} onBlur={chkMemberPw}/>
                    </div>
                    <p className={"input-msg" + (pwChk == 0 ? '' : pwChk == 1 ? ' valid' : ' invalid')}>
                        {
                        pwChk == 0 
                        ? ''
                            : pwChk == 1
                                ? '비밀번호가 정상 입력되었습니다.'
                                    : pwChk == 2
                                        ? '비밀번호는 영어, 숫자, 특수문자로 6~30글자를 입력하세요.'
                                            : '비밀번호와 비밀번호 확인값이 일치하지 않습니다.'
                        }
                    </p>
                </div>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberName">이름</label>
                    </div>
                    <div className="input-item">
                        <input type="text" id="memberName" value={member.memberName} onChange={chgMember}/>
                    </div>
                </div>
                <div className="input-wrap">
                    <div className="input-title">
                        <label htmlFor="memberPhone">전화번호</label>
                    </div>
                    <div className="input-item">
                        <input type="text" id="memberPhone" value={member.memberPhone} onChange={chgMember}/>
                    </div>
                </div>
                <div className="join-button-box">
                    <button type="submit" className="btn-primary lg">
                        회원가입
                    </button>
                </div>
            </form>
        </section>
    );
}