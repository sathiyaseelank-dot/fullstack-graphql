import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
} from "@apollo/client"

import './index.css'
import App from './App.tsx'

const client = new ApolloClient({
  uri: 'http://localhost:8083/query',
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
