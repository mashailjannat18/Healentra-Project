import { api } from "@/api/base";

export const onboarding = async (data: Record<string, any>) => {
    const response = await api({
        url: "/api/doctor/onboarding",
        method: "put",
        payload: data,
    });
     
    return response;
};

export const specialities = async () => {
    const response = await api({
        url: "/api/speciality",
        method: "get",
    });
    return response;
};