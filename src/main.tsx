import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './contexts/dataContext';
import LocalizationProvider from './contexts/localizationContext';
import './index.css';
import App from './pages/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
