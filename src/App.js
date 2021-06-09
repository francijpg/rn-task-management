import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';
import {ApolloProvider} from '@apollo/client';

import client from './config/apollo';

import Login from './views/login';
import SignUp from './views/sign-up';
import Projects from './views/projects';
import NewProject from './views/new-project';
import Project from './views/project';

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
            <Stack.Screen
              name="Projects"
              component={Projects}
              options={{
                title: 'Log Out',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="NewProject"
              component={NewProject}
              options={{
                title: 'Projects',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Project"
              component={Project}
              options={({route}) => ({
                title: route.params.name,
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
