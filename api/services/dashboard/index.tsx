import { api } from "@/api/base";

export const userLoggedIn = async () => {
    return await api({
        url: "/api/auth/me",
        method: "get"
    });
};