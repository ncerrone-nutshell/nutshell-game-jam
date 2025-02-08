import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import { ComputerScreen } from './components/computer-screen.tsx'

import './index.css'
import { Html } from '@react-three/drei'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Canvas>
            <Html fullscreen>
                <ComputerScreen />
            </Html>
        </Canvas>
    </StrictMode>
)
