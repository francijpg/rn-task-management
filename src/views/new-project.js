import React, {useState} from 'react';
import {Button, Text, Center, Stack, Input} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {NEW_PROJECT, GET_PROJECTS} from '../gql/projects';
import useCustomToast from '../hooks/useToast';

const NewProject = () => {
  const [name, setName] = useState('');
  const {showToast} = useCustomToast();
  const navigation = useNavigation();

  const [newProject] = useMutation(NEW_PROJECT, {
    update(cache, {data: {newProject: newProjectData}}) {
      const {getProjects} = cache.readQuery({query: GET_PROJECTS});
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {getProjects: getProjects.concat([newProjectData])},
      });
    },
  });

  const handleSubmit = async () => {
    if (name === '') {
      showToast('warning', 'Warning', 'Project name is required');
      return;
    }

    try {
      const input = {name};
      await newProject({
        variables: {input},
      });
      showToast('success', 'Project created', 'Project created successfully');
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
          placeholder="project name"
          bgColor="light.100"
          onChangeText={text => setName(text)}
        />
        <Button style={globalStyles.button} onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>create new project</Text>
        </Button>
      </Stack>
    </Center>
  );
};

export default NewProject;
