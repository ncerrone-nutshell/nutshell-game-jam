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
                    width: '8%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                }}
            >
                <div
                    style={{
                        height: '80%',
                        width: '100%',
                        backgroundColor: 'blue',
                        borderRadius: '8px',
                        border: '1px solid #fff',
                        zIndex: 1000,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            height: `${100 - props.sprintMeterPercentage}%`,
                            width: '100%',
                            backgroundColor: 'grey',
                        }}
                    />
                </div>
                <div style={{ fontSize: '20px', textAlign: 'center' }}>
                    Sprint Meter
                </div>
            </div>
        </Html>
    );
}
