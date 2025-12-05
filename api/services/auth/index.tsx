import { api } from "../../base";

export const signupDoctor = async (data: Record<string, any>) => {
    const response = await api({
        url: "/api/doctor/register",
        method: "post",
        payload: data,
    });
    return response;
};

export const loginUser = async (data: Record<string, any>) => {
    const response = await api({
        url: "/api/auth/login",
        method: "post",
        payload: data,
    });
    return response;
};