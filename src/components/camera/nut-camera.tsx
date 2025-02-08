import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { easing } from 'maath';

export function NutCamera() {
    const { pointer, camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 1, 5);
    }, []);

    useFrame((state) => {
        easing.dampE(
            camera.rotation,
            [pointer.y * 0.05, -pointer.x * 0.08, 0],
            0.02,
            state.clock.getDelta()
        );
    });

    return <></>;
}
