import React, {createContext, useContext, useEffect, useState } from 'react'
import {authDataContext} from './AuthContext'
import axios from 'axios';

export const adminDataContext = createContext()

const AdminContext = ({ children }) => {

    let [adminData , setAdminData] = useState(null);
    let [isLoading, setIsLoading] = useState(true); // Start with loading true
    let [error, setError] = useState(null);
    let {serverUrl} = useContext(authDataContext)

    const getAdmin = async() =>{ 
        try{
            setIsLoading(true);
            setError(null);
            
            console.log("Attempting to fetch admin data from:", serverUrl + "/api/user/getadmin");
            
            let result = await axios.get(serverUrl + "/api/user/getadmin" , {
                withCredentials: true,
                timeout: 5000
            })
        
            setAdminData(result.data);
            console.log("Admin data received:", result.data);
        }catch(error){
            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            console.log("Error fetching admin data:", errorMessage);
            
            if (error.response?.status === 400 || error.response?.status === 401) {
                setAdminData(null);
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        if (serverUrl) {
            getAdmin()
        }
    }, [serverUrl])

    let value = {
        adminData,
        setAdminData,
        getAdmin,
        isLoading,
        error
    }

  return (
    <adminDataContext.Provider value={value}>
        {children}
    </adminDataContext.Provider>
  )
}

export default AdminContext