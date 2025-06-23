import { useState } from "react";
import createInstance from "../../axios/Interceptor";
import useUserStore from "../../store/useUserStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//마이페이지 - 비밀번호 변경
export default function MemberPwChg(){
    const axiosInstance = createInstance();
    const serverUrl = import.meta.env.VITE_BACK_SERVER;

    //비밀번호 정상 변경 시, 재로그인 == 로그아웃 처리를 위해 스토리지의 데이터 추출
    const {setIsLogined, setLoginMember, setAccessToken, setRefreshToken, loginMember} = useUserStore();

    //아이디, 변경할 비밀번호 저장할 변수(서버 전송용)
    const [member, setMember] = useState({
        memberId : loginMember.memberId, memberPw : ""
    }); 

    //기존 비밀번호 일치 여부 저장 변수
    const [isAuth, setIsAuth] = useState(false); //false : 기존 비밀번호 입력 JSX 생성, true : 새 비밀번호 입력 JSX 생성

    //기존 비밀번호 값 입력 시, 호출 함수(onChange)
    function chgMemberPw(e){
        member[e.target.name] = e.target.value;
        setMember({...member});
    }

    //기존 비밀번호 일치성 여부 체크
    function checkPw(){
        let options = {};
        options.url = serverUrl + '/member/checkPw';
        options.method = 'post'; //조회 == GET == 비밀번호와 같은 민감 정보일 경우 post
        options.data = member; 

        axiosInstance(options)
        .then(function(res){
            //res.data.resData == [백엔드] resObj
            if(res.data.resData){
                setIsAuth(true);

                //기존 비밀번호 일치하는 경우, 새 비밀번호를 입력받아 member.memberPw에 저장(재사용)을 위해, 초기화 처리
                member.memberPw = '';
                setMember({...member});
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    //새 비밀번호 확인 값, 입력 저장 변수 (서버 전송 X)
    const [memberPwRe, setMemberPwRe] = useState('');
    function chgMemberPwRe(e){
        setMemberPwRe(e.target.value);
    }

    //비밀번호 정상 변경 후, 컴포넌트 전환을 위함
    const navigate = useNavigate();

    //비밀번호 변경하기 버튼 클릭 시, 동작 함수
    function updatePw(){
        //새 비밀번호 정규표현식
        const regExp = /^[a-zA-Z0-9!@#$]{6,30}$/;

        if(!regExp.test(member.memberPw)){
            Swal.fire({
                title : '알림',
                text : '비밀번호는 영어, 숫자, 특수문자(!,@,#,$)로 이루어진 6~30글자를 입력하세요.',
                icon : 'warning',
                confirmButtonText : '확인'
            });

            return;
        }else if(memberPwRe == '' || memberPwRe != member.memberPw){
            Swal.fire({
                title : '알림',
                text : '비밀번호가 일치하지 않습니다.',
                icon : 'warning',
                confirmButtonText : '쏘리'
            });

            return;
        }


        //서버에 비밀번호 변경 요청 후, 정상 변경 시 재로그인 유도
        let options = {};
        options.url = serverUrl + '/member/memberPw';
        options.method = 'patch'; //변경 == Put or Patch
        options.data = member;

        axiosInstance(options)
        .then(function(res){
            if(res.data.resData){ //비밀번호 정상 변경

                setIsLogined(false);
                setAccessToken(null);
                setRefreshToken(null);

                navigate('/login');
            }
        })
        .catch(function(err){
            console.log(err);
        });


    }

    return(
        <>  <section className="section pwChg-section">
                <div className="page-title">비밀번호 변경</div>
                <div style={{width : "60%", margin : "0 auto"}}>
                    {isAuth
                    ?
                    <>
                        <div className="input-wrap" style={{marginBottom : "50px"}}>
                            <div className="input-title">
                                <label htmlFor="newPw">새 비밀번호 입력</label>
                            </div>
                            <div className="input-item">
                                <input type="password" id="newPw" name="memberPw" value={member.memberPw} onChange={chgMemberPw}/>
                            </div>
                        </div>
                        <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="newPwRe">새 비밀번호 확인</label>
                            </div>
                            <div className="input-item">
                                <input type="password" id="newPwRe" value={memberPwRe} onChange={chgMemberPwRe} />
                            </div>
                        </div>
                        <div className="button-zone">
                            <button type="button" className="btn-primary lg" onClick={updatePw}>변경하기</button>
                        </div>
                    </>
                     :
                    <>
                        <div className="input-wrap">
                            <div className="input-title">
                                <label htmlFor="oldPw">기존 비밀번호 입력</label>
                            </div>
                            <div className="input-item">
                                <input type="password" id="oldPw" name="memberPw" value={member.memberPw} onChange={chgMemberPw}/>
                            </div>
                        </div>
                        <div className="button-zone">
                            <button type="button" className="btn-primary lg" onClick={checkPw}>확인</button>
                        </div>
                    </>
                    }
                </div>
            </section>
        </>
    );
}