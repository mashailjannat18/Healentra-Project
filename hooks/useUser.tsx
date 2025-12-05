'use client';

import { useState, useCallback } from 'react';
import { userLoggedIn } from "@/api/services/dashboard";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

interface UserHookReturn {
    handleFetchUser: () => Promise<{
        success: boolean;
        data?: any;
        error?: string;
    }>;
    
    isLoading: boolean;
    error: string | null;
    user: any;
    resetError: () => void;
    clearUser: () => void;
}

export const useUser = (): UserHookReturn => {
    const token = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const resetError = () => setError(null);
    const clearUser = () => setUser(null);

    const handleFetchUser = useCallback(async (): Promise<{
        success: boolean;
        data?: any;
        error?: string;
    }> => {
        setIsLoading(true);
        setError(null);
        
        try {
            if (!token) {
                const errorMsg = 'Please login to continue';
                setError(errorMsg);
                toast.error(errorMsg);
                router.push('/auth/login');
                return { success: false, error: errorMsg };
            }
            
            const response = await userLoggedIn();
            
            setUser(response.data);
            toast.dismiss();
            return { success: true, data: response.data };
        } catch (error: any) {
            let errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
            
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, [token, router]);

    return { 
        handleFetchUser,
        isLoading,
        error,
        user,
        resetError,
        clearUser
    };
};