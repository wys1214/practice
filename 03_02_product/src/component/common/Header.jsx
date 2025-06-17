import './header.css';

export default function Header(){
    return (
        <header className="header">
            <div>
                <div className="site-logo">
                    <a href="#">BJH-SHOP</a>
                </div>
                <div className="link-box">
                    <a href="#">로그인</a>
                    <a href="#">회원가입</a>
                </div>
            </div>
        </header>
    )
}