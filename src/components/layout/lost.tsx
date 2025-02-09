import { useContext } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import { ActionType } from '../game-manager/game-manager';

export function LostScreen() {
    const { dispatch } = useContext(GameContextForwarded);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontSize: '24px',
                fontWeight: 'bold',
            }}
            onMouseEnter={() =>
                dispatch({
                    type: ActionType.SetScreenFocus,
                    payload: { isScreenFocused: true },
                })
            }
            onMouseLeave={() =>
                dispatch({
                    type: ActionType.SetScreenFocus,
                    payload: { isScreenFocused: false },
                })
            }
        >
            You lost!
            <button
                style={{
                    padding: '16px 32px',
                    borderRadius: '8px',
                    backgroundColor: 'orange',
                    color: 'white',
                }}
                onClick={() => dispatch({ type: ActionType.ResetGame })}
            >
                Try again?
            </button>
        </div>
    );
}
