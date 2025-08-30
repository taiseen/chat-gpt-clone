import ClerkAuthProvider from './providers/ClerkAuthProvider.jsx';
import TanstackQuery from './providers/TanstackQuery.jsx';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import './styles/index.css';


const htmlRoot = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(htmlRoot);

reactRoot.render(
  <React.StrictMode>
    <TanstackQuery>
      <ClerkAuthProvider>
        <App />
      </ClerkAuthProvider>
    </TanstackQuery>
  </React.StrictMode>,
)
