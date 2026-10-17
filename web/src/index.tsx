import './polyfills';
import './theme/app.global.css';
import { createRoot } from 'react-dom/client';

import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) createRoot(container).render(<App />);
});
