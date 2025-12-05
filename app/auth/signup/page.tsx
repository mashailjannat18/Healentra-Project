'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Logo from '@/assets/logo.svg';
import Dropdown from '@/assets/down.png';
import RightImage from '@/assets/doctorConsulLeft.svg';
import '@/styles/signup.css';
import { signupForm } from '@/formik/forms/auth';
import { signupValidationSchema } from '@/formik/validations/auth';
import { signupInitialValues } from '@/formik/initial-values/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const form = signupForm;

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const { handleSignup, isLoading, error, resetError } = useAuth();

    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setSubmitting,
        isValid,
        setFieldValue,
        setFieldTouched,
    } = useFormik({
        initialValues: signupInitialValues,
        validationSchema: signupValidationSchema,
        onSubmit: (values,  { resetForm }) => {
            resetError();
            
            try {
                handleSignup(values);
                resetForm();
            } finally {
                setSubmitting(false);
            }
        },
    });

    const isSubmittingState = isSubmitting || isLoading;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <div className="lg:w-[60%] w-full min-h-[50vh] lg:min-h-screen p-5 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center order-1 lg:order-1">
                    <div className="max-w-2xl mx-auto w-full">
                        <div className="mb-8 sm:mb-10">
                            <div className="flex items-center justify-between mb-8 sm:mb-10 lg:mb-12">
                                <Image
                                    src={Logo}
                                    alt="Company Logo"
                                    height={36}
                                    width={120}
                                    className="object-contain w-auto h-8 sm:h-9 md:h-10"
                                />
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Already have an account?{' '}
                                <a href="/auth/login" className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors">
                                    Sign in
                                </a>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.firstName.label}
                                    </label>
                                    <input
                                        type={form.firstName.type}
                                        name={form.firstName.name}
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={form.firstName.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.firstName && errors.firstName
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors placeholder:text-gray-300 text-black`}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.lastName.label}
                                    </label>
                                    <input
                                        type={form.lastName.type}
                                        name={form.lastName.name}
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={form.lastName.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.lastName && errors.lastName
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors placeholder:text-gray-300 text-black`}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.dob.label}
                                    </label>
                                    <input
                                        type={form.dob.type}
                                        name={form.dob.name}
                                        value={values.dob}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        max={(() => {
                                            const yesterday = new Date();
                                            yesterday.setDate(yesterday.getDate() - 1);
                                            return yesterday.toISOString().split('T')[0];
                                        })()}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.dob && errors.dob
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors text-black`}
                                    />
                                    {touched.dob && errors.dob && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.dob}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.email.label}
                                    </label>
                                    <input
                                        type={form.email.type}
                                        name={form.email.name}
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={form.email.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.email && errors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors placeholder:text-gray-300 text-black`}
                                    />
                                    {touched.email && errors.email && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.phone.label}
                                    </label>
                                    <PhoneInput
                                        defaultCountry="us"
                                        value={values.phoneNo}
                                        onChange={(phone) => setFieldValue('phoneNo', phone)}
                                        onBlur={() => setFieldTouched('phoneNo', true)}
                                        inputProps={{
                                            name: 'phone',
                                            className: `w-full px-4 py-3 rounded-r-lg rounded-l-none border text-sm sm:text-base ${
                                                touched.phoneNo && errors.phoneNo
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                            } focus:outline-none transition-colors text-black`,
                                        }}
                                        countrySelectorStyleProps={{
                                            className: 'rounded-l-lg border',
                                            buttonClassName: `countrySelector h-full ${
                                                touched.phoneNo && errors.phoneNo ? 'border-red-500' : 'border-gray-300'
                                            }`,
                                        }}
                                    />
                                    {touched.phoneNo && errors.phoneNo && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.phoneNo}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.gender.label}
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3 rounded-lg border appearance-none bg-white pr-10 text-sm sm:text-base ${
                                                touched.gender && errors.gender
                                                    ? 'border-red-500 focus:border-red-500'
                                                    : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                            } focus:outline-none transition-colors text-black`}
                                        >
                                            {form.gender.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <Image src={Dropdown} alt="dropdown" width={12} height={12} className="opacity-60" />
                                        </div>
                                    </div>
                                    {touched.gender && errors.gender && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.gender}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.address.label}
                                    </label>
                                    <input
                                        type={form.address.type}
                                        name={form.address.name}
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={form.address.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.address && errors.address
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors placeholder:text-gray-300 text-black`}
                                    />
                                    {touched.address && errors.address && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {form.city.label}
                                    </label>
                                    <input
                                        type={form.city.type}
                                        name={form.city.name}
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={form.city.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.city && errors.city
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors placeholder:text-gray-300 text-black`}
                                    />
                                    {touched.city && errors.city && (
                                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.city}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {form.password.label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name={form.password.name}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={form.password.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border text-sm sm:text-base ${
                                            touched.password && errors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                                        } focus:outline-none transition-colors placeholder:text-gray-300 text-black`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye size={18} className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmittingState || !isValid}
                                className={`w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-white transition-all text-sm sm:text-base ${
                                    isValid
                                        ? 'bg-[#2ba8e0] hover:bg-[#1e97cc] shadow-lg hover:shadow-xl active:scale-[0.98]'
                                        : 'bg-gray-300 cursor-not-allowed'
                                } ${isSubmittingState ? 'opacity-70' : ''}`}
                            >
                                {isSubmittingState ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:w-[40%] w-full min-h-[50vh] lg:min-h-screen bg-[#001439] p-5 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center items-center text-white relative overflow-hidden order-2 lg:order-2">
                    <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-130 lg:h-130 bg-blue-100/10 rounded-full -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-8 sm:translate-x-16 lg:translate-x-32"></div>

                    <div className="self-center mb-8 sm:mb-10 w-full">
                        <a href="#" className="flex items-center justify-center gap-2 text-white hover:text-white transition-colors text-sm sm:text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 1c-5 0-9 4-9 9v7a3 3 0 0 0 3 3h3v-8H5v-2a7 7 0 0 1 7-7a7 7 0 0 1 7 7v2h-4v8h3a3 3 0 0 0 3-3v-7c0-5-4.03-9-9-9"/>
                            </svg>
                            Support
                        </a>
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full mb-8 sm:mb-10">
                        <Image
                            src={RightImage}
                            alt="Healthcare illustration"
                            width={280}
                            height={280}
                            className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 max-w-full"
                        />
                    </div>

                    <div className="text-center max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                            Unlock all features of healentra
                        </h2>
                        <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed">
                            Unlock the full potential of Healentra with complete access to advanced medical services, personalized health tools, secure patient records, smart scheduling, and seamless online consultations—all in one place.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}