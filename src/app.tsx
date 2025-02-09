import { NutCamera } from './components/camera/nut-camera';
import { OfficeSpace } from './components/environment/office-space';

export function App() {
    return (
        <>
            <NutCamera />
            {/* <OrbitControls /> */}
            {/* TODO: Toggle on and off active lights as a random event */}
            <OfficeSpace activeLights={true} />
        </>
    );
}
