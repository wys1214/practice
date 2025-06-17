import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


//외부 컴포넌트 사용을 위한 import
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import Mypage from './component/member/Mypage';
import Login from './component/member/Login';
import Join from './component/member/Join';
import NoticeList from './component/notice/NoticeList';
import NoticeDetail from './component/notice/NoticeDetail';


//라우터 사용을 위한 import
import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      {/* 컴포넌트를 라우터에 등록하고, path에 작성된 URL로 요청 시 랜더링 */}
      <Routes>
        <Route path="/notice/detail" element={<NoticeDetail/>} />
        <Route path="/notice/list" element={<NoticeList/>} />
        <Route path="/member/myPage" element={<Mypage />} />
        <Route path="/member/login" element={<Login />} />
        <Route path="/member/join" element={<Join />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
