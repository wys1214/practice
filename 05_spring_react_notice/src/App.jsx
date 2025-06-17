import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import NoticeList from './component/notice/NoticeList';
import NoticeWrite from './component/notice/NoticeWrite';
import NoticeDetail from './component/notice/NoticeDetail';
import NoticeUpdate from './component/notice/NoticeUpdate';

//라우터 등록을 위한 import
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
      <Header/>
      {/* path로 요쳥 시, element 에 작성된 컴포넌트로 이동 */}
      <Routes>
        <Route path='/notice/list' element={<NoticeList />}/>
        <Route path='/notice/write' element={<NoticeWrite />}/>
        {/* react 에서 컴포넌트가 주소를 찾을 수 있도록 하기 위해 뒤에 :noticeNo 입력 
            NoticeDetail 컴포넌트 전환을 위한 URL은 /notice/detail 이고, :noticeNo 는 파라미터를 추출할 때 사용하는 명칭 */}
        <Route path='/notice/detail/:noticeNo' element={<NoticeDetail />}/>
        <Route path='/notice/update/:noticeNo' element={<NoticeUpdate />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
