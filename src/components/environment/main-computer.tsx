import './main-computer.css';
import { Html } from '@react-three/drei';
import { Computer } from './prototype/computer';
import { GameContext } from '../game-manager/game-manager';
import { useContext } from 'react';
import { ComputerScreenProvider } from '../layout/computer-screen-provider';
import { ComputerScreen } from '../layout/computer-screen';

export function MainComputer() {
    const gameContext = useContext(GameContext);

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
                        {/* Need to forward context because we drei doesn’t allow passing context to HTML */}
                        <ComputerScreenProvider gameContext={gameContext}>
                            <ComputerScreen />
                        </ComputerScreenProvider>
                    </Html>
                </mesh>
                <pointLight
                    position={[0, 0, 3]}
                    intensity={10}
                    receiveShadow
                    color={'#f3e8bb'}
                />
            </group>
        </>
    );
}
