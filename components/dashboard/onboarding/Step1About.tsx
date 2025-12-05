'use client';

import React, { useState, useRef, useEffect } from 'react';
import { onboardingForm } from '@/formik/forms/dashboard/onboarding';
import {
    handleSpecializationSelect,
    formClasses,
    OnboardingValues,
    handleRemoveSpecialization
} from '@/utils/onboarding-form-helpers';

interface Step1AboutProps {
    values: OnboardingValues;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
    setFieldValue: any;
    specializations: any[];
}

export default function Step1About({ 
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    setFieldValue, 
    specializations 
}: Step1AboutProps) {
    const form = onboardingForm;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const availableSpecializations = specializations.filter(
        spec => !values.specialization.includes(spec.id)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const hasSpecializationError = touched.specialization && errors.specialization;

    const handleRemove = (e, index) => handleRemoveSpecialization(index, e, values, setFieldValue)

    return (
        <div className="space-y-4">
            <div className="mb-3">
                <label className={formClasses.label}>
                    {form.specialization.label} *
                </label>
                
                <div ref={dropdownRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onBlur={handleBlur}
                        name="specialization"
                        className={`w-full min-h-12 px-4 py-3 text-xs rounded-lg border transition-colors text-left flex flex-wrap items-center gap-2 ${
                            values.specialization.length === 0 ? 'justify-between' : 'justify-start'
                            } ${
                            hasSpecializationError 
                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                                : 'border-gray-300 focus:border-[#2CA8E0] focus:ring-2 focus:ring-[#2CA8E0]/20'
                            } focus:outline-none`}
                    >
                        <div className="flex flex-wrap gap-2 flex-1">
                            {values.specialization.length === 0 ? (
                                <span>
                                    Choose your specialization
                                </span>
                            ) : (
                                values.specialization.map((specId: string, index: number) => {
                                    const spec = specializations.find(s => s.id === specId);
                                    return (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                                        >
                                            {spec?.name || 'Unknown'}
                                            <button
                                                type="button"
                                                onClick={(e) => handleRemove(e, index)}
                                                className="ml-1 text-blue-800 hover:text-blue-900 text-xs leading-none w-4 h-4 flex items-center justify-center"
                                                aria-label={`Remove ${spec?.name || 'specialization'}`}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    );
                                })
                            )}
                        </div>
                        
                        <svg
                            className={`w-4 h-4 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''} ${
                                hasSpecializationError ? 'text-red-500' : 'text-gray-500'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2">
                                {availableSpecializations.length === 0 ? (
                                    <div className="px-4 py-3 text-xs text-gray-500 text-center">
                                        {specializations.length === 0 
                                        ? 'Loading specializations...' 
                                        : 'All specializations have been selected'}
                                    </div>
                                    ) : (
                                    availableSpecializations.map((spec) => (
                                        <button
                                                key={spec.id}
                                                type="button"
                                                onClick={() => handleSpecializationSelect(spec.id, values, setFieldValue)}
                                                className="w-full px-4 py-3 text-xs text-left hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                                        >
                                            {spec.name}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                    
                    {hasSpecializationError && (
                        <p className="mt-1 text-xs text-red-600">{errors.specialization}</p>
                    )}
                </div>
            </div>

            <div>
                <label className={formClasses.label}>
                    {form.yearsOfExperience.label} *
                </label>
                <input
                    type="number"
                    name="yearsOfExperience"
                    value={values.yearsOfExperience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="0"
                    max="50"
                    placeholder={form.yearsOfExperience.placeholder}
                    className={formClasses.input(!!(touched.yearsOfExperience && errors.yearsOfExperience))}
                />
                {touched.yearsOfExperience && errors.yearsOfExperience && (
                    <p className={formClasses.error}>{errors.yearsOfExperience}</p>
                )}
            </div>

            <div>
                <label className={formClasses.label}>
                    {form.about.label} *
                </label>
                <textarea
                    name="about"
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder={form.about.placeholder}
                    className={formClasses.input(!!(touched.about && errors.about), "resize-none")}
                />
                {touched.about && errors.about && (
                    <p className={formClasses.error}>{errors.about}</p>
                )}
            </div>
        </div>
    );
}