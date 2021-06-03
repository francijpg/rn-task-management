import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://10.0.2.2:4000/',
  // Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://10.0.2.2:4000/',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
