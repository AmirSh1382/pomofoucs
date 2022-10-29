import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Styles
import './styles/index.scss';

// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// React-toastify
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);