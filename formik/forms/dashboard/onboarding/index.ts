export const onboardingForm = {
    specialization: {
        name: "specialization",
        type: "select",
        label: "Field of Specialization",
        placeholder: "Choose your specialization"
    },
    yearsOfExperience: {
        name: "yearsOfExperience",
        type: "number",
        label: "Years of Experience",
        placeholder: "Enter years of experience"
    },
    about: {
        name: "about",
        type: "textarea",
        label: "About Yourself",
        placeholder: "Tell us about your professional background and interests..."
    },
    certificateName: {
        name: "name",
        type: "text",
        label: "Certificate Name",
        placeholder: "e.g., Medical Board Certification"
    },
    certificateInstitution: {
        name: "institution",
        type: "text",
        label: "Institution Name",
        placeholder: "e.g., Harvard Medical School"
    },
    certificateStartDate: {
        name: "startDate",
        type: "date",
        label: "Start Date"
    },
    certificateEndDate: {
        name: "endDate",
        type: "date",
        label: "End Date"
    },
    certificateDescription: {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "Additional details about this certificate..."
    },
    experienceHospital: {
        name: "hospital",
        type: "text",
        label: "Hospital/Clinic Name",
        placeholder: "e.g., General Hospital"
    },
    experiencePosition: {
        name: "position",
        type: "text",
        label: "Position/Role",
        placeholder: "e.g., Senior Surgeon"
    },
    experienceStartDate: {
        name: "startDate",
        type: "date",
        label: "Start Date"
    },
    experienceEndDate: {
        name: "endDate",
        type: "date",
        label: "End Date"
    },
    experienceDescription: {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "Describe your responsibilities and achievements..."
    },
    streetAddress: {
        name: "streetAddress",
        type: "text",
        label: "Street Address",
        placeholder: "Enter your street address"
    },
    city: {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "Enter your city"
    },
    state: {
        name: "state",
        type: "text",
        label: "State",
        placeholder: "Enter your state"
    },
    country: {
        name: "country",
        type: "select",
        label: "Country",
        placeholder: "Select your country"
    },
    zipCode: {
        name: "zipCode",
        type: "text",
        label: "ZIP/Postal Code",
        placeholder: "Enter ZIP code"
    }
};

export const countryOptions = [
    { value: "", label: "Select your country" },
    { value: "USA", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "Other", label: "Other" }
];