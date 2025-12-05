export const loginForm = {
        email: {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Enter your email",
        },
        password: {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
        },
};

export const signupForm = {
    firstName: {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "First Name",
    },
    lastName: {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Last Name",
    },
    dob: {
        name: "dob",
        type: "date",
        label: "Date of Birth",
        placeholder: "",
    },
    email: {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
    },
    phone: {
        name: "phone",
        type: "phone",
        label: "Phone Number",
        placeholder: "Phone Number",
    },
    gender: {
        name: "gender",
        type: "select",
        label: "Gender",
        placeholder: "Select Gender",
        options: [
            { value: "", label: "Select Gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "prefer-not", label: "Prefer not to say" },
        ],
    },
    address: {
        name: "address",
        type: "text",
        label: "Address",
        placeholder: "Address",
    },
    city: {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "City",
    },
    password: {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
    },
};

export const signupFieldGroups = [
    ["firstName", "lastName"],
    ["dob", "email"],
    ["phone", "gender"],
    ["address", "city"],
    ["password"],
];