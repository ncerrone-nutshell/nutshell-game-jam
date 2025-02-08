import { ComputerScreen } from '../layout/computer-screen';
import './main-computer.css';
import { Html } from '@react-three/drei';
import { Computer } from './prototype/computer';

export function MainComputer() {
    return (
        <>
            <group>
                <Computer />
                <mesh>
                    <Html
                        className="wrapper"
                        position={[0, 0, 1.01]}
                        transform
                        occlude
                        style={{
                            width: '1920px',
                            height: '1080px',
                        }}
                        scale={0.15}
                    >
                        <ComputerScreen />
                    </Html>
                </mesh>
            </group>
        </>
    );
}
