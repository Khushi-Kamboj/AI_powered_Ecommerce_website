import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
export const userDataContext = createContext();

const UserContext = ({children}) => {
    let [userData , setUserData] = useState(null);
    let [loading, setLoading] = useState(true);
    let {serverUrl} = useContext(authDataContext);

    const getCurrentUser = async() => {
        try{
            let result = await axios.get(serverUrl + "api/user/getcurrentuser" , {withCredentials:true} )
            setUserData(result.data);
            console.log(result.data);
        }catch(error){
            setUserData(null);
            console.log("User not authenticated or error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        getCurrentUser();
    } , [])


    let value = {
        userData,
        setUserData,
        getCurrentUser,
        loading
    }

  return (
    <userDataContext.Provider value={value}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext