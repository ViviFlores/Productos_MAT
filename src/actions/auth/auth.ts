import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user";
import { AuthResponse } from "../../infrastructure/interfaces/auth.response";

//acciones http

//Función retorne por separado user - token
const returnUserToken = (data: AuthResponse) => {
    //Objeto con la información del usuario
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles
    }

    return {
        user: user,
        token: data.token
    }

}

//acción - Login
export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password
        });

        return returnUserToken(data);

    } catch (ex) {
        console.log(ex);
        return null;
    }

}

//acción verificación de autenticación
export const authCheckStatus = async () => {

    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);
    } catch (ex) {
        console.log(ex);
        return null;
    }

}