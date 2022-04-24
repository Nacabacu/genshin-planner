import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import DataProvider from './contexts/dataContext';
import LocalizationProvider from './contexts/localizationContext';
import './index.css';
import App from './pages/App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <LocalizationProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </LocalizationProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
