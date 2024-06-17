import { API_URL, API_URL_ANDROID, STAGE } from "@env";
import axios from "axios";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL_BASE = (STAGE === 'prod') ? API_URL : API_URL_ANDROID;

//Definir la url base - comunicar api
const tesloApi = axios.create({
    baseURL: API_URL_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
})

//TODO: Interceptor
tesloApi.interceptors.request.use(
    async (config) => {

        //Verificar si tenemos un token
        const token = await StorageAdapter.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)
export {
    tesloApi
}