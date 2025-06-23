import { useState } from 'react'

import Header from './component/common/Header';
import Footer from './component/common/Footer';
import Main from './component/common/Main';

import { Route, Routes } from 'react-router-dom';
import Join from './component/member/Join';
import Login from './component/member/Login';
import MemberMain from './component/member/MemberMain';

/*
- 이미지, css, 폰트 (정적 파일)  public 폴더 하위에 위치시키기.
  애플리케이션 전역에 적용하기 위해, index.html에 <link> 작성하여 적용.
- .env(환경변수 파일)
  생성 이유 : 환경 변수를 설정하여, 애플리케이션 설정이나, 민감한 정보를 코드에서 분리시키는 목적으로 작성.
  .env 파일은 프로젝트 폴더 바로 하위에 생성해야 한다.
  .env 파일내부 환경변수 명칭은 VITE_로 시작해야 한다. (기존 CRA(Create-React-App) 방식의 프로젝트에서는 변수명칭이 REACT_APP으로 시작해야 한다.)
  .env 파일 내부에는 민감한 정보가 포함되어 있을 수 있으므로, .gitignore에 작성하여 원격 저장소에 Push되지 않도록 처리한다.
- Header 컴포넌트와, Footer 컴포넌트는 사용자 액션 또는 로직에 의해 전환되는 컴포넌트가 아니고, 항상 화면 상.하단에 위치하므로 라우터 등록 작업 하지 않음.
- Main 컴포넌트는 루트 Path (http://localhost:5173)로, 접근 시 전환할 컴포넌트이므로, path를 '/'로 등록

- 로그인 기능
  필요한 변수(isLogin, loginMember)를 Login 컴포넌트에서 선언 및 변경 => HeaderLink에서 사용 불가. 컴포넌트는 단방향 구조이므로.
  => 해결 : 상태 끌어올리기 isLogin, loginMember 선언부를 App 컴포넌트로 이동 및 자식 컴포넌트에게 필요 데이터 공유.
  문제점
      - 최상위 컴포넌트 (State 변수 선언)
      - 자식1
      - 자식2
      - 자식3
      - 자식4 (State 변수 사용)
    => 자식1, 자식2, 자식3은 State 변수를 사용하지 않지만, 자식4에서 사용하기 위해 전달해주는 코드(props에서 추출) 작성해야함.
       이러한 현상을 Props Drilling 이라고 함.

  - 상태 관리 라이브러리 zustand를 설치하여, 애플리케이션 전역적으로 필요한 데이터를 스토리지에 저장하게 되면,
    필요한 컴포넌트에서만 추출 및 사용하는 코드를 작성하면 된다.

*/


function App() {
  //로그인 상태 변수 선언
  /*
  const [isLogin, setIsLogin] = useState(false);
  const [loginMember, setLoginMember] = useState({});
  */

  return (
    <div className='wrap'>
      <Header/>
        <main className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/join' element={<Join />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/member/*' element={<MemberMain />} /> {/* /member로 시작하는 path는 MemberMain 컴포넌트를 라우팅 */}
          </Routes>
        </main>
      <Footer/>
    </div>
  )
}

export default App
