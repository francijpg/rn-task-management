import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {Platform} from 'react-native';
import {setContext} from 'apollo-link-context';
import {getToken} from '../utils/token';

const uri =
  Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://10.0.2.2:4000/';
const httpLink = createHttpLink({uri});

const authLink = setContext(async (_, {headers}) => {
  const token = await getToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
