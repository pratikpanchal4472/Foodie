import { CssBaseline } from "@material-ui/core";
import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './store';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    <CssBaseline />
  </Provider>,
  document.getElementById('root')
);
