import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllMember from './component/member/AllMember'
import UpdateMember from './component/member/UpdateMember'
import { Link, Routes, Route } from 'react-router-dom'
import JoinMember from './component/member/JoinMember'

function App() {

  return (
    <>
      <h1>회원 관리</h1>

      <hr/>

      <h3>
        <Link to="/allMember">전체 회원 조회 컴포넌트로 전환</Link>
      </h3>

      <h3>
        <Link to="/joinMember">회원 등록 컴포넌트로 전환</Link>
      </h3>


      <Routes>
        <Route path="/allMember" element={<AllMember/>}></Route>
        <Route path="/updMember/:memberId" element={<UpdateMember/>}></Route>
        <Route path="/joinMember" element={<JoinMember />}></Route>
      </Routes>
    </>
  )
}

export default App
