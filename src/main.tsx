import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';

import { GameManager } from './components/game-manager/game-manager.tsx';

import './index.css';

export const DEV_MODE = false;
export const SHOW_CONSOLE = false;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Canvas shadows>
            <GameManager />
        </Canvas>
    </StrictMode>
);
