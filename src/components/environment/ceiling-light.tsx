import { SpotLight } from 'three';
import { EnvironmentProps } from './helpers';
import { useMemo } from 'react';
import { HangingLight } from './hanging-light';

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
                <HangingLight position={[0, -7.5, 0]} />
                {props.activeLights && (
                    <>
                        <pointLight
                            intensity={50}
                            position={[0, 1, 0]}
                            distance={30}
                        />
                        <primitive
                            object={spotlight}
                            position={[0, -3, 0]}
                            intensity={props.intensity * 2}
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
