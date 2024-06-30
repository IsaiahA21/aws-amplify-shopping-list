import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter } from 'react-router-dom';
import config from './aws-exports'
import { Amplify } from 'aws-amplify'
import { AuthProvider } from './hooks/AuthContext';

Amplify.configure(config)
// Configure Amplify
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter>

      <App />
    </BrowserRouter>

  </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
