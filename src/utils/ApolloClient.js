import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';

const httpLink = new HttpLink({
  uri: 'http://axiom.atmedia.xyz/api',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link: ApolloLink.from([
    apolloLogger,
    httpLink
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

export default client;
