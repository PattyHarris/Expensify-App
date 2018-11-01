import React from 'react';
import ReactDOM from 'react-dom';

// Components
import AppRouter from './routers/AppRouter';

// Styles
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<AppRouter />, document.getElementById('app'));
