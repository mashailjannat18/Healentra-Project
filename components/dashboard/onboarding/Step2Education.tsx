'use client';

import React from 'react';
import { onboardingForm } from '@/formik/forms/dashboard/onboarding';
import {
  handleAddCertificate,
  handleRemoveCertificate,
  handleCertificateChange,
  formClasses,
  OnboardingValues
} from '@/utils/onboarding-form-helpers';

interface Step2EducationProps {
  values: OnboardingValues;
  errors: any;
  setFieldValue: any;
}

export default function Step2Education({ 
  values, 
  errors, 
  setFieldValue 
}: Step2EducationProps) {
  const form = onboardingForm;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Education & Certificates</h3>
        <button
          type="button"
          onClick={() => handleAddCertificate(values, setFieldValue)}
          className={formClasses.button.primary + " text-sm"}
        >
          + Add Certificate
        </button>
      </div>

      {values.certificates.map((certificate, index) => (
        <div key={certificate.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900">Certificate #{index + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemoveCertificate(index, values, setFieldValue)}
              className={formClasses.button.danger}
            >
              Remove
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={formClasses.label}>
                {form.certificateName.label} *
              </label>
              <input
                type="text"
                value={certificate.name}
                onChange={(e) => handleCertificateChange(index, 'name', e.target.value, values, setFieldValue)}
                placeholder={form.certificateName.placeholder}
                className={formClasses.input(!!errors.certificates?.[index]?.name)}
              />
              {errors.certificates?.[index]?.name && (
                <p className={formClasses.error}>{errors.certificates[index].name}</p>
              )}
            </div>

            <div>
              <label className={formClasses.label}>
                {form.certificateInstitution.label} *
              </label>
              <input
                type="text"
                value={certificate.institution}
                onChange={(e) => handleCertificateChange(index, 'institution', e.target.value, values, setFieldValue)}
                placeholder={form.certificateInstitution.placeholder}
                className={formClasses.input(!!errors.certificates?.[index]?.institution)}
              />
              {errors.certificates?.[index]?.institution && (
                <p className={formClasses.error}>{errors.certificates[index].institution}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={formClasses.label}>
                  {form.certificateStartDate.label} *
                </label>
                <input
                  type="date"
                  value={certificate.startDate}
                  onChange={(e) => handleCertificateChange(index, 'startDate', e.target.value, values, setFieldValue)}
                  className={formClasses.input(!!errors.certificates?.[index]?.startDate)}
                  max={(() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return yesterday.toISOString().split('T')[0];
                  })()}
                />
                {errors.certificates?.[index]?.startDate && (
                  <p className={formClasses.error}>{errors.certificates[index].startDate}</p>
                )}
              </div>

              <div>
                <label className={formClasses.label}>
                  {form.certificateEndDate.label} *
                </label>
                <input
                  type="date"
                  value={certificate.endDate}
                  onChange={(e) => handleCertificateChange(index, 'endDate', e.target.value, values, setFieldValue)}
                  className={formClasses.input(!!errors.certificates?.[index]?.endDate)}
                />
                {errors.certificates?.[index]?.endDate && (
                  <p className={formClasses.error}>{errors.certificates[index].endDate}</p>
                )}
              </div>
            </div>

            <div>
              <label className={formClasses.label}>
                {form.certificateDescription.label}
              </label>
              <textarea
                value={certificate.description}
                onChange={(e) => handleCertificateChange(index, 'description', e.target.value, values, setFieldValue)}
                rows={3}
                placeholder={form.certificateDescription.placeholder}
                className={formClasses.input(false, "resize-none")}
              />
            </div>
          </div>
        </div>
      ))}

      {values.certificates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No certificates added yet. Click "Add Certificate" to get started.</p>
        </div>
      )}

      {typeof errors.certificates === 'string' && (
        <p className="text-red-600 text-sm mt-2">{errors.certificates}</p>
      )}
    </div>
  );
}