import React, {useState} from 'react';
import {Button, Text, Input, Center, Stack} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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
        <Button style={globalStyles.button}>
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
