import "./common.css"

//라우터로 등록한 컴포넌트로 전환하기 위한 Link import
import { Link } from "react-router-dom"

export default function Header(){
    return (
        <header className="header">
            <div>
                <div className="logo">
                    <a href="/">KH-I-CLASS</a>
                </div>
                <ul className="nav">
                    <li>
                        {/* Link 태그는 a태그로 취급됨 */}
                        <Link to="/notice/list">게시판</Link>
                    </li> 
                    <li>
                        <a href="#">메뉴1</a>
                    </li> 
                    <li>
                        <a href="#">메뉴2</a>
                    </li> 
                    <li>
                        <a href="#">메뉴3</a>
                    </li>
                </ul>
            </div>
        </header>
    )
}