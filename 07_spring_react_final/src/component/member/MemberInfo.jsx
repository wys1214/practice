import { useEffect, useState } from "react";
import createInstance from "../../axios/Interceptor";
import useUserStore from "../../store/useUserStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// 마이페이지 - 내 정보 컴포넌트
export default function MemberInfo(){

    // 기존 회원 정보 표출 및 수정 정보를 입력받아 저장할 상태 변수
    const [member, setMember] = useState({
        memberId : "", memberName : "", memberPhone : "", memberLevel : ""
    });

    // 환경변수 .env 파일에 저장된 서버 URL 읽어오기
    const serverUrl = import.meta.env.VITE_BACK_SERVER;
    // 커스텀한 axios 인스턴스 불러오기 (인터셉터 설정 포함)
    const axiosInstance = createInstance();
    // 전역 상태 관리 스토어에서 로그인 정보 관련 함수 및 변수 불러오기
    const {loginMember, setIsLogined, setLoginMember, setAccessToken, setRefreshToken} = useUserStore();

    // 컴포넌트가 렌더링된 후 회원 정보를 조회하는 useEffect 훅
    useEffect(function(){
        let options = {};
        options.url = serverUrl + '/member/' + loginMember.memberId; // 현재 로그인된 회원의 ID로 정보를 요청
        options.method = 'get'; // GET 방식으로 요청

        axiosInstance(options)
        .then(function(res){
            // 서버 응답에서 회원 정보(resData)가 존재하면 상태에 저장
            if(res.data.resData != null){
                setMember(res.data.resData); 
            }
        })
        .catch(function(err){
            // 오류 발생 시 콘솔에 로그 출력 (필요에 따라 사용자에게 알림 추가 가능)
            console.log(err);
        });
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨을 의미

    // 회원 수정 정보 입력 시 호출되는 함수 (onChange 이벤트 핸들러)
    function chgMember(e){
        // 입력 필드의 id를 키로 사용하여 member 상태 업데이트
        member[e.target.id] = e.target.value;
        // 새로운 객체로 상태를 설정하여 React가 변경을 감지하고 리렌더링하도록 함
        setMember({...member});
    }

    // 수정하기 버튼 클릭 시 동작하는 함수
    function updateMember(){
        Swal.fire({
            title : '알림',
            text : '회원 정보를 수정하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '수정하기',
            cancelButtonText : '취소'
        }).then(function(res){
            if(res.isConfirmed){ // 사용자가 '수정하기'를 클릭한 경우
                let options = {};
                options.url = serverUrl + '/member';
                options.method = 'patch'; // PATCH 메소드를 사용하여 일부 정보 수정
                options.data = member; // 현재 기존 정보와 수정된 정보를 모두 포함하는 member 객체 전송

                axiosInstance(options)
                .then(function(res){
                    // 서버 응답은 인터셉터에서 가로채어 SweetAlert2 알림을 처리할 수 있음
                    /*
                    Swal.fire({
                        title : '알림',
                        text : res.data.clientMsg,
                        icon : res.data.alertIcon
                    });
                    */
                    // 만약 스토리지에 저장된 회원 객체 (loginMember) 에 수정 대상 정보(이름, 전화번호)가 포함되어 있다면
                    // 스토리지 정보도 최신화 해주어야 합니다.
                    // 현재는 아이디/레벨만 저장되어 있으므로 최신화할 필요가 없습니다.
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        });
    }

    // 컴포넌트 전환을 위한 useNavigate 훅 사용
    const navigate = useNavigate();

    // 삭제하기 버튼 클릭 시 동작하는 함수 (회원 탈퇴)
    function deleteMember(){
        Swal.fire({
            title : '알림',
            text : '정말 탈퇴하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonText : '탈퇴하기',
            cancelButtonText : '취소'
        }).then(function(res){
            if(res.isConfirmed){ // 사용자가 '탈퇴하기'를 클릭한 경우
                let options = {};
                options.url = serverUrl + '/member/' + loginMember.memberId;
                options.method = 'delete'; // DELETE 메소드를 사용하여 회원 정보 삭제

                axiosInstance(options)
                .then(function(res){
                    // 서버 응답에 따라 SweetAlert2 알림 표시
                    Swal.fire({
                        title : '알림',
                        text : res.data.clientMsg,
                        icon : res.data.alertIcon
                    });

                    if(res.data.resData){ // DB에서 정상적으로 삭제된 경우
                        // 스토리지에 저장된 로그인 정보 초기화
                        setIsLogined(false);
                        setLoginMember(null);
                        setAccessToken(null);
                        setRefreshToken(null);
                        
                        // axios 헤더에 포함된 Authorization 토큰 삭제 (Interceptor.jsx에서 설정되었을 수 있음)
                        // accessToken이 null이 아닐 때만 설정되므로 명시적으로 삭제하는 것이 더 명확함
                        delete axiosInstance.defaults.headers.common['Authorization'];
                        
                        // 탈퇴 완료 후 로그인 컴포넌트로 화면 전환
                        navigate('/login'); 
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
                    e.preventDefault(); // 폼 기본 제출 동작 방지
                    updateMember(); // 회원 정보 수정 함수 호출
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