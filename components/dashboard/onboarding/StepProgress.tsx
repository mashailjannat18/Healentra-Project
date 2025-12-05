'use client';

import React from 'react';

interface Step {
    number: number;
    name: string;
}

interface StepProgressProps {
    steps: Step[];
    currentStep: number;
}

export default function StepProgress({ steps, currentStep }: StepProgressProps) {
    return (
        <div className="flex items-center justify-center">
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center relative">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                            ${currentStep > step.number ? 'bg-green-500 text-white' : ''}
                            ${currentStep === step.number ? 'bg-[#2CA8E0] text-white scale-110 shadow-lg' : ''}
                            ${currentStep < step.number ? 'bg-gray-200 text-gray-400' : ''}
                            transition-all duration-300 z-10
                        `}>
                            {currentStep > step.number ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                            ) : (
                                step.number
                            )}
                        </div>
                        <span className={`
                            mt-2 text-xs font-medium
                            ${currentStep === step.number ? 'text-[#2CA8E0] font-semibold' : 'text-gray-500'}
                            transition-colors duration-300
                        `}>
                            {step.name}
                        </span>
                    </div>
                    
                    {index < steps.length - 1 && (
                        <div className={`
                            flex-1 h-0.5 mx-2 mb-5
                            ${currentStep > step.number + 1 ? 'bg-green-500' : 'bg-gray-200'}
                            transition-colors duration-300
                            w-50 md:w-26
                        `} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}