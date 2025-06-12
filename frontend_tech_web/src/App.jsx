import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import Product from './pages/Product/product'
import Bag from './pages/Bag/bag'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer position='bottom-left' autoClose={3000}/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/bag' element={<Bag/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App