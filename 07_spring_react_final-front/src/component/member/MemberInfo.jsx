import { useEffect, useState } from "react";
import createInstance from "../../axios/Interceptor";
import useUserStore from "../../store/useUserStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//마이페이지 - 내 정보
export default function MemberInfo(){

    //기존 회원 정보 표출 및 수정 정보 입력받아 저장할 변수
    const [member, setMember] = useState({
        memberId : "", memberName : "", memberPhone : "", memberLevel : ""
    });

    //환경변수 파일에 저장된 서버 URL 읽어오기
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    const axiosInstance = createInstance();
    const {loginMember, setIsLogined, setLoginMember, setAccessToken, setRefreshToken} = useUserStore();

    useEffect(function(){
        //랜더링 후, 회원 정보 조회
        let options = {};
        options.url = serverUrl + '/member/' + loginMember.memberId;
        options.method = 'get';

        axiosInstance(options)
        .then(function(res){
            if(res.data.resData != null){
                setMember(res.data.resData); 
            }
        })
        .catch(function(err){
            
        });


    }, []);

    //회원 수정 정보 입력 시, 호출 함수 (onChange)
    function chgMember(e){
        member[e.target.id] = e.target.value;
        setMember({...member});
    }

    //수정하기 버튼 클릭 시, 동작 함수
    function updateMember(){
        Swal.fire({
            title : '알림',
            text : '회원 정보를 수정하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '수정하기',
            cancelButtonText : '취소'
        }).then(function(res){
            if(res.isConfirmed){

                let options = {};
                options.url = serverUrl + '/member';
                options.method = 'patch'; //일부 정보 수정
                options.data = member;

                axiosInstance(options)
                .then(function(res){
                    
                    //만약 스토리지에 저장된 회원 객체(loginMember)에, 수정 대상 정보(이름, 전화번호)가 포함되어 있다면
                    //스토리지 정보도 최신화 해주어야 한다.
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        });
    }

    //정상 삭제 후, 컴포넌트 전환을 위함.
    const navigate = useNavigate();
    //삭제하기 버튼 클릭 시, 동작 함수
    function deleteMember(){
        Swal.fire({
            title : '알림',
            text : '회원을 탈퇴 하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '탈퇴하기',
            cancelButtonText : '취소'
        }).then(function(res){
            if(res.isConfirmed){
                let options = {};
                options.url = serverUrl + '/member/' + loginMember.memberId;
                options.method = 'delete'; //삭제 == DELETE

                axiosInstance(options)
                .then(function(res){
                    
                    if(res.data.resData){ //DB에서 정상 삭제된 경우

                        //스토리지 정보 초기화
                        setIsLogined(false);
                        setLoginMember(null);
                        setAccessToken(null);
                        setRefreshToken(null);
                        delete axiosInstance.defaults.headers.common['Authorization'];


                        navigate('/login'); //로그인 컴포넌트로 전환
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        });
    }


    return(
        <> 
            <section className="section member-info-section">
                <div className="page-title">내 정보</div>
                <form onSubmit={function(e){
                    e.preventDefault();
                    updateMember(); //회원 정보 수정 함수 호출
                }}>
                    <table className="tbl my-info" style={{width : "80%", margin : "0 auto"}}>
                        <tbody>
                            <tr>
                                <th style={{width:"20%"}}>아이디</th>
                                <td className="left">{member.memberId}</td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="memberName">이름</label>
                                </th>
                                <td className="left">
                                    <div className="input-item">
                                        <input type="text" id="memberName" value={member.memberName} onChange={chgMember} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="memberPhone">전화번호</label>
                                </th>
                                <td className="left">
                                    <div className="input-item">
                                        <input type="text" id="memberPhone" value={member.memberPhone} onChange={chgMember}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>회원등급</th>
                                <td className="left">
                                    {member.memberLevel == 1 ? '관리자' : '일반회원'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button-zone">
                        <button type="submit" className="btn-primary lg">정보수정</button>
                        <button type="button" className="btn-secondary lg" onClick={deleteMember}>회원탈퇴</button>
                    </div>
                </form>
            </section>
        </>
    );
}