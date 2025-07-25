import React from 'react'
import Home from './pages/Home'
import Add from './pages/Add'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Lists from './pages/Lists'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
        <Route path='/lists' element={<Lists/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
      </Routes>
    </>
  )
}


export default App