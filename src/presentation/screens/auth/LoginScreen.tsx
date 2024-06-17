import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../theme/styles';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { API_URL, STAGE } from '@env';
import { useAuthStore } from '../../store/auth/useAuthStore';

//Navegación typescript
interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };

//interface formulario inicio sesión
interface FormLogin {
    email: string;
    password: string;
}

export const LoginScreen = ({ navigation }: Props) => {

    //hook dimensión: tomar la dimensión del dispositivo
    const { height } = useWindowDimensions();

    //hook useState: manipular formulario inicio sessión
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    //hook useState: verificar si se hizo un posting
    const [isPosting, setIsPosting] = useState<boolean>(false);

    //Ejecutar acción login
    const { login } = useAuthStore();


    //Función cambiar los valores del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormLogin({ ...formLogin, [key]: value })

    }

    //Función acción iniar sesión
    const handleOnLogin = async () => {
        //console.log(formLogin);
        setIsPosting(true);
        if (!formLogin.email || !formLogin.password) {
            return;
        }

        //Disparamos la acción de inicio de sesión
        const wasSuccessful = await login(formLogin.email, formLogin.password);

        //Se inició sesión exitosamente!
        setIsPosting(false);
        if (wasSuccessful) return;

        //No se inció sesión
        Alert.alert("Error", "Usuario o contraseña incorrecta!");
    }

    //console.log({apiUrl: API_URL, stage: STAGE});

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingresa para continuar</Text>
                </Layout>

                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Correo electrónico'
                        accessoryLeft={<MyIcon name='email-outline' />}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={formLogin.email}
                        onChangeText={(value) => handleSetValues('email', value)}
                        style={{ marginBottom: 20 }} />
                    <Input
                        placeholder='Contraseña'
                        accessoryLeft={<MyIcon name='lock-outline' />}
                        autoCapitalize='none'
                        value={formLogin.password}
                        onChangeText={(value) => handleSetValues('password', value)}
                        secureTextEntry
                        style={{ marginBottom: 20 }} />
                </Layout>

                <Layout style={{ marginTop: 10 }}>
                    <Button
                        disabled={isPosting}
                        accessoryRight={<MyIcon name='arrow-forward-outline' isWhite={true} />}
                        onPress={handleOnLogin}>Ingresar</Button>
                </Layout>

                <Layout style={styles.textRedireccion}>
                    <Text>¿No tienes una cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => navigation.navigate('RegisterScreen')}> Crea una </Text>
                </Layout>

            </ScrollView>
        </Layout>

    )
}
