import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import ProductList from './component/product/ProductList';

function App() {



  return (
    <>
      <Header/>
      <ProductList />
      <Footer/>
    </>
  )
}

export default App
