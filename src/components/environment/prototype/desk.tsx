import { EnvironmentProps } from '../helpers';

export function Desk(props: EnvironmentProps) {
    return (
        <>
            <group position={props.position} rotation={props.rotation}>
                <mesh scale={[18, 0.3, 8]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#eee9e8'} />
                </mesh>
                <mesh position={[-7, -2.65, 0]} scale={[3, 5, 3]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#d3d3d3'} />
                </mesh>
                <mesh position={[7, -2.5, 0]} scale={[0.7, 4.5, 1]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#d3d3d3'} />
                </mesh>
                <mesh position={[7, -4.6, 0]} scale={[1, 0.3, 5]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'#d3d3d3'} />
                </mesh>
            </group>
        </>
    );
}
