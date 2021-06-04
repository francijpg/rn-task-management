import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {Platform} from 'react-native';

const uri =
  Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://10.0.2.2:4000/';
const httpLink = createHttpLink({uri});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
