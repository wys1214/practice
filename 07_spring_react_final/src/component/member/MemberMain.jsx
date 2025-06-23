import { useEffect, useState } from "react";
import "./member.css";
import useUserStore from "../../store/useUserStore";
import LeftMenu from "../common/LeftMenu";
import { Route, Routes } from "react-router-dom";
import MemberInfo from "./MemberInfo";
import MemberPwChg from "./MemberPwChg";

//마이페이지 메인
export default function MemberMain() {
    //화면 좌측에 보여질 메뉴 리스트 변수 생성
    const [menuList, setMenuList] = useState([
        {url : '/member/info', text : '내 정보'},
        {url : '/member/pwChg', text : '비밀번호 변경'}
    ]);

    //스토리지에서 회원정보 추출
    const {loginMember} = useUserStore();
    
    useEffect(function(){
        if(loginMember.memberLevel == 1){   //관리자인 경우 관리자 페이지 메뉴 추가
            setMenuList([...menuList], {url : '/admin', text : '관리자 페이지'});
        }
    },[])

    return(
        <div className="mypage-wrap">
            <div className="mypage-side">
                <section className="section account-box">
                    <div className="account-info">
                        <span className="material-icons">settings</span>
                        <span>MYPAGE</span>
                    </div>
                </section>
                <section className="section">
                    <LeftMenu menuList={menuList}/> {/* 메뉴리스트를 하위컴포넌트로 전달 */}
                </section>
            </div>
            <div className="mypage-content">
                <Routes>
                    <Route path="info" element={<MemberInfo />}/>   {/** 서브라우팅 */}
                    <Route path="pwChg" element={<MemberPwChg />}/>
                </Routes>
            </div>
        </div>
    );
}