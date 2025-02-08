import { Euler, Vector3 } from 'three';
import { MainComputer } from './main-computer';
import { Desk } from './prototype/desk';
import { Computer } from './prototype/computer';
import { CeilingLight, CeilingLightProps } from './prototype/ceiling-light';
import { EnvironmentProps } from './helpers';

const FORWARD_EULER = new Euler(0, 0, 0);
const REVERSE_EULER = new Euler(0, Math.PI, 0);

const DESK_CONFIG: EnvironmentProps[] = [
    { position: new Vector3(0, -3.5, 0), rotation: FORWARD_EULER },
    { position: new Vector3(25, -3.5, 0), rotation: FORWARD_EULER },
    { position: new Vector3(50, -3.5, 0), rotation: FORWARD_EULER },
    { position: new Vector3(0, -3.5, -10), rotation: REVERSE_EULER },
    { position: new Vector3(25, -3.5, -10), rotation: REVERSE_EULER },
    { position: new Vector3(50, -3.5, -10), rotation: REVERSE_EULER },
    { position: new Vector3(0, -3.5, -35), rotation: FORWARD_EULER },
    { position: new Vector3(25, -3.5, -35), rotation: FORWARD_EULER },
    { position: new Vector3(50, -3.5, -35), rotation: FORWARD_EULER },
    { position: new Vector3(0, -3.5, -45), rotation: REVERSE_EULER },
    { position: new Vector3(25, -3.5, -45), rotation: REVERSE_EULER },
    { position: new Vector3(50, -3.5, -45), rotation: REVERSE_EULER },
];

const COMPUTER_CONFIG: EnvironmentProps[] = [
    { position: new Vector3(25, 0, 0), rotation: FORWARD_EULER },
    { position: new Vector3(50, 0, 0), rotation: FORWARD_EULER },
    { position: new Vector3(0, 0, -10), rotation: REVERSE_EULER },
    { position: new Vector3(25, 0, -10), rotation: REVERSE_EULER },
    { position: new Vector3(50, 0, -10), rotation: REVERSE_EULER },
    { position: new Vector3(0, 0, -35), rotation: FORWARD_EULER },
    { position: new Vector3(25, 0, -35), rotation: FORWARD_EULER },
    { position: new Vector3(50, 0, -35), rotation: FORWARD_EULER },
    { position: new Vector3(0, 0, -45), rotation: REVERSE_EULER },
    { position: new Vector3(25, 0, -45), rotation: REVERSE_EULER },
    { position: new Vector3(50, 0, -45), rotation: REVERSE_EULER },
];

const CEILING_LIGHT_CONFIG: CeilingLightProps[] = [
    { position: new Vector3(0, 20, -5), activeLights: true, intensity: 100 },
    { position: new Vector3(50, 20, -5), activeLights: true, intensity: 1000 },
    { position: new Vector3(0, 20, -40), activeLights: true, intensity: 1000 },
    { position: new Vector3(50, 20, -40), activeLights: true, intensity: 1000 },
];

type Props = {
    activeLights: boolean;
};

export function OfficeSpace(props: Props) {
    return (
        <>
            <group>
                {/* LIGHTING */}
                {props.activeLights && (
                    <>
                        <ambientLight intensity={0.1} color={'#d77d24'} />
                        <ambientLight intensity={0.1} color={'#e4f13d'} />
                        <ambientLight intensity={0.2} color={'#515dea'} />
                    </>
                )}
                <MainComputer />
                {DESK_CONFIG.map((config, index) => (
                    <Desk
                        key={index}
                        position={config.position}
                        rotation={config.rotation}
                    />
                ))}
                {COMPUTER_CONFIG.map((config, index) => (
                    <Computer
                        key={index}
                        position={config.position}
                        rotation={config.rotation}
                    />
                ))}
                {/* FLOOR */}
                <mesh
                    position={[40, -8.3, -35]}
                    scale={[125, 0.1, 100]}
                    receiveShadow
                >
                    <boxGeometry />
                    <meshStandardMaterial color={'#996315'} />
                </mesh>
                {/* WALLS */}
                <mesh position={[40, 11.5, -85]} scale={[125, 40, 0.1]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#fff999'} />
                </mesh>
                <mesh
                    position={[40, 11.5, 15]}
                    scale={[125, 40, 0.1]}
                    rotation={[0, Math.PI, 0]}
                >
                    <boxGeometry />
                    <meshStandardMaterial color={'#fff999'} />
                </mesh>
                <mesh position={[102.5, 11.5, -35]} scale={[0.1, 40, 100]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#fff999'} />
                </mesh>
                <mesh position={[-22.5, 11.5, -35]} scale={[0.1, 40, 100]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#fff999'} />
                </mesh>
                {/* CEILING */}
                <mesh position={[40, 31.5, -35]} scale={[125, 0.1, 100]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#fff'} />
                </mesh>
                {/* CEILING LIGHTS */}
                {CEILING_LIGHT_CONFIG.map((config, index) => (
                    <CeilingLight
                        key={index}
                        position={config.position}
                        rotation={FORWARD_EULER}
                        activeLights={config.activeLights && props.activeLights}
                        intensity={config.intensity}
                    />
                ))}
            </group>
        </>
    );
}
