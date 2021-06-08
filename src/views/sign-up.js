import React, {useState} from 'react';
import {Button, Text, Input, Center, Stack} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {SIGN_UP} from '../gql/users';
import useCustomToast from '../hooks/useToast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUp] = useMutation(SIGN_UP);
  const {showToast} = useCustomToast();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (name === '' || email === '' || password === '') {
      showToast('warning', 'Warning', 'All fields are required');
      return;
    }
    if (password.length < 6) {
      showToast(
        'warning',
        'warning',
        'The password must be at least 6 characters long',
      );
      return;
    }

    try {
      const input = {name, email, password};
      const {data} = await signUp({
        variables: {input},
      });
      showToast('success', 'Account registered', data.registerUser);
      navigation.navigate('Login');
    } catch (e) {
      showToast('error', 'Something went wrong', e.message);
    }
  };

  return (
    <Center flex={1} bgColor={'#e84347'}>
      <Stack space={4} w="80%">
        <Text style={globalStyles.title}>task management</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          bgColor="light.100"
        />
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
          <Text style={globalStyles.buttonText}>sign up</Text>
        </Button>
      </Stack>
    </Center>
  );
};

export default SignUp;
