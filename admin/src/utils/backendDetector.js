export const detectBackendPort = async () => {
    const ports = [8000, 6000, 5000, 3001, 3000];
    
    for (const port of ports) {
        try {
            const response = await fetch(`http://localhost:${port}/api/auth/adminlogin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                signal: AbortSignal.timeout(2000)
            });
            
            console.log(`Backend detected on port ${port}`);
            return `http://localhost:${port}`;
        } catch (error) {
            try {
                const response = await fetch(`http://localhost:${port}`, {
                    method: 'GET',
                    signal: AbortSignal.timeout(1000)
                });
                console.log(`Backend detected on port ${port}`);
                return `http://localhost:${port}`;
            } catch (innerError) {
                continue;
            }
        }
    } 
    
    console.log("No backend server detected, using default port 8000");
    return "http://localhost:8000";
};

export const getBackendUrl = () => {
    if (import.meta.env.VITE_BACKEND_URL) {
        return import.meta.env.VITE_BACKEND_URL;
    }
    
    if (import.meta.env.VITE_BACKEND_PORT) {
        return `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;
    }
    
    return "http://localhost:8000";
}; 