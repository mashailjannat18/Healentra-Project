'use client';

import React from 'react';
import {
    handleFileUpload,
    formatFileSize,
    getAcceptedFileTypes,
    formClasses,
    OnboardingValues
} from '@/utils/onboarding-form-helpers';

interface Step5DocumentsProps {
    values: OnboardingValues;
    errors: any;
    touched: any;
    setFieldValue: any;
}

export default function Step5Documents({ 
    values, 
    errors, 
    touched,
    setFieldValue 
}: Step5DocumentsProps) {
    const documentFields = [
        {
            name: 'medicalLicense' as const,
            label: 'Medical License *'
        },
        {
            name: 'deaCertificate' as const,
            label: 'DEA Certificate *'
        },
        {
            name: 'boardCertification' as const,
            label: 'Board Certification *'
        },
        {
            name: 'medicalSchoolDiploma' as const,
            label: 'Medical School Diploma *'
        },
        {
            name: 'governmentID' as const,
            label: 'Government Issued ID *'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Documents</h3>
                <p className="text-sm text-gray-600">
                    Please upload all required documents (PDF, JPG, PNG, DOC, DOCX)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentFields.slice(0, 4).map((field) => (
                    <div key={field.name}>
                        <label className={formClasses.label}>
                            {field.label}
                        </label>
                        <div className="space-y-2">
                        <input
                            type="file"
                            accept={getAcceptedFileTypes()}
                            onChange={(e) => handleFileUpload(field.name, e.target.files?.[0] || null, setFieldValue)}
                            className={formClasses.input(
                            !!(touched[field.name] && errors[field.name]),
                            formClasses.button.file
                            )}
                        />
                        {values[field.name] && (
                            <p className="text-sm text-green-600">
                                ✓ {(values[field.name] as File).name} ({formatFileSize((values[field.name] as File).size)})
                            </p>
                        )}
                        {touched[field.name] && errors[field.name] && (
                            <p className={formClasses.error}>{errors[field.name]}</p>
                        )}
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <label className={formClasses.label}>
                    {documentFields[4].label}
                </label>
                <div className="space-y-2">
                    <input
                        type="file"
                        accept={getAcceptedFileTypes()}
                        onChange={(e) => handleFileUpload('governmentID', e.target.files?.[0] || null, setFieldValue)}
                        className={formClasses.input(
                            !!(touched.governmentID && errors.governmentID),
                            formClasses.button.file
                        )}
                    />
                    {values.governmentID && (
                        <p className="text-sm text-green-600">
                            ✓ {values.governmentID.name} ({formatFileSize(values.governmentID.size)})
                        </p>
                    )}
                    {touched.governmentID && errors.governmentID && (
                        <p className={formClasses.error}>{errors.governmentID}</p>
                    )}
                </div>
            </div>
        </div>
    );
}