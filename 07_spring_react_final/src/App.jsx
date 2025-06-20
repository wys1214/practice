import { useState } from 'react'
import Header from './component/common/Header'
import Footer from './component/common/Footer'
import Main from './component/common/Main'
import Join from './component/member/Join'
import Login from './component/member/Login'
import Test from './component/member/Test'

import { Route, Routes } from 'react-router-dom'

/* 이미지, css, 폰트 (정적 파일) : public 폴더 하위에 위치
 * 애플리케이션 전역에 적용하기 위해 index.html 에 <link> 로 작성하여 적용
 * 
 * .env : 환경변수 파일
 *  - 생성 이유 : 환경 변수를 설정하여, 애플리케이션 설정이나 민감한 정보를 코드에서 분리시킴
 *  - 프로젝트 폴더 바로 하위에 생성
 *  - 파일 내부 환경변수 명칭은 'VITE_' 로 시작 (기존 CRA(Create Reant-App) 방식의 프로젝트에서는 REACT_APP 으로 시작)
 *  - 파일 내부에 민감정보가 포함될 수 있으므로 .gitignore 에 작성해 원격 저장소에 push 되지 않도록 처리
 * 
 * Header/Footer 컴포넌트는 사용자 액션이나 로직에 의해 전환되지 않고 항상 화면 상/하단에 위치 : 라우터 등록 X
 * Main 컴포넌트는 루트 path(기본 페이지 : 여기서는 http://localhost:5173) 로 접근 시 전환할 컴포넌트이기 때문에 '/' 로 등록
 */


function App() {

  /*
  //정상 로그인 시 저장할 State 변수 2개 : 메뉴 등을 다르게 그려주는 데에 필요
  const [isLogin, setIsLogin] = useState(false);
  const [loginMember, setLoginMember] = useState({});
  //위 두 State의 값들을 하위 컴포넌트에 전달

  이 두 값은 애플리케이션 전역에서 사용해야 하기 때문에, 모든 컴포넌트에 일일이 전달하는 방식은 비효율적임 (Props Drilling 현상) => zustand 라이브러리를 통해 전역에서 사용하도록 수정
  zustand를 통해 App 컴포넌트에서 설정하면 모든 컴포넌트에 일일이 전달할 필요 없이 바로 선언해 사용 가능
  */

  return (
    <>
      <div className='wrap'>
        {/*<Header isLogin={isLogin} loginMember={loginMember} setIsLogin={setIsLogin} setLoginMember={setLoginMember}/>*/}
        <Header />
        <main className='content'>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/join' element={<Join />}/>
            {/*<Route path='/login' element={<Login setIsLogin={setIsLogin} setLoginMember={setLoginMember}/>}/>*/}
            <Route path='/login' element={<Login/>}/>
            <Route path='/test' element={<Test />}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
