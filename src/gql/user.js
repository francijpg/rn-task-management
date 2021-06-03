import {gql} from '@apollo/client';

export const SIGN_UP = gql`
  mutation registerUser($input: UserInput) {
    registerUser(input: $input)
  }
`;
