import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './contexts/dataContext';
import './index.css';
import App from './pages/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <DataProvider>
          <App />
        </DataProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
