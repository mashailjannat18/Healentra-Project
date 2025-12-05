'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useOnboarding } from '@/hooks/useOnboarding';
import { onboardingInitialValues } from '@/formik/initial-values/dashboard/onboarding';
import { onboardingValidationSchema } from '@/formik/validations/dashboard/onboarding';
import {
    handleOnboardingFormSubmit,
    getNextStepHandler,
    getPreviousStepHandler,
    handleModalClose,
    OnboardingValues
} from '@/utils/onboarding-form-helpers';
import Step1About from '@/components/dashboard/onboarding/Step1About';
import Step2Education from '@/components/dashboard/onboarding/Step2Education';
import Step3Experience from '@/components/dashboard/onboarding/Step3Experience';
import Step4Address from '@/components/dashboard/onboarding/Step4Address';
import Step5Documents from '@/components/dashboard/onboarding/Step5Documents';
import StepProgress from '@/components/dashboard/onboarding/StepProgress';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
    const { handleOnboarding, isLoading, error, resetError, getSpecialities } = useOnboarding();
    const [specializations, setSpecializations] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    
    const hasFetchedSpecializations = useRef(false);
    const isFetching = useRef(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSpecializations = async () => {
        if (isFetching.current || hasFetchedSpecializations.current) return;
        
        isFetching.current = true;
            try {
                const data = await getSpecialities();
                setSpecializations(data || []);
                hasFetchedSpecializations.current = true;
            } finally {
                isFetching.current = false;
            }
        };

        if (isOpen && !hasFetchedSpecializations.current) {
            fetchSpecializations();
        }
    }, [isOpen, getSpecialities]);

    useEffect(() => {
        if (!isOpen) {
            hasFetchedSpecializations.current = false;
        }
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [currentStep]);

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        isSubmitting,
        resetForm,
        setFieldValue,
        touched,
        isValid,
        handleSubmit
    } = useFormik<OnboardingValues>({
        initialValues: onboardingInitialValues,
        validationSchema: onboardingValidationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            handleOnboardingFormSubmit(values, {
                handleOnboarding,
                resetError,
                resetForm,
                setSubmitting,
                onClose
            });
        }
    });

    const steps = [
        { number: 1, name: 'About' },
        { number: 2, name: 'Education' },
        { number: 3, name: 'Experience' },
        { number: 4, name: 'Address' },
        { number: 5, name: 'Documents' }
    ];

    const handleNextStep = getNextStepHandler(
        currentStep,
        values,
        onboardingValidationSchema,
        setCurrentStep
    );

    const handlePreviousStep = getPreviousStepHandler(setCurrentStep);

    if (!isOpen) return null;

    const isSubmittingState = isSubmitting || isLoading;

    const renderStepContent = () => {
        const commonProps = {
            values: values,
            errors: errors,
            touched: touched,
            handleBlur: handleBlur,
            handleChange: handleChange,
            setFieldValue: setFieldValue
        };

        switch (currentStep) {
        case 1:
            return <Step1About {...commonProps} specializations={specializations} />;
        case 2:
            return <Step2Education {...commonProps} />;
        case 3:
            return <Step3Experience {...commonProps} />;
        case 4:
            return <Step4Address {...commonProps} />;
        case 5:
            return <Step5Documents {...commonProps} />;
        default:
            return null;
        }
    };

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                onClick={() => handleModalClose(resetForm, setCurrentStep, onClose)}
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div 
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[95%] flex flex-col animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 pb-4 border-b border-gray-200 shrink-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-md font-bold text-gray-900 mb-1">
                                    Complete Your Onboarding
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    Provide your complete details to proceed
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <StepProgress 
                                steps={steps} 
                                currentStep={currentStep} 
                            />
                        </div>
                    </div>

                    <div 
                        ref={contentRef}
                        className="flex-1 overflow-y-auto px-6 py-4"
                    >
                        <form
                            id="onboarding-form"
                            onSubmit={handleSubmit} 
                            className="h-full"
                        >
                            <div className="min-h-full">
                                {renderStepContent()}
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-xs">{error}</p>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="p-6 pt-4 border-t border-gray-200 shrink-0">
                        <div className="flex justify-between items-center">
                            <div>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        disabled={isSubmittingState}
                                    >
                                        Back
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-4">
                                {currentStep === steps.length ? (
                                    <button
                                        type="submit"
                                        form="onboarding-form"
                                        className="px-6 py-3 bg-[#2CA8E0] text-white rounded-lg hover:bg-[#1e97cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isSubmittingState || !isValid}
                                    >
                                        {isSubmittingState ? 'Submitting...' : 'Complete Onboarding'}
                                    </button>
                                    ) : (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="px-6 py-3 bg-[#2CA8E0] text-white rounded-lg hover:bg-[#1e97cc] transition-colors"
                                        disabled={isSubmittingState}
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}