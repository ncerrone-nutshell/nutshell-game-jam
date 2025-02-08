import "./main-computer.css"
import { Html } from "@react-three/drei"

export function MainComputer() {

    return (
        <>
            <group>
                <mesh scale={[8, 5, 2]}>
                    <boxGeometry />
                    <meshStandardMaterial color={"#7d7776"}/>
                </mesh>
                <mesh>
                    <Html className="wrapper" position={[0, 0, 1.01]} transform occlude>
                        <div className="screen-text">
                            YO
                        </div>
                    </Html>
                </mesh>
                <mesh position={[0, -3, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color={"#a89793"}/>
                </mesh>
            </group>
        </>
    )
}
