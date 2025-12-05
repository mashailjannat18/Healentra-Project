'use client';

import React from 'react';
import { onboardingForm } from '@/formik/forms/dashboard/onboarding';
import {
    handleAddExperience,
    handleRemoveExperience,
    handleExperienceChange,
    formClasses,
    OnboardingValues
} from '@/utils/onboarding-form-helpers';

interface Step3ExperienceProps {
    values: OnboardingValues;
    errors: any;
    setFieldValue: any;
}

export default function Step3Experience({ 
    values, 
    errors, 
    setFieldValue 
}: Step3ExperienceProps) {
  const form = onboardingForm;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-md font-semibold text-gray-900">Work Experience</h3>
                <button
                    type="button"
                    onClick={() => handleAddExperience(values, setFieldValue)}
                    className={formClasses.button.primary + " text-xs"}
                >
                    + Add Experience
                </button>
            </div>

            {values.experiences.map((experience, index) => (
                <div key={experience.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => handleRemoveExperience(index, values, setFieldValue)}
                            className={formClasses.button.danger}
                        >
                            Remove
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className={formClasses.label}>
                                {form.experienceHospital.label} *
                            </label>
                            <input
                                type="text"
                                value={experience.hospital}
                                onChange={(e) => handleExperienceChange(index, 'hospital', e.target.value, values, setFieldValue)}
                                placeholder={form.experienceHospital.placeholder}
                                className={formClasses.input(!!errors.experiences?.[index]?.hospital)}
                            />
                            {errors.experiences?.[index]?.hospital && (
                                <p className={formClasses.error}>{errors.experiences[index].hospital}</p>
                            )}
                        </div>

                        <div>
                            <label className={formClasses.label}>
                                {form.experiencePosition.label} *
                            </label>
                            <input
                                type="text"
                                value={experience.position}
                                onChange={(e) => handleExperienceChange(index, 'position', e.target.value, values, setFieldValue)}
                                placeholder={form.experiencePosition.placeholder}
                                className={formClasses.input(!!errors.experiences?.[index]?.position)}
                            />
                            {errors.experiences?.[index]?.position && (
                                <p className={formClasses.error}>{errors.experiences[index].position}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={formClasses.label}>
                                    {form.experienceStartDate.label} *
                                </label>
                                <input
                                    type="date"
                                    value={experience.startDate}
                                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value, values, setFieldValue)}
                                    className={formClasses.input(!!errors.experiences?.[index]?.startDate)}
                                    max={(() => {
                                        const yesterday = new Date();
                                        yesterday.setDate(yesterday.getDate() - 1);
                                        return yesterday.toISOString().split('T')[0];
                                    })()}
                                />
                                {errors.experiences?.[index]?.startDate && (
                                    <p className={formClasses.error}>{errors.experiences[index].startDate}</p>
                                )}
                            </div>

                            <div>
                                <label className={formClasses.label}>
                                    {form.experienceEndDate.label} *
                                </label>
                                <input
                                    type="date"
                                    value={experience.endDate}
                                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value, values, setFieldValue)}
                                    className={formClasses.input(!!errors.experiences?.[index]?.endDate)}
                                />
                                {errors.experiences?.[index]?.endDate && (
                                    <p className={formClasses.error}>{errors.experiences[index].endDate}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className={formClasses.label}>
                                {form.experienceDescription.label}
                            </label>
                            <textarea
                                value={experience.description}
                                onChange={(e) => handleExperienceChange(index, 'description', e.target.value, values, setFieldValue)}
                                rows={3}
                                placeholder={form.experienceDescription.placeholder}
                                className={formClasses.input(false, "resize-none")}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {values.experiences.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>No work experiences added yet. Click "Add Experience" to get started.</p>
                </div>
            )}

            {typeof errors.experiences === 'string' && (
                <p className="text-red-600 text-xs mt-2">{errors.experiences}</p>
            )}
        </div>
    );
}