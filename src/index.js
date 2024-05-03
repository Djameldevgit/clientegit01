import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css'; // Importa el archivo CSS principal
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa otros estilos, si es necesario

import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </React.StrictMode>,
  </I18nextProvider>,
  document.getElementById('root')
);

reportWebVitals();
