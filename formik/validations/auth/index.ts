import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email")
        .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Email must have a valid domain (e.g., .com, .org)")
        .required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
});

export const signupValidationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.date()
        .max(today, "Date cannot be today or in the future")
        .required("Date of birth is required"),
    email: Yup.string()
        .email("Invalid email")
        .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Email must have a valid domain (e.g., .com, .org)")
        .required("Email is required"),
    phoneNo: Yup.string().required("Phone is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
});