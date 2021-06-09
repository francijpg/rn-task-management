import React, {useState} from 'react';
import {Button, Text, Center, List, Heading, VStack, Input} from 'native-base';
import {useMutation, useQuery} from '@apollo/client';
import {GET_TASKS, NEW_TASK} from '../gql/tasks';
import globalStyles from '../styles/global';
import {StyleSheet} from 'react-native';
import useCustomToast from '../hooks/useToast';
import TaskList from '../components/tasks/molecules/TaskList';

const Project = ({route}) => {
  const {id} = route.params;
  const input = {
    project: id,
  };
  const [name, setName] = useState('');
  const {showToast} = useCustomToast();

  const {data, loading, error} = useQuery(GET_TASKS, {
    variables: {input},
  });

  const [newTask] = useMutation(NEW_TASK, {
    update(cache, {data: {newTask: newTaskData}}) {
      const {getTasks} = cache.readQuery({
        query: GET_TASKS,
        variables: {input},
      });
      cache.writeQuery({
        query: GET_TASKS,
        variables: {input},
        data: {getTasks: [...getTasks, newTaskData]},
      });
    },
  });

  const handleSubmit = async () => {
    if (name === '') {
      showToast('warning', 'Warning', 'Task name is required');
      return;
    }

    try {
      await newTask({
        variables: {input: {name, project: id}},
      });
      setName('');
      showToast('success', 'Task created', 'Task created successfully');
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      showToast('error', 'Something went wrong', e.message);
    }
  };

  if (loading || error) {
    return null;
  }

  return (
    <>
      {loading && <Text>Loading...</Text>}
      <Center flex={1} bgColor={'#e84347'}>
        <VStack space={4} flex={1} w="90%" mt={4}>
          <Input
            placeholder="task name"
            bgColor="light.100"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Button style={globalStyles.button} onPress={() => handleSubmit()}>
            <Text style={globalStyles.buttonText}>create task</Text>
          </Button>

          <Heading size="sm" bold color="white" mt="5" textAlign={['center']}>
            {route.params.name} tasks
          </Heading>
          <List my={0} space={0} style={styles.list}>
            {data.getTasks.map(task => (
              <TaskList key={task.id} task={task} projectId={id} />
            ))}
          </List>
        </VStack>
      </Center>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    borderWidth: 0,
  },
});

export default Project;
