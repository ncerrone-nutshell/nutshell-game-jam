import './lost.css';
import { useContext } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import {
    ActionType,
    DIFFICULTY_DISPLAY_NAME_MAP,
} from '../game-manager/game-manager';
import NutshellIcon from '../../icons/figma-task/nutshell';

export function LostScreen() {
    const { dispatch, score, day, userName, difficulty } =
        useContext(GameContextForwarded);

    return (
        <div
            className="lost-container"
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
            <div className="lost-banner">
                Farewell, {userName.length === 0 ? 'Nutsheller' : userName}!
            </div>
            <NutshellIcon width={100} height={100} color="grey" />
            <div className="lost-stats">
                <div>Days Survived: {day}</div>
                <div>Total Score: {score}</div>
                <div>
                    Final Title: {DIFFICULTY_DISPLAY_NAME_MAP[difficulty]}
                </div>
            </div>
            <button
                className="lost-retry-button"
                onClick={() => dispatch({ type: ActionType.ResetGame })}
            >
                Try again?
            </button>
        </div>
    );
}
