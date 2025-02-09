import { useFrame, useThree } from '@react-three/fiber';
import { useContext, useEffect } from 'react';
import { easing } from 'maath';
import { Euler } from 'three';
import { GameContext } from '../game-manager/game-manager';

export function NutCamera() {
    const { camera } = useThree();
    const { isScreenFocused } = useContext(GameContext);

    useEffect(() => {
        camera.position.set(0, 1, 5);
    }, []);

    useFrame((state) => {
        // TODO: FIX this method is only percieved on a state change, such as a
        // console log
        console.log(state.pointer);

        const target = isScreenFocused
            ? new Euler(0, 0, 0)
            : new Euler(state.pointer.y * 0.2, -state.pointer.x * 0.2, 0);
        const speed = isScreenFocused ? 0.001 : 0.01;

        easing.dampE(camera.rotation, target, speed, state.clock.getDelta());
    });

    return <></>;
}
