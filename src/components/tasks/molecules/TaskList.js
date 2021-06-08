import React from 'react';
import {Text, HStack, IconButton, CheckCircleIcon} from 'native-base';
import {Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import {DELETE_TASK, GET_TASKS, UPDATE_TASK} from '../../../gql/tasks';

const TaskList = ({task, projectId}) => {
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache) {
      const {getTasks} = cache.readQuery({
        query: GET_TASKS,
        variables: {
          input: {
            project: projectId,
          },
        },
      });

      cache.writeQuery({
        query: GET_TASKS,
        variables: {
          input: {
            project: projectId,
          },
        },
        data: {
          getTasks: getTasks.filter(currentTask => currentTask.id !== task.id),
        },
      });
    },
  });

  const handleState = async item => {
    const {id} = item;
    try {
      await updateTask({
        variables: {
          id,
          input: {
            name: item.name,
          },
          state: !item.state,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleDelete = async item => {
    const {id} = item;
    try {
      await deleteTask({
        variables: {
          id,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const showDeleteAlert = item => {
    Alert.alert('Delete Task', 'Do you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => handleDelete(item),
      },
    ]);
  };

  return (
    <>
      <HStack bgColor="light.100" w="100%" justifyContent="space-between">
        <Text
          bold
          mx={4}
          my={4}
          strikeThrough={task.state}
          onLongPress={() => showDeleteAlert(task)}
          fontSize="lg">
          {task.name}
        </Text>
        <IconButton
          colorScheme="emerald"
          borderRadius="full"
          icon={
            task.state ? (
              <CheckCircleIcon size="10" color="green.600" />
            ) : (
              <CheckCircleIcon size="10" color="gray.300" />
            )
          }
          onPress={() => handleState(task)}
        />
      </HStack>
    </>
  );
};

export default TaskList;
