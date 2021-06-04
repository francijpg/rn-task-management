import React, {useState} from 'react';
import {Button, Text, Input, Center, Stack, useToast} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {SIGN_UP} from '../gql/user';
// import Toast from '../components/common/Toast';

const SignUp = () => {
  const [name, setName] = useState('random');
  const [email, setEmail] = useState('email2@email.com');
  const [password, setPassword] = useState('123456');

  const [signUp] = useMutation(SIGN_UP);
  const navigation = useNavigation();
  const toast = useToast();

  const handleSubmit = async () => {
    if (name === '' || email === '' || password === '') {
      Toast('error', 'Something went wrong', 'All fields are required');
      return;
    }
    if (password.length < 6) {
      Toast(
        'error',
        'Something went wrong',
        'The password must be at least 6 characters long',
      );
      return;
    }

    try {
      const input = {name, email, password};
      const {data} = await signUp({
        variables: {input},
      });
      Toast('success', 'Account registered', data.registerUser);
      navigation.navigate('Login');
    } catch (e) {
      Toast('error', 'Something went wrong', e.message);
    }
  };

  const Toast = (type, title, description) => {
    toast.show({
      title,
      status: type,
      description,
      duration: 3000,
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
    </Center>
  );
};

export default SignUp;
