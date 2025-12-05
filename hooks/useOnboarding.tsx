'use client';

import { useState } from 'react';
import { specialities, onboarding } from '@/api/services/dashboard/onboarding';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface OnboardingHookReturn {
    handleOnboarding: (formData: FormData) => Promise<{
        success: boolean;
        data?: any;
        error?: string;
    }>;
    getSpecialities: () => Promise<any[]>;
    isLoading: boolean;
    error: string | null;
    resetError: () => void;
}

export const useOnboarding = (): OnboardingHookReturn => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetError = () => setError(null);

    const getSpecialities = async () => {
        try {
            const response = await specialities();
            return response.data.data.map((spec: any) => ({
                id: spec._id,
                name: spec.name
            }));
        } catch (error: any) {
            console.error("Error fetching specialities:", error);
            toast.error('Failed to fetch specializations');
            return [];
        }
    };

    const handleOnboarding = async (formData: FormData): Promise<{
        success: boolean;
        data?: any;
        error?: string;
    }> => {
        setIsLoading(true);
        setError(null);
        
        try {
            console.log('Submitting FormData:');
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            const response = await onboarding(formData);
            
            toast.success('Onboarding completed successfully!');
            router.push('/dashboard');
            return { success: true, data: response.data };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Onboarding failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
            
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleOnboarding,
        getSpecialities,
        isLoading,
        error,
        resetError
    };
};