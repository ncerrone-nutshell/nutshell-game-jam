import { Euler, RepeatWrapping, TextureLoader, Vector2, Vector3 } from 'three';
import { MainComputer } from './main-computer';
import { CeilingLight, CeilingLightProps } from './prototype/ceiling-light';
import { EnvironmentProps } from './helpers';
import { Monitor } from './Monitor';
import { Desk } from './desk';
import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';

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
    { position: new Vector3(25, 1.15, 0), rotation: FORWARD_EULER },
    { position: new Vector3(50, 1.15, 0), rotation: FORWARD_EULER },
    { position: new Vector3(0, 1.15, -10), rotation: REVERSE_EULER },
    { position: new Vector3(25, 1.15, -10), rotation: REVERSE_EULER },
    { position: new Vector3(50, 1.15, -10), rotation: REVERSE_EULER },
    { position: new Vector3(0, 1.15, -35), rotation: FORWARD_EULER },
    { position: new Vector3(25, 1.15, -35), rotation: FORWARD_EULER },
    { position: new Vector3(50, 1.15, -35), rotation: FORWARD_EULER },
    { position: new Vector3(0, 1.15, -45), rotation: REVERSE_EULER },
    { position: new Vector3(25, 1.15, -45), rotation: REVERSE_EULER },
    { position: new Vector3(50, 1.15, -45), rotation: REVERSE_EULER },
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
    const [floorColorMap, floorDisplacementMap, floorNormalMap, floorAOMap] =
        useLoader(TextureLoader, [
            './textures/luxury-vinyl-plank_light_albedo.png',
            './textures/luxury-vinyl-plank_light_height.png',
            './textures/luxury-vinyl-plank_light_normal-ogl.png',
            './textures/luxury-vinyl-plank_light_ao.png',
        ]);

    const [wallColorMap, wallDisplacementMap, wallNormalMap, wallAOMap] =
        useLoader(TextureLoader, [
            './textures/brick-wall_albedo.png',
            './textures/brick-wall_height.png',
            './textures/brick-wall_normal-ogl.png',
            './textures/brick-wall_ao.png',
        ]);

    useEffect(() => {
        floorColorMap.repeat.set(5, 5);
        floorDisplacementMap.repeat.set(5, 5);
        floorNormalMap.repeat.set(5, 5);
        floorAOMap.repeat.set(5, 5);

        floorColorMap.wrapS = floorColorMap.wrapT = RepeatWrapping;
        floorDisplacementMap.wrapS = floorDisplacementMap.wrapT =
            RepeatWrapping;
        floorNormalMap.wrapS = floorNormalMap.wrapT = RepeatWrapping;
        floorAOMap.wrapS = floorAOMap.wrapT = RepeatWrapping;
    }, [floorColorMap, floorDisplacementMap, floorNormalMap, floorAOMap]);

    useEffect(() => {
        wallColorMap.repeat.set(5, 5);
        wallDisplacementMap.repeat.set(5, 5);
        wallNormalMap.repeat.set(5, 5);
        wallAOMap.repeat.set(5, 5);

        wallColorMap.wrapS = wallColorMap.wrapT = RepeatWrapping;
        wallDisplacementMap.wrapS = wallDisplacementMap.wrapT = RepeatWrapping;
        wallNormalMap.wrapS = wallNormalMap.wrapT = RepeatWrapping;
        wallAOMap.wrapS = wallAOMap.wrapT = RepeatWrapping;
    }, [wallColorMap, wallDisplacementMap, wallNormalMap, wallAOMap]);

    return (
        <>
            <group>
                {/* LIGHTING */}
                {props.activeLights && (
                    <>
                        <ambientLight intensity={0.1} color={'#d77d24'} />
                        <ambientLight intensity={0.1} color={'#e4f13d'} />
                        <ambientLight intensity={0.3} color={'#515dea'} />
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
                    <Monitor
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
                    <meshStandardMaterial
                        map={floorColorMap}
                        displacementMap={floorDisplacementMap}
                        normalMap={floorNormalMap}
                        aoMap={floorAOMap}
                        aoMapIntensity={5}
                    />
                </mesh>
                {/* WALLS */}
                <mesh position={[40, 11.5, -85]} scale={[125, 40, 0.1]}>
                    <boxGeometry />
                    <meshStandardMaterial
                        map={wallColorMap}
                        displacementMap={wallDisplacementMap}
                        normalMap={wallNormalMap}
                        aoMap={wallAOMap}
                        normalScale={new Vector2(5, 5)}
                    />
                </mesh>
                <mesh
                    position={[40, 11.5, 15]}
                    scale={[125, 40, 0.1]}
                    rotation={[0, Math.PI, 0]}
                >
                    <boxGeometry />
                    <meshStandardMaterial
                        map={wallColorMap}
                        displacementMap={wallDisplacementMap}
                        normalMap={wallNormalMap}
                        aoMap={wallAOMap}
                        normalScale={new Vector2(5, 5)}
                    />
                </mesh>
                <mesh position={[102.5, 11.5, -35]} scale={[0.1, 40, 100]}>
                    <boxGeometry />
                    <meshStandardMaterial
                        map={wallColorMap}
                        displacementMap={wallDisplacementMap}
                        normalMap={wallNormalMap}
                        aoMap={wallAOMap}
                        normalScale={new Vector2(5, 5)}
                    />
                </mesh>
                <mesh position={[-22.5, 11.5, -35]} scale={[0.1, 40, 100]}>
                    <boxGeometry />
                    <meshStandardMaterial
                        map={wallColorMap}
                        displacementMap={wallDisplacementMap}
                        normalMap={wallNormalMap}
                        aoMap={wallAOMap}
                        normalScale={new Vector2(5, 5)}
                    />
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
