import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export function App() {
    const cubeRef = useRef<Mesh>(null)

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.01
            cubeRef.current.rotation.y += 0.01
        }
    })

    return (
        <>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[1, 1, 1]} />
            <mesh ref={cubeRef}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </>
    )
}
