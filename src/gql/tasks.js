import {gql} from '@apollo/client';

export const GET_TASKS = gql`
  query getTasks($input: ProjectIDInput) {
    getTasks(input: $input) {
      id
      name
      state
    }
  }
`;

export const NEW_TASK = gql`
  mutation newTask($input: TaskInput) {
    newTask(input: $input) {
      id
      name
      project
      state
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($id: ID!, $input: TaskInput, $state: Boolean) {
    updateTask(id: $id, input: $input, state: $state) {
      id
      name
      project
      state
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
