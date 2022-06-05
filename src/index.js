import React from 'react';
import Efit from './screen/efit/EFit';
import './index.less';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot (container);
document.body.className = 'gigagolf-wrapper';
root.render(<Efit />);