import * as Yup from 'yup';

export interface Certificate {
  id: number;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: number;
  hospital: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface OnboardingValues {
  specialization: string[];
  yearsOfExperience: string;
  about: string;
  certificates: Certificate[];
  experiences: Experience[];
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  medicalLicense: File | null;
  deaCertificate: File | null;
  boardCertification: File | null;
  medicalSchoolDiploma: File | null;
  governmentID: File | null;
}

export const prepareOnboardingFormData = (values: OnboardingValues): FormData => {
  const formData = new FormData();
  
  values.specialization.forEach((id: string) => {
    formData.append('specialities[]', id);
  });

  formData.append('experience', values.yearsOfExperience || '');
  formData.append('about', values.about || '');
  formData.append('NoOfYearExperience', values.yearsOfExperience || '');
  formData.append('consultationFee', '0');
  formData.append('languages', 'English');

  const education = values.certificates.map((cert) => ({
    degree: cert.name,
    institute: cert.institution,
    certificateStartDate: cert.startDate || '',
    certificateEndDate: cert.endDate || '',
    description: cert.description || ''
  }));
  formData.append('education', JSON.stringify(education));

  const experiences = values.experiences.map((exp) => ({
    hospital: exp.hospital,
    position: exp.position,
    from: exp.startDate || '',
    to: exp.endDate || '',
    description: exp.description || ''
  }));
  formData.append('experiences', JSON.stringify(experiences));

  formData.append('address[street]', values.streetAddress || '');
  formData.append('address[city]', values.city || '');
  formData.append('address[state]', values.state || '');
  formData.append('address[country]', values.country || '');
  formData.append('address[zipCode]', values.zipCode || '');

  if (values.medicalLicense) formData.append('medicalLicense', values.medicalLicense);
  if (values.deaCertificate) formData.append('deaCertificate', values.deaCertificate);
  if (values.boardCertification) formData.append('boardCertification', values.boardCertification);
  if (values.medicalSchoolDiploma) formData.append('medicalSchoolDiploma', values.medicalSchoolDiploma);
  if (values.governmentID) formData.append('governmentId', values.governmentID);

  return formData;
};

export const validateOnboardingStep = async (
  step: number,
  values: OnboardingValues,
  validationSchema: Yup.ObjectSchema<any>
): Promise<Record<string, string>> => {
  let stepSchema: Yup.ObjectSchema<any>;
  
  switch (step) {
    case 1:
      stepSchema = validationSchema.pick(['specialization', 'yearsOfExperience', 'about']);
      break;
    case 2:
      stepSchema = validationSchema.pick(['certificates']);
      break;
    case 3:
      stepSchema = validationSchema.pick(['experiences']);
      break;
    case 4:
      stepSchema = validationSchema.pick(['streetAddress', 'city', 'state', 'country', 'zipCode']);
      break;
    case 5:
      stepSchema = validationSchema.pick([
        'medicalLicense', 
        'deaCertificate', 
        'boardCertification', 
        'medicalSchoolDiploma', 
        'governmentID'
      ]);
      break;
    default:
      stepSchema = validationSchema;
  }
  
  try {
    await stepSchema.validate(values, { abortEarly: false });
    return {};
  } catch (validationErrors: any) {
    const errors: Record<string, string> = {};
    validationErrors.inner.forEach((error: any) => {
      errors[error.path] = error.message;
    });
    return errors;
  }
};

export const handleSpecializationSelect = (
  value: any,
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const updatedSpecializations = [...values.specialization, value];
  setFieldValue('specialization', updatedSpecializations);
};

export const handleRemoveSpecialization = (
  index: number,
  e: React.MouseEvent,
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  e.stopPropagation();
  const updatedSpecializations = values.specialization.filter((_, i) => i !== index);
  setFieldValue('specialization', updatedSpecializations);
};

export const createCertificateTemplate = (): Certificate => ({
  id: Date.now(),
  name: '',
  institution: '',
  startDate: '',
  endDate: '',
  description: ''
});

export const handleAddCertificate = (
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const newCertificate = createCertificateTemplate();
  setFieldValue('certificates', [...values.certificates, newCertificate]);
};

export const handleRemoveCertificate = (
  index: number,
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const newCertificates = [...values.certificates];
  newCertificates.splice(index, 1);
  setFieldValue('certificates', newCertificates);
};

export const handleCertificateChange = (
  index: number,
  field: keyof Certificate,
  value: any,
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const newCertificates = [...values.certificates];
  newCertificates[index] = {
    ...newCertificates[index],
    [field]: value
  };
  setFieldValue('certificates', newCertificates);
};

export const createExperienceTemplate = (): Experience => ({
  id: Date.now(),
  hospital: '',
  position: '',
  startDate: '',
  endDate: '',
  description: ''
});

export const handleAddExperience = (
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const newExperience = createExperienceTemplate();
  setFieldValue('experiences', [...values.experiences, newExperience]);
};

export const handleRemoveExperience = (
  index: number,
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const newExperiences = [...values.experiences];
  newExperiences.splice(index, 1);
  setFieldValue('experiences', newExperiences);
};

export const handleExperienceChange = (
  index: number,
  field: keyof Experience,
  value: any,
  values: OnboardingValues,
  setFieldValue: (field: string, value: any) => void
): void => {
  const newExperiences = [...values.experiences];
  newExperiences[index] = {
    ...newExperiences[index],
    [field]: value
  };
  setFieldValue('experiences', newExperiences);
};

export const handleFileUpload = (
  fieldName: keyof Pick<OnboardingValues, 
    'medicalLicense' | 'deaCertificate' | 'boardCertification' | 'medicalSchoolDiploma' | 'governmentID'
  >,
  file: File | null,
  setFieldValue: (field: string, value: any) => void
): void => {
  setFieldValue(fieldName, file);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getAcceptedFileTypes = (): string => '.pdf,.jpg,.jpeg,.png,.doc,.docx';

export const handleOnboardingFormSubmit = async (
  values: OnboardingValues,
  {
    handleOnboarding,
    resetError,
    resetForm,
    setSubmitting,
    onClose
  }: {
    handleOnboarding: (formData: FormData) => Promise<any>;
    resetError: () => void;
    resetForm: () => void;
    setSubmitting: (isSubmitting: boolean) => void;
    onClose: () => void;
  }
): Promise<void> => {
  resetError();
  setSubmitting(true);
  
  try {
    const formData = prepareOnboardingFormData(values);
    const result = await handleOnboarding(formData);
    
    if (result.success) {
      resetForm();
      onClose();
    }
  } finally {
    setSubmitting(false);
  }
};

export const getNextStepHandler = (
  currentStep: number,
  values: OnboardingValues,
  validationSchema: Yup.ObjectSchema<any>,
  setCurrentStep: (step: number | ((prev: number) => number)) => void
): (() => Promise<void>) => {
  return async () => {
    const stepErrors = await validateOnboardingStep(currentStep, values, validationSchema);
    
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
    }
  };
};

export const getPreviousStepHandler = (
  setCurrentStep: (step: number | ((prev: number) => number)) => void
): (() => void) => {
  return () => {
    setCurrentStep(prev => prev - 1);
  };
};

export const handleModalClose = (
  resetForm: () => void,
  setCurrentStep: (step: number) => void,
  onClose: () => void
): void => {
  resetForm();
  setCurrentStep(1);
  onClose();
};

export const formClasses = {
  input: (hasError: boolean, additionalClasses?: string): string => 
    `w-full px-4 py-3 rounded-lg border text-xs placeholder:text-xs transition-colors focus:outline-none ${
      hasError 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
        : 'border-gray-300 focus:border-[#2CA8E0] focus:ring-2 focus:ring-[#2CA8E0]/20'
    } ${additionalClasses || ''}`,
  
  label: 'block text-xs font-medium text-gray-700 mb-2',
  
  error: 'mb-5 text-xs text-red-600',
  
  button: {
    primary: 'px-4 py-2 bg-[#2CA8E0] text-white text-xs rounded-lg hover:bg-[#1e97cc] transition-colors disabled:opacity-50',
    secondary: 'px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50',
    danger: 'text-red-600 hover:text-red-800 text-sm',
    file: 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
  }
};