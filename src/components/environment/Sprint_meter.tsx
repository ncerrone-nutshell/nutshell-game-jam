/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ./public/sprint_meter.glb --types 
*/

import * as THREE from 'three';
import React, { useContext } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import JiraFullIcon from '../../icons/jira-full';
import { GameContext } from '../game-manager/game-manager';

type GLTFResult = GLTF & {
    nodes: {
        Cube: THREE.Mesh;
        Jira_color: THREE.Mesh;
        Glass: THREE.Mesh;
        Cylinder: THREE.Mesh;
        Sphere: THREE.Mesh;
        Sphere001: THREE.Mesh;
    };
    materials: {
        Material: THREE.MeshStandardMaterial;
    };
};

const MAX_JIRA_SCALE = 2.605;
const MIN_JIRA_SCALE = 0.2;

export function SprintMeter(props: JSX.IntrinsicElements['group']) {
    const { sprintMeterValue } = useContext(GameContext);

    const sprintMeterNormalized = sprintMeterValue / 100;

    const jiraPosition = THREE.MathUtils.lerp(
        -1.7, // Lower position when empty
        3.268, // Original position when full
        sprintMeterNormalized
    );

    const { nodes } = useGLTF('/sprint_meter.glb') as GLTFResult;
    return (
        <group {...props} dispose={null}>
            {/* base */}
            <group>
                <Html
                    transform
                    rotation={[0, Math.PI / 2, 0]}
                    position={[1, 0.5, 0]}
                    scale={0.5}
                >
                    <div>Sprint Meter</div>
                </Html>
                <mesh geometry={nodes.Cube.geometry} position={[0, 1.092, 0]}>
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>
            {/* Jira Juice */}
            <group>
                <mesh
                    geometry={nodes.Jira_color.geometry}
                    position={[0, jiraPosition, 0]}
                    scale={[0.396, MAX_JIRA_SCALE, 0.396]}
                >
                    <meshStandardMaterial color="#2e88ff" />
                </mesh>
            </group>

            {/* Glass */}
            <mesh
                geometry={nodes.Glass.geometry}
                position={[0, 3.439, 0]}
                scale={[0.495, 2.788, 0.495]}
            >
                <meshStandardMaterial
                    transparent
                    opacity={0.3}
                    color="#ffffff"
                    roughness={0}
                    metalness={0.5}
                    envMapIntensity={1}
                />
            </mesh>
            {/* Nutshell */}
            <group>
                <mesh
                    geometry={nodes.Cylinder.geometry}
                    position={[0, 7.686, 0]}
                    scale={[0.146, 0.219, 0.146]}
                >
                    <meshStandardMaterial color="orange" />
                </mesh>
                <mesh
                    geometry={nodes.Sphere.geometry}
                    position={[0, 6.693, 0]}
                    scale={0.73}
                >
                    <meshStandardMaterial color="orange" />
                </mesh>
                <mesh
                    geometry={nodes.Sphere001.geometry}
                    position={[0, 7.114, 0]}
                    scale={[0.949, 0.73, 0.949]}
                >
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload('/sprint_meter.glb');
