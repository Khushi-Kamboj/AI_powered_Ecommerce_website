import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { getBackendUrl, detectBackendPort } from '../utils/backendDetector.js'

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
    const [serverUrl, setServerUrl] = useState(getBackendUrl());

    useEffect(() => {
        // Try to detect the correct backend port on component mount
        const detectPort = async () => {
            try {
                const detectedUrl = await detectBackendPort();
                setServerUrl(detectedUrl);
                console.log("Detected backend URL:", detectedUrl);
            } catch (error) {
                console.log("Using fallback backend URL:", serverUrl);
            }
        };

        detectPort();
    }, []);

    let value = {
        serverUrl: serverUrl
    }

  return (
    <authDataContext.Provider value={value}>
        {children}
    </authDataContext.Provider>
  )
}

export default AuthContext