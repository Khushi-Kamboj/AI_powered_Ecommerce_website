import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.png'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';

const Nav = () => {
    let navigate = useNavigate();
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext);

    const logout = async() => {
        try{
            const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
            console.log(result.data);
            getAdmin()
            navigate("/login")
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[40px] overflow-x-hidden shadow-md shadow-black'>
        <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer'
        onClick={()=> navigate('/')}>
            <img src={logo} alt="" className='w-[30px]'/>
            <h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>     
        </div>
        <button className="text-white font-semibold text-[18px] px-6 py-2 rounded-lg bg-gradient-to-r from-[#2e2e2e] to-[#18454d] hover:from-[#3a3a3a] hover:to-[#1e5660] transition duration-300"
            onClick={logout}>
            Logout
        </button>

                
   

    </div>
  )
}

export default Nav