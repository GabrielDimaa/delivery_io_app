import axios from "axios";
import refreshToken from "./refreshToken";
import LocalStorageService from "./localStorageService";

const _axiosDefault = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "secret": process.env.VUE_APP_API_SECRET
    }
});

const api = (() => {
    const axiosInstance = _axiosDefault;

    axiosInstance.interceptors.request.use(
        config => {
            const token = LocalStorageService.getAccessToken();

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
        err => {
            return Promise.reject(err);
        });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (err) => {
            const originalRequest = err.config;

            if (err.response) {
                if (err.response.status === 401 && !originalRequest._retry) {
                    try {
                        originalRequest._retry = true;

                        const token = await refreshToken(axiosInstance);
                        if (token) LocalStorageService.setAccessToken(token);

                        originalRequest.headers['Authorization'] = `Bearer ${token}`;

                        return axiosInstance(originalRequest);
                    } catch (_error) {
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }
                        return Promise.reject(_error);
                    }
                }
                if (err.response.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data);
                }
            }
            return Promise.reject(err);
        }
    );

    return axiosInstance;
}) ()

export default api;