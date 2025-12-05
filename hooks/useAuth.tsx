'use client';

import { useState } from 'react';
import { signupDoctor, loginUser } from '@/api/services/auth';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setToken } from '@/redux/slices/auth-slice';

interface SignupPayload {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    password: string;
    gender: string;
    phoneNo: string;
    address: string;
    city: string;
    role: string;
}

interface LoginPayload {
    email: string;
    password: string;
    role?: string;
}

interface AuthHookReturn {
    handleLogin: (payload: LoginPayload) => Promise<{
        success: boolean;
        error?: string;
        data?: any;
    }>;
    handleSignup: (payload: SignupPayload) => Promise<{
        success: boolean;
        error?: string;
        data?: any;
    }>;
    
    isLoading: boolean;
    error: string | null;
    resetError: () => void;
}

export const useAuth = (): AuthHookReturn => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetError = () => setError(null);

    const handleLogin = async (payload: LoginPayload): Promise<{
        success: boolean;
        error?: string;
        data?: any;
    }> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await loginUser(payload);
            
            if (response) {
                if (response.data?.token) {
                    dispatch(setToken(response.data.token));
                }
            }
            
            toast.success('Logged in successfully!');
            router.push('/dashboard');
            return { success: true, data: response.data };
        } catch (error: any) {
            let errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
            setError(errorMessage);
            toast.error(errorMessage);
            
            return { success: false, error: errorMessage};
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (payload: SignupPayload): Promise<{
        success: boolean;
        error?: string;
        data?: any;
    }> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await signupDoctor(payload);
            
            toast.success('Account created successfully! Please verify your email.');
            router.push('/auth/login');
            return { success: true, data: response.data };
        } catch (error: any) {
            let errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
            
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleLogin,
        handleSignup,
        isLoading,
        error,
        resetError
    };
};