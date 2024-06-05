import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
          <Analytics />
          <SpeedInsights />
          <App />
        </DataProvider>
      </LocalizationProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
