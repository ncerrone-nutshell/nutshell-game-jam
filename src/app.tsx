import { useThree } from '@react-three/fiber';
import { useEffect } from 'react'
import { MathUtils } from 'three';
import { OrbitControls } from '@react-three/drei';
import { OfficeSpace } from './components/environment/office-space';

export function App() {
    const cameraRef = useThree(state => state.camera);

    useEffect(() => {
        cameraRef.position.set(0, 0.5, 5);
        cameraRef.rotation.set(MathUtils.degToRad(-10), 0, 0);
      }, []); 

    return (
        <>
            <OrbitControls />
            <OfficeSpace />
        </>
    )
}
