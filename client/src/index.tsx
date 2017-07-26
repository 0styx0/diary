import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Router from './components/Router';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface(
    { uri: 'http://localhost:4000/api?'}),
    dataIdFromObject: (o: {id: string}) => o.id
});

ReactDOM.render((
  <ApolloProvider client={client as any}>
    <BrowserRouter basename="/">
      <Router />
    </BrowserRouter>
   </ApolloProvider>
), document.getElementById('root') as HTMLElement);

registerServiceWorker();
