import React, {useState} from 'react';
import {Button, Text, Input, Center, Stack, useToast} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {SIGN_UP} from '../gql/user';

const SignUp = () => {
  const [name, setName] = useState('oddie');
  const [email, setEmail] = useState('oddie@email.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const [signUp2] = useMutation(SIGN_UP);
  const navigation = useNavigation();
  const toast = useToast();

  const handleSubmit = async () => {
    if (name === '' || email === '' || password === '') {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('The password must be at least 6 characters long');
      return;
    }

    try {
      // navigation.navigate('Login');
      const input = {name, email, password};
      const {data} = await signUp2({
        variables: {
          input,
        },
      });
      console.log('ok');
      console.log(data);
      // console.log(data.signUp);
    } catch (e) {
      console.log(e.networkError.result.errors);
    }
    // toast.show({
    //   title: 'Account verified',
    //   status: 'success',
    //   description: 'Thanks for signing up with us.',
    //   duration: 3000,
    // });
  };

  const showAlert = () => {
    toast.show({
      title: 'Account verified',
      status: 'success',
      description: 'Thanks for signing up with us.',
    });
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
      {/* {error && showAlert()} */}
    </Center>
  );
};

export default SignUp;
