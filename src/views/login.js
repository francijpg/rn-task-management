import React, {useState} from 'react';
import {Button, Text, Input, Center, Stack} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {LOG_IN} from '../gql/users';
import {setToken} from '../utils/token';
import useCustomToast from '../hooks/useToast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [logIn] = useMutation(LOG_IN);
  const {showToast} = useCustomToast();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      showToast('warning', 'Warning', 'All fields are required');
      return;
    }
    if (password.length < 6) {
      showToast(
        'warning',
        'Warning',
        'The password must be at least 6 characters long',
      );
      return;
    }

    try {
      const input = {email, password};
      const {data} = await logIn({
        variables: {input},
      });
      const {token} = data.authenticateUser;
      await setToken(token);
      showToast('success', 'Account verified');
      navigation.navigate('Projects');
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      showToast('error', 'Something went wrong', e.message);
    }
  };

  return (
    <Center flex={1} bgColor={'#e84347'}>
      <Stack space={4} w="80%">
        <Text style={globalStyles.title}>task management</Text>
        <Input
          autoCompleteType="email"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          bgColor="light.100"
        />
        <Input
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          bgColor="light.100"
        />
        <Button style={globalStyles.button} onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>log in</Text>
        </Button>
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={globalStyles.link}>
          create account
        </Text>
      </Stack>
    </Center>
  );
};

export default Login;
