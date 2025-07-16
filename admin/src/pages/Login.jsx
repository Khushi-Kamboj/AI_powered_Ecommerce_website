import {React , useState} from 'react'
import Logo from '../assets/logo.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";


function Login () {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    return (
      <div className='w-[100vw] h-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start pt-[20px]'>
          <div className='w-[100%] h-[70px] flex items-center justify-start px-[30px] gap-[8px] cursor-pointer'>
              <img className='w-[40px]' src={Logo} alt=''/>
              <h1 className='text-[22px] font-sans'>OneCart</h1>
          </div>
  
          <div className='w-[100%] h-[80px] flex items-center justify-center flex-col gap-[6px] mt-[-10px]'>
              <span className='text-[25px] font-semibold'>Login Page</span>
              <span className='text-[16px]'>Welcome to OneCart, Apply to Admin Login</span>
          </div>
  
          <div className="max-w-[500px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mb-[40px]">
              <form action="" className='w-[90%] h-[90%] flex flex-col items-center gap-[10px]'>

                  <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                      
                      <input type='email' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold ' 
                        placeholder='Email' required value={email} onChange={e => setEmail(e.target.value)}/>
                      
                      <input type={show?"text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold flex relative' 
                        placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)}/>
                      {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)}/>}
                      {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)}/>}
                      <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
                          Login
                      </button>
                      {errorMsg && (
                        <div className="text-red-400 text-[15px] mt-2 text-center">{errorMsg}</div>
                      )}
                  </div>
              </form>
          </div>
      </div>
    )
}

export default Login