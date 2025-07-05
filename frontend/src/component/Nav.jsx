import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { userDataContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';

export const Nav = () => {
    let { getCurrentUser, userData } = useContext(userDataContext);
    let { serverUrl } = useContext(authDataContext)
    let [showSearch, setShowSearch] = useState(false);
    let [showProfile, setshowProfile] = useState(false);
    let navigate = useNavigate();

  
    const handleLogout = async () => {
        try {
            // Remove trailing slash if present
            const apiUrl = serverUrl.replace(/\/$/, '') + '/api/auth/logout';
            const result = await axios.get(apiUrl, { withCredentials: true });
            console.log(result.data);
            await getCurrentUser(); // ensure userData is updated
            setshowProfile(false); // close profile menu after logout
            navigate('/login'); // redirect to login page after logout
        } catch (error) {
            if (error.response) {
                console.log("Logout error:", error.response.data);
            } else if (error.request) {
                console.log("No response during logout:", error.request);
            } else {
                console.log("Logout error:", error.message);
            }
            setshowProfile(false); // close profile menu even on error
        }
    }

    // Helper to get first letter (name or email)
    const getUserInitial = () => {
        if (userData?.name && userData.name.length > 0) {
            return userData.name.slice(0, 1).toUpperCase();
        } else if (userData?.email && userData.email.length > 0) {
            return userData.email.slice(0, 1).toUpperCase();
        }
        return "?";
    };

    return (
        <div className='w-[100vw] h-[65px] bg-[#ecfafaec] z-50 fixed top-0 flex items-center justify-between px-[20px] shadow-md shadow-black'>
           
            <div className='flex items-center justify-start gap-[8px] w-[40%] sm:w-[20%] min-w-0'>
                <img src={logo} alt='' className='w-[24px] sm:w-[28px]'/>
                <h1 className='text-[18px] sm:text-[25px] truncate'>OneCart</h1>
            </div>
            <div className='w-[50%] hidden md:flex'>
                <ul className='flex items-center justify-center gap-[19px] text-[#222]'>
                    <li className='text-[16px] cursor-pointer text-[#222] py-[8px] px-[20px] rounded-2xl hover:font-bold transition-all duration-300 ease-in-out hover:underline underline-offset-4'>
                        HOME
                    </li>
                    <li className='text-[16px] cursor-pointer text-[#222] py-[8px] px-[20px] rounded-2xl hover:font-bold transition-all duration-300 ease-in-out hover:underline underline-offset-4'>
                        COLLECTIONS
                    </li>
                    <li className='text-[16px] cursor-pointer text-[#222] py-[8px] px-[20px] rounded-2xl hover:font-bold transition-all duration-300 ease-in-out hover:underline underline-offset-4'>
                        ABOUT
                    </li>
                    <li className='text-[16px] cursor-pointer text-[#222] py-[8px] px-[20px] rounded-2xl hover:font-bold transition-all duration-300 ease-in-out hover:underline underline-offset-4'>
                        CONTACT
                    </li>
                </ul>
            </div>

            <div className='flex items-center justify-end gap-[14px] w-[60%] sm:w-[25%] min-w-0 relative'>
                {!showSearch && <IoSearchCircleOutline className='w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)}/> }
                {showSearch && <IoSearchCircle className='w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)}/>}
                {!userData && <FaUserCircle className='w-[24px] h-[22px] sm:w-[28px] sm:h-[26px] text-[#000000] cursor-pointer' onClick={() =>setshowProfile(prev => !prev)}/>}
                {userData && (
                    <div
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-[#080808] text-white text-xs rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setshowProfile(prev => !prev)}
                    >
                        {getUserInitial()}
                    </div>
                )}
                <div className="relative flex items-center justify-center">
                    <MdOutlineShoppingCart className='w-[24px] h-[30px] sm:w-[28px] sm:h-[38px] text-[#000000] cursor-pointer hidden md:block'/>
                    <p className='flex items-center justify-center absolute w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] bg-black text-white rounded-full text-[10px] top-[-6px] right-[-8px] z-10 hidden md:block text-center'>10</p>
                </div>
            </div>

            {showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
                <input type='text' className='w-[80%] sm:w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[30px] sm:px-[50px] placeholder:text-white text-[white] text-[16px] sm:text-[18px]'
                placeholder='Search-here'
                />
            </div>}

            {showProfile && (
                <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] md:rounded-[10px] rounded-b-[20px] md:rounded-b-[10px] z-10 overflow-hidden'>
                    <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white]'>
                        {!userData && (
                            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => {
                                navigate('/login')
                                setshowProfile(false);
                            }}>
                                Login
                            </li>
                        )}
                        {userData && (
                            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{
                                handleLogout();
                                setshowProfile(false);
                            }}>
                                Logout
                            </li>
                        )}
                        <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>Order</li>
                        <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>About</li>
                    </ul>
                </div>
            )}

            <div className='w-[100vw] h-[60px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden text-[12px]'>  
                <button className='text-white flex items-center justify-center flex-col gap-[2px]'><IoMdHome className='w-[25px] h-[25px] text-[white] md:hidden'/>Home</button>
                <button className='text-white flex items-center justify-center flex-col gap-[2px]'><HiOutlineCollection className='w-[25px] h-[25px] text-[white] md:hidden'/>Collections</button>
                <button className='text-white flex items-center justify-center flex-col gap-[2px]'><RiContactsBook2Fill className='w-[25px] h-[25px] text-[white] md:hidden'/>Contact</button>
                <button className='text-white flex items-center justify-center flex-col gap-[2px]'><MdOutlineShoppingCart  className='w-[25px] h-[25px] text-[white] md:hidden'/>Cart</button>
            </div>
        </div>
    )
}
