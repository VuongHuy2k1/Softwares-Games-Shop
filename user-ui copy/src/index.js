import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from 'src/reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScrollButton from './components/ScrollButton/Button/ScrollButton';

import store from './store';
import App from 'src/App';
import GlobalStyles from 'src/components/GlobalStyles/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <GlobalStyles>
        <App />
        <ScrollButton />
      </GlobalStyles>
    </Router>
  </Provider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
