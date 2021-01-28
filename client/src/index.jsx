import React from 'react';
import { render } from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './styles/index.scss';

render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
);
