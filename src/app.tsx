import { OfficeSpace } from './components/environment/office-space';
import { OrbitControls } from '@react-three/drei';

export function App() {
    return (
        <>
            <OrbitControls />
            {/* TODO: Toggle on and off active lights as a random event */}
            <OfficeSpace activeLights={true} />
        </>
    );
}
