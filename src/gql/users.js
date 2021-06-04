import {gql} from '@apollo/client';

export const SIGN_UP = gql`
  mutation registerUser($input: UserInput) {
    registerUser(input: $input)
  }
`;

export const LOG_IN = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;
