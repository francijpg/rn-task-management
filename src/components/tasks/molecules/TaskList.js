import React from 'react';
import {
  List,
  Text,
  HStack,
  CheckIcon,
  SmallCloseIcon,
  IconButton,
  CheckCircleIcon,
  Icon,
} from 'native-base';
import {Alert, StyleSheet} from 'react-native';
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
          mx={2}
          my={4}
          strikeThrough={task.state}
          onLongPress={() => showDeleteAlert(task)}>
          {task.name}
        </Text>
        <IconButton
          colorScheme="emerald"
          borderRadius="full"
          // styles={styles.completo}
          icon={task.state ? <CheckCircleIcon /> : <CheckIcon />}
          onPress={() => handleState(task)}
        />
        {/* <IconButton
          colorScheme="emerald"
          color="red.400"
          icon={task.state ? <CheckCircleIcon /> : <CheckIcon />}
          onPress={() => handleState(task)}
        /> */}
      </HStack>
    </>
  );
};

// const styles = StyleSheet.create({
//   icono: {
//     fontSize: 32,
//   },
//   completo: {
//     color: 'green',
//   },
//   incompleto: {
//     color: '#E1E1E1',
//   },
// });

export default TaskList;
