import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'  // Import the Provider
import store from './StateManagement/store';             // Import your Redux store
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>        
      <App />
    </Provider>
  </React.StrictMode>
);
