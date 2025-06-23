import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

//화면 상단 헤더
export default function Header () {

    /*
    //부모 컴포넌트에세 전달받은 데이터 추출
    const isLogin = props.isLogin;
    const loginMember = props.loginMember;

    //로그아웃 처리를 위해 setter 함수도 함께 추출
    const setIsLogin = props.setIsLogin;
    const setLoginMember = props.setLoginMember;   
    */

    return (
        <header className="header">
            <div>
                <div className="logo">
                    <Link to="#">WALRUS' WEB</Link>
                </div>
                <MainNavi />
                {/*<HeaderLink isLogin={isLogin} loginMember={loginMember} setIsLogin={setIsLogin} setLoginMember={setLoginMember}/>   {/* 하위 HearderLink 컴포넌트로 전달 */}
                <HeaderLink />
            </div>
        </header>
    );
}

//헤더 중앙 메뉴
function MainNavi () {
    return (
        <nav className="nav">
            <ul>
                 <li>
                    <Link to="#">메뉴1</Link>
                 </li>
                 <li>
                    <Link to="#">메뉴2</Link>
                 </li>
                 <li>
                    <Link to="#">메뉴3</Link>
                 </li>
                 <li>
                    <Link to="#">메뉴4</Link>
                 </li>
            </ul>
        </nav>
    );
}

//헤더 우측 메뉴
function HeaderLink () {

    /*
    const isLogin = props.isLogin;
    const loginMember = props.loginMember;
    const setIsLogin = props.setIsLogin;
    const setLoginMember = props.setLoginMember;
    */

    //스토리지에 저장한 데이터 추출
    const {isLogined, loginMember, setIsLogined, setLoginMember} = useUserStore();

    const navigate = useNavigate();

    //로그아웃 Link 클릭 시 동작함수
    function logout(){
        /*
        setIsLogin(false);
        setLoginMember({});
        */
        setIsLogined(false);
        setAccessToken(null);
        setRefreshToken(null);

        navigate("/login");
    }
    
    return (
        <ul className="user-menu">
            {
                isLogined ? 
                <>
                    <li>
                        <Link to="/member">{loginMember.memberId}</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={logout}>로그아웃</Link>
                    </li>  
                </>
                :
                <>
                    <li>
                        <Link to="/login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/join">회원가입</Link>
                    </li>
                </>
            }
        </ul>
    );
}