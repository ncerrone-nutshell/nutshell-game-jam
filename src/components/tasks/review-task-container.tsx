import { useContext } from 'react';
import { ActionType, CoreTaskType } from '../game-manager/game-manager';
import './task.css';
import { GameContextForwarded } from '../layout/computer-screen-provider';

export function ReviewTaskContainer() {
    const { dispatch } = useContext(GameContextForwarded);
    return (
        <button
            className="task-button review"
            onClick={() => {
                dispatch({
                    type: ActionType.CompleteTask,
                    payload: {
                        type: CoreTaskType.Review,
                        score: 1,
                    },
                });
            }}
        >
            Review PR
        </button>
    );
}
