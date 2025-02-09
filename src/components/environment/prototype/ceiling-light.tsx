import { SpotLight } from 'three';
import { EnvironmentProps } from '../helpers';
import { useMemo } from 'react';

type LightsProps = {
    activeLights: boolean;
    intensity: number;
};

export type CeilingLightProps = LightsProps & EnvironmentProps;

export function CeilingLight(props: CeilingLightProps) {
    const spotlight = useMemo(() => new SpotLight('#fff'), []);

    return (
        <>
            <group position={props.position} rotation={props.rotation}>
                <mesh position={[0, 0, 0]} scale={[5, 8, 5]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.5, 32]} />
                    <meshStandardMaterial color={'#f0f0f0'} />
                </mesh>
                {props.activeLights && (
                    <>
                        <pointLight
                            intensity={10}
                            position={[0, -3, 0]}
                            distance={5}
                        />
                        <primitive
                            object={spotlight}
                            position={[0, -3, 0]}
                            intensity={props.intensity}
                            penumbra={0.5}
                            castShadow
                            distance={40}
                        />
                        <primitive
                            object={spotlight.target}
                            position={[0, -30, 0]}
                        />
                    </>
                )}
            </group>
        </>
    );
}
