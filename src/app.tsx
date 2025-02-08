import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { MathUtils } from 'three';
import { OfficeSpace } from './components/environment/office-space';
import { NutCamera } from './components/camera/nut-camera';

export function App() {
    return (
        <>
            <NutCamera />
            {/* TODO: Toggle on and off active lights as a random event */}
            <OfficeSpace activeLights={true} />
        </>
    );
}
