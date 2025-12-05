'use client';

import React from 'react';
import { onboardingForm, countryOptions } from '@/formik/forms/dashboard/onboarding';
import { formClasses, OnboardingValues } from '@/utils/onboarding-form-helpers';

interface Step4AddressProps {
    values: OnboardingValues;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
}

export default function Step4Address({ 
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange 
}: Step4AddressProps) {
    const form = onboardingForm;

    return (
        <div className="space-y-6">
            <div>
                <label className={formClasses.label}>
                    {form.streetAddress.label} *
                </label>
                <input
                    type="text"
                    name="streetAddress"
                    value={values.streetAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={form.streetAddress.placeholder}
                    className={formClasses.input(!!(touched.streetAddress && errors.streetAddress))}
                />
                {touched.streetAddress && errors.streetAddress && (
                    <p className={formClasses.error}>{errors.streetAddress}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={formClasses.label}>
                        {form.city.label} *
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.city.placeholder}
                        className={formClasses.input(!!(touched.city && errors.city))}
                    />
                    {touched.city && errors.city && (
                        <p className={formClasses.error}>{errors.city}</p>
                    )}
                </div>

                <div>
                    <label className={formClasses.label}>
                        {form.state.label} *
                    </label>
                    <input
                        type="text"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.state.placeholder}
                        className={formClasses.input(!!(touched.state && errors.state))}
                    />
                    {touched.state && errors.state && (
                        <p className={formClasses.error}>{errors.state}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={formClasses.label}>
                        {form.country.label} *
                    </label>
                    <select
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={formClasses.input(!!(touched.country && errors.country))}
                    >
                        {countryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {touched.country && errors.country && (
                        <p className={formClasses.error}>{errors.country}</p>
                    )}
                </div>

                <div>
                    <label className={formClasses.label}>
                        {form.zipCode.label} *
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.zipCode.placeholder}
                        className={formClasses.input(!!(touched.zipCode && errors.zipCode))}
                    />
                    {touched.zipCode && errors.zipCode && (
                        <p className={formClasses.error}>{errors.zipCode}</p>
                    )}
                </div>
            </div>
        </div>
    );
}