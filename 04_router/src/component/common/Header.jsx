import './header.css';

//Link 사용을 위한 import
import {Link} from 'react-router-dom';

export default function Header(){
    return (
        <header className="header">
            <div>
                <div className="site-logo">
                    <a href="#">BJH-SHOP</a>
                </div>
                <div>
                <div>
                    <Link to="/notice/list">게시판</Link>
                </div>
                </div>
                <div className="link-box">
                    <Link to="/member/login">로그인</Link>
                    <Link to="/member/myPage">마이페이지</Link>
                    <Link to="/member/join">회원가입</Link>
                </div>
            </div>
        </header>
    )
}