import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StackNavigator } from './src/presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProviders } from './src/presentation/providers/AuthProviders';

const App = () => {

  //hook useColorScheme: tomar el tema del dispositivo.
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;


  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <AuthProviders>
            <StackNavigator />
          </AuthProviders>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}

export default App;
