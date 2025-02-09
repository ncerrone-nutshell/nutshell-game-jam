import { Euler, RepeatWrapping, Texture, Vector3 } from 'three';

export type EnvironmentProps = {
    position?: Vector3;
    rotation?: Euler;
};

export function setupTexture(
    texture: Texture,
    repeatX: number,
    repeatY: number
): void {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.needsUpdate = true;
}
