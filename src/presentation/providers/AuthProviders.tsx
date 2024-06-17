import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PropsWithChildren, useEffect } from 'react'
import { RootStackParamList } from '../navigation/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProviders = ({ children }: PropsWithChildren) => {
    const { checkStatus, status } = useAuthStore();
    //hook naveagación
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    //hook useEffect
    useEffect(() => {
        //Verificar el estado de autenticación
        checkStatus();
    }, []);

    useEffect(() => {
        if (status != 'checking') {
            if (status == 'authenticated') {
                //Navegación al Home
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        }

    }, [status]);


    return (
        <>{children}</>
    )
}
