import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Lists from './pages/Lists'
import { adminDataContext } from './context/AdminContext'

function App () {
  let {adminData, isLoading} = useContext(adminDataContext);
  
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <>
      {!adminData ? <Login/> : <>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
          <Route path='/lists' element={<Lists/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Routes>
        </>
      }
    </>
  )
}


export default App