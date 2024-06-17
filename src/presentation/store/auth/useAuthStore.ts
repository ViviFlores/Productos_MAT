import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
}

//Definir el store
export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    user: undefined,
    token: undefined,
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        // No se logró autenticar
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }
        //TODO: Save token and user in storage
        //console.log(resp);
        await StorageAdapter.setItem('token', resp.token);
        //Verificar token storage
        //const storeToken = await StorageAdapter.getItem('token');
        //console.log(storeToken);

        // Si se logró autenticar
        set({ status: 'authenticated', token: resp.token, user: resp.user })
        return true;
    },
    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }
        //Guardar el nuevo token - si hay respuesta
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user })
    }
}));