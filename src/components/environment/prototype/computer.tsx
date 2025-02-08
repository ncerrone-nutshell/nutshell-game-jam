import { EnvironmentProps } from '../helpers';

export function Computer(props: EnvironmentProps) {
    return (
        <>
            <group position={props.position} rotation={props.rotation}>
                <mesh scale={[8, 5, 2]} castShadow>
                    <boxGeometry />
                    <meshStandardMaterial color={'#7d7776'} />
                </mesh>
                <mesh position={[0, -3, 0]} castShadow>
                    <boxGeometry />
                    <meshStandardMaterial color={'#a89793'} />
                </mesh>
            </group>
        </>
    );
}
