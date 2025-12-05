import * as Yup from 'yup';

const today = new Date();

const fileSchema = () =>
    Yup.mixed<File>()
        .test('fileSize', 'File size is too large', (value) => {
        if (!value) return true;
            return value.size <= 5_000_000;
        })
        .test('fileType', 'Unsupported file format', (value) => {
            if (!value) return true;
            return ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type);
        })
        .required('This document is required');

export const onboardingValidationSchema = Yup.object({
    specialization: Yup.array()
        .min(1, 'Please select at least one specialization')
        .required('Specialization is required'),

    yearsOfExperience: Yup.number()
        .min(0, 'Years of experience cannot be negative')
        .max(50, 'Years of experience cannot exceed 50')
        .required('Years of experience is required'),

    about: Yup.string()
        .required('About yourself is required'),

    certificates: Yup.array().of(
        Yup.object({
        name: Yup.string().required('Certificate name is required'),
        institution: Yup.string().required('Institution name is required'),
        startDate: Yup.date()
            .max(today, 'Start date cannot be in the future')
            .required('Start date is required'),
        endDate: Yup.date()
            .min(Yup.ref('startDate'), 'End date must be after start date')
            .required('End date is required'),
        description: Yup.string(),
        })
    ).min(1, 'Please add at least one certificate'),

    experiences: Yup.array().of(
        Yup.object({
        hospital: Yup.string().required('Hospital/Clinic name is required'),
        position: Yup.string().required('Position/Role is required'),
        startDate: Yup.date()
            .max(today, 'Start date cannot be in the future')
            .required('Start date is required'),
        endDate: Yup.date()
            .min(Yup.ref('startDate'), 'End date must be after start date')
            .required('End date is required'),
        description: Yup.string(),
        })
    ).min(1, 'Please add at least one work experience'),

    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipCode: Yup.string().required('ZIP/Postal code is required'),

    medicalLicense: fileSchema().concat(
        Yup.mixed<File>().required('Medical License is required')
    ),

    deaCertificate: fileSchema().concat(
        Yup.mixed<File>().required('DEA Certificate is required')
    ),

    boardCertification: fileSchema().concat(
        Yup.mixed<File>().required('Board Certification is required')
    ),

    medicalSchoolDiploma: fileSchema().concat(
        Yup.mixed<File>().required('Medical School Diploma is required')
    ),

    governmentID: fileSchema().concat(
        Yup.mixed<File>().required('Government ID is required')
    ),
});