import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { MapPage } from '../adapters/presenters/pages/MapPage';
import './styles/theme.css';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Elemento #root não encontrado no documento.');
}

createRoot(container).render(
    <StrictMode>
        <MapPage />
    </StrictMode>,
);
