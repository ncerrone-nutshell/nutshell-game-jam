import { useFrame, useThree } from '@react-three/fiber';
import { useContext, useEffect, useState } from 'react';
import { Vector2, Vector3 } from 'three';
import { GameContext } from '../game-manager/game-manager';

export function NutCamera() {
    const { camera } = useThree();
    const { isScreenFocused } = useContext(GameContext);
    const [mouse, setMouse] = useState(new Vector2());
    const [current, setCurrent] = useState(new Vector2());

    useEffect(() => {
        camera.position.set(0, 1, 5);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMouse(
                new Vector2(
                    (event.clientX / window.innerWidth) * 2 - 1,
                    -(event.clientY / window.innerHeight) * 2 + 1
                )
            );
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame(() => {
        const nextStep = isScreenFocused ? new Vector2(0, 1) : mouse;
        const alpha = isScreenFocused ? 0.05 : 0.03;

        setCurrent(current.lerp(nextStep, alpha));

        camera.lookAt(new Vector3(current.x, current.y, -1));
    });

    return <></>;
}
