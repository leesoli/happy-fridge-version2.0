import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop';
import App from './components/App.js';

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App/>
  </Router>, document.getElementById('app'));
