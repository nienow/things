import * as React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import './styles.css';

const rootElement = document.getElementById('root');
render(<App/>, rootElement);
