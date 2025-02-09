import { useContext } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import { ActionType } from '../game-manager/game-manager';
import NutshellIcon from '../../icons/figma-task/nutshell';

export function Login() {
    const { dispatch } = useContext(GameContextForwarded);

    const handleLogin = () => {
        dispatch({
            type: ActionType.StartGame,
        });
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '32px',
            }}
        >
            <div
                style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'orange',
                }}
            >
                Welcome to Nutshell
            </div>
            <NutshellIcon width={100} height={100} color="grey" />
            {/* Input doesn't go anywhere ATM, but could be used for a scoreboard at some point */}
            <input
                style={{
                    width: '20%',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    border: '1px solid grey',
                }}
                className="data-1p-ignore"
                type="text"
                placeholder="Enter your name to begin"
                autoComplete="off"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleLogin();
                    }
                }}
            />
            <button
                style={{
                    padding: '16px 32px',
                    borderRadius: '8px',
                    backgroundColor: 'orange',
                    color: 'white',
                }}
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
}
