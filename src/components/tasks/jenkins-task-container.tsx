import { useContext } from 'react';
import { ActionType } from '../game-manager/game-manager';

import './task.css';
import { GameContextForwarded } from '../layout/computer-screen-provider';

const BASE_RELEASE_SCORE = 100;
const BASE_RELEASE_SPRINT_METER_GAIN = 5;

export function JenkinsTaskContainer() {
    const { dispatch, completedTasks } = useContext(GameContextForwarded);
    return (
        <button
            className="task-button review"
            onClick={() => {
                const releaseMultiplier = Object.values(completedTasks).reduce(
                    (acc: number, task: any) => acc * (task.score || 0),
                    1
                );

                dispatch({
                    type: ActionType.PushRelease,
                    payload: {
                        score: BASE_RELEASE_SCORE * releaseMultiplier,
                        sprintMeterGain:
                            BASE_RELEASE_SPRINT_METER_GAIN * releaseMultiplier,
                    },
                });
            }}
        >
            Push release
        </button>
    );
}
