import React from 'react';
import App from './App';
import './index.less';
import { createRoot } from 'react-dom/client';
import Header from './screen/header/Header';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot (container);
document.body.className = 'gigagolf-wrapper';

root.render(
    <BrowserRouter>
        <Header />
        <App />
    </BrowserRouter>
);