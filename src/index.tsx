import * as React from 'react';
import { render } from 'react-dom';
import ThingsApp from './things-app';
import './styles.css';

const rootElement = document.getElementById('root');
render(<ThingsApp/>, rootElement);
