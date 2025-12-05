export const onboardingInitialValues = {
    specialization: [],
    yearsOfExperience: '',
    about: '',
    certificates: [
        {
            id: Date.now(),
            name: '',
            institution: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ],
    experiences: [
        {
            id: Date.now(),
            hospital: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ],
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    medicalLicense: null,
    deaCertificate: null,
    boardCertification: null,
    medicalSchoolDiploma: null,
    governmentID: null,
};