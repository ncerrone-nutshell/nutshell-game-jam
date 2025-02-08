import { useContext } from 'react';
import { ActionType, CoreTaskType } from '../game-manager/game-manager';
import './task.css';
import { GameContextForwarded } from '../layout/computer-screen-provider';

export function FigmaTaskContainer() {
    const { dispatch } = useContext(GameContextForwarded);
    return (
        <button
            className="task-button review"
            onClick={() => {
                dispatch({
                    type: ActionType.CompleteTask,
                    payload: {
                        type: CoreTaskType.Figma,
                        score: 1,
                    },
                });
            }}
        >
            Create mock-up
        </button>
    );
}
