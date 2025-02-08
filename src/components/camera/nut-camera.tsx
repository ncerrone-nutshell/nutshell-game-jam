import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';
import { easing } from 'maath';

export function NutCamera() {
    const cameraRef = useRef<PerspectiveCamera>(null);
    const { pointer } = useThree();

    useEffect(() => {
        cameraRef.current?.position.set(0, 0, 5);
    }, []);

    useFrame((state) => {
        if (!cameraRef.current) return;

        easing.dampE(
            cameraRef.current.rotation,
            [pointer.y * 0.05, -pointer.x * 0.08, 0],
            0.02,
            state.clock.getDelta()
        );
    });

    return (
        <>
            <perspectiveCamera ref={cameraRef} />
        </>
    );
}
