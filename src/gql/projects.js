import {gql} from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
    }
  }
`;

export const NEW_PROJECT = gql`
  mutation newProject($input: ProjectInput) {
    newProject(input: $input) {
      id
      name
    }
  }
`;
