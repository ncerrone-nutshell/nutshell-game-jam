import { useContext } from 'react';
import { ActionType } from '../game-manager/game-manager';

import './task.css';
import { GameContextForwarded } from '../layout/computer-screen-provider';

export function JenkinsTaskContainer() {
    const { dispatch, completedTasks } = useContext(GameContextForwarded);
    return (
        <button
            className="task-button review"
            onClick={() => {
                const releaseScore = Object.values(completedTasks).reduce(
                    (acc: number, task: any) => acc * (task.score || 1),
                    1
                );

                dispatch({
                    type: ActionType.PushRelease,
                    payload: {
                        score: releaseScore,
                    },
                });
            }}
        >
            Push release
        </button>
    );
}
