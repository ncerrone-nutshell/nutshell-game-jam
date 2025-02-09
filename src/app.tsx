import {
    BrightnessContrast,
    EffectComposer,
    Vignette,
} from '@react-three/postprocessing';
import { NutCamera } from './components/camera/nut-camera';
import { OfficeSpace } from './components/environment/office-space';

export function App() {
    return (
        <>
            <NutCamera />
            <EffectComposer>
                <Vignette eskil={false} offset={0.05} darkness={0.9} />
                <BrightnessContrast brightness={0.05} contrast={0.2} />
            </EffectComposer>
            {/* <OrbitControls /> */}
            {/* TODO: Toggle on and off active lights as a random event */}
            <OfficeSpace activeLights={true} />
        </>
    );
}
