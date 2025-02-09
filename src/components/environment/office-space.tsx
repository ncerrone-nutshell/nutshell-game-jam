import { Euler, RepeatWrapping, TextureLoader, Vector2, Vector3 } from 'three';
import { MainComputer } from './main-computer';
import { CeilingLight, CeilingLightProps } from './ceiling-light';
import { EnvironmentProps, setupTexture } from './helpers';
import { Monitor } from './Monitor';
import { Desk } from './desk';
import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { PingPongTable } from './ping-pong-table';
import { WoodenDoor } from './wooden_door';
import { Shelf } from './shelf';

const FORWARD_EULER = new Euler(0, 0, 0);
const REVERSE_EULER = new Euler(0, Math.PI, 0);
const SIDE_EULER = new Euler(0, Math.PI / 2, 0);

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
    { position: new Vector3(0, 13, -5), activeLights: true, intensity: 300 },
    { position: new Vector3(50, 13, -5), activeLights: true, intensity: 1000 },
    { position: new Vector3(0, 13, -40), activeLights: true, intensity: 1000 },
    { position: new Vector3(50, 13, -40), activeLights: true, intensity: 1000 },
];

const BOOK_SHELF_CONFIG: EnvironmentProps[] = [
    { position: new Vector3(37, 0, -50), rotation: SIDE_EULER },
    { position: new Vector3(37, 0, -39), rotation: SIDE_EULER },
    { position: new Vector3(12, 0, -50), rotation: SIDE_EULER },
    { position: new Vector3(12, 0, -39), rotation: SIDE_EULER },
    { position: new Vector3(37, 0, -12), rotation: SIDE_EULER },
    { position: new Vector3(37, 0, -1), rotation: SIDE_EULER },
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

    const [
        ceilingColorMap,
        ceilingDisplacementMap,
        ceilingNormalMap,
        ceilingAOMap,
        ceilingMetalnessMap,
    ] = useLoader(TextureLoader, [
        './textures/sprayed-wall-texture1_albedo.png',
        './textures/sprayed-wall-texture1_height.png',
        './textures/sprayed-wall-texture1_normal-ogl.png',
        './textures/sprayed-wall-texture1_ao.png',
        './textures/sprayed-wall-texture1_metallic.png',
    ]);

    useEffect(() => {
        setupTexture(floorColorMap, 5);
        setupTexture(floorDisplacementMap, 5);
        setupTexture(floorNormalMap, 5);
        setupTexture(floorAOMap, 5);
    }, [floorColorMap, floorDisplacementMap, floorNormalMap, floorAOMap]);

    useEffect(() => {
        setupTexture(wallColorMap, 5);
        setupTexture(wallDisplacementMap, 5);
        setupTexture(wallNormalMap, 5);
        setupTexture(wallAOMap, 5);
    }, [wallColorMap, wallDisplacementMap, wallNormalMap, wallAOMap]);

    useEffect(() => {
        setupTexture(ceilingColorMap, 5);
        setupTexture(ceilingDisplacementMap, 5);
        setupTexture(ceilingNormalMap, 5);
        setupTexture(ceilingAOMap, 5);
        setupTexture(ceilingMetalnessMap, 5);
    }, [
        ceilingColorMap,
        ceilingDisplacementMap,
        ceilingNormalMap,
        ceilingAOMap,
    ]);

    const texture = useLoader(TextureLoader, 'baywatch.jpg');

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
                <mesh position={[40, 25, -35]} scale={[125, 0.1, 100]}>
                    <boxGeometry />
                    <meshStandardMaterial
                        map={ceilingColorMap}
                        displacementMap={ceilingDisplacementMap}
                        normalMap={ceilingNormalMap}
                        aoMap={ceilingAOMap}
                        normalScale={new Vector2(2, 2)}
                        displacementScale={2}
                    />
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
                <PingPongTable
                    position={[80, -7, -50]}
                    rotation={new Euler(0, Math.PI / 2, 0)}
                    scale={new Vector3(0.03, 0.03, 0.03)}
                />
                {/* DOORS */}
                <WoodenDoor position={[-19.5, -8, -40]} />
                <WoodenDoor
                    position={[99.5, -8, 15]}
                    rotation={[0, Math.PI, 0]}
                />
                {/* SHELVES */}
                {BOOK_SHELF_CONFIG.map((config, index) => (
                    <Shelf
                        key={index}
                        position={config.position}
                        rotation={config.rotation}
                    />
                ))}
                <mesh position={[50, 1, -34.5]}>
                    <planeGeometry args={[7, 4]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
                <pointLight
                    position={[50, 1, -33]}
                    intensity={20}
                    distance={20}
                />
            </group>
        </>
    );
}
