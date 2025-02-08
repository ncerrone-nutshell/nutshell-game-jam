import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';

import { GameManager } from './components/game-manager/game-manager.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Canvas>
            <GameManager />
        </Canvas>
    </StrictMode>
);
