'use client';

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import OnboardingModal from "@/components/dashboard/onboarding/OnboardingModal";

export default function Home() {
    const { handleFetchUser, isLoading, error, user } = useUser();
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        handleFetchUser();
    }, [handleFetchUser]);

    useEffect(() => {
        if (user && user.data) {
            const userData = user.data;
            const hasEmptySpecialities = 
                !userData.specialities || 
                userData.specialities.length === 0 ||
                (userData.specialities && userData.specialities.length === 0);
            
            if (hasEmptySpecialities) {
                setTimeout(() => {
                    setShowOnboarding(true);
                }, 500);
            }
        }
    }, [user]);

    const handleCloseOnboarding = () => {
        setShowOnboarding(false);
        handleFetchUser();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-white text-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2CA8E0]"></div>
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-white text-black">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error: {error}</p>
                    <button
                        onClick={handleFetchUser}
                        className="px-4 py-2 bg-[#2CA8E0] text-white rounded-lg hover:bg-[#1e97cc]"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <div className={`transition-all duration-300 ${showOnboarding ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="p-8">
                    <header className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">
                                Welcome, <span className="font-semibold">{user?.data?.firstName || 'Doctor'}</span>
                            </span>
                        </div>
                    </header>
                </div>
            </div>

            <OnboardingModal 
                isOpen={showOnboarding} 
                onClose={handleCloseOnboarding} 
            />
        </div>
    );
}