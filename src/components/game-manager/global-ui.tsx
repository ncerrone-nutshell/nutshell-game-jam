import { Html } from '@react-three/drei';

interface Props {
    sprintMeterPercentage: number;
}

/**
 * UI to display anything that should always be visible on the screen
 */
export function GlobalUI(props: Props) {
    return (
        <Html fullscreen>
            <div
                style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    height: `${props.sprintMeterPercentage}%`,
                    width: '20px',
                    backgroundColor: 'blue',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    opacity: 0.5,
                }}
            />
        </Html>
    );
}
