import './index.css';
import { GeApp } from './GeApp';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<GeApp />);

