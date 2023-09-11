import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import AppApp from './components/App/AppApp';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <AppApp></AppApp>
    </BrowserRouter>
  </React.StrictMode>
);
