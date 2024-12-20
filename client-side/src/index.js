import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './components/context/DataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
      <DataProvider>
         <App />
      </DataProvider>

   </BrowserRouter>
);

reportWebVitals();
