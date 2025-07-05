import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.webp'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useContext } from 'react';
import { authDataContext } from '../../context/AuthContext.jsx'; 
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { userDataContext } from '../../context/UserContext.jsx';

function Registration (){

  let [show , setShow] = useState(false);

  let {serverUrl} = useContext(authDataContext);
  let {getCurrentUser} = useContext(userDataContext);

  let [name , setName] = useState("");
  let [email ,setEmail] = useState("");
  let [password , setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState(""); 
  let navigate = useNavigate();

  const handleSignup = async(event)=>{
    event.preventDefault();
    setErrorMsg("");
    try{
        
        if (!name || !email || !password) {
          setErrorMsg("All fields are required.");
          return;
        }

        const apiUrl = serverUrl.replace(/\/$/, '') + '/api/auth/registration';

        const result = await axios.post(apiUrl, {name , email , password} , { withCredentials: true });
        console.log(result.data);
        
        // Check if user was logged in (either new user or existing user)
        if (result.status === 200 || result.status === 201) {
          getCurrentUser();
          navigate('/');
        }
    }
    catch(error){
       
        if (error.response) {
          
          setErrorMsg(error.response.data?.message || "Registration failed: " + error.response.statusText);
          console.log("Server error:", error.response.data);
        } else if (error.request) {
          setErrorMsg("No response from server. Check your network or backend server.");
          console.log("No response:", error.request);
        } else {
          setErrorMsg("Error: " + error.message);
          console.log("Error:", error.message);
        }
    }
  }


  const googleSignUp = async() => {
    try{
      const response = await signInWithPopup(auth , provider)
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const apiUrl = serverUrl.replace(/\/$/, '') + '/api/auth/googleLogin';
      
      const result = await axios.post(apiUrl, {name , email} , {withCredentials : true});
      console.log(result.data);
      
      // Navigate to home page after successful Google login
      getCurrentUser();
      navigate('/');
    }catch(e){
      if (e.response) {
        setErrorMsg(e.response.data?.message || "Google registration failed: " + e.response.statusText);
        console.log("Server error:", e.response.data);
      } else if (e.request) {
        setErrorMsg("No response from server. Check your network or backend server.");
        console.log("No response:", e.request);
      } else {
        setErrorMsg("Error: " + e.message);
        console.log("Error:", e.message);
      }
    }
  }

  return (
    <div className='w-[100vw] h-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start pt-[20px]'>
        <div className='w-[100%] h-[70px] flex items-center justify-start px-[30px] gap-[8px] cursor-pointer' 
            onClick={() => {navigate('/')}}>
            <img className='w-[40px]' src={Logo} alt=''/>
            <h1 className='text-[22px] font-sans'>OneCart</h1>
        </div>

        <div className='w-[100%] h-[80px] flex items-center justify-center flex-col gap-[6px] mt-[-10px]'>
            <span className='text-[25px] font-semibold'>Registration Page</span>
            <span className='text-[16px] pb-[8px]'>Welcome to OneCart, Place your order</span>
        </div>

        <div className="max-w-[500px] w-[90%] h-[450px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center mb-[40px]">
            <form action="" onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center gap-[10px]'>
                <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignUp}> 
                    <img src={google} alt='Google logo' className='w-[20px]' /> Registration with Google
                </div>
                <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                    <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                </div>

                <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                    <input type='text' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold ' 
                      placeholder='UserName' 
                      required 
                      onChange={(e) => setName(e.target.value)}
                      value={name}/>
                    
                    <input type='email' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold ' 
                      placeholder='Email' required onChange={(e) => setEmail(e.target.value)}
                      value={email}/>
                    
                    <input type={show?"text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold ' 
                      placeholder='Password' required onChange={(e) => setPassword(e.target.value)}
                      value={password}/>
                    {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)}/>}
                    {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)}/>}
                    <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
                        Create Account
                    </button>
                    {errorMsg && (
                        <div className="text-red-400 text-[15px] mt-2 text-center">{errorMsg}</div>
                      )}
                    <p className='flex gap-[10px]'>Already have an account? 
                        <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate('/login')}> 
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration