import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {ApolloProvider} from '@apollo/client';

import client from './config/apollo';

import Login from './views/login';
import SignUp from './views/sign-up';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: 'Log In',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
