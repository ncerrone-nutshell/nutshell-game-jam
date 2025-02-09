import { useContext } from 'react';
import { ActionType } from '../game-manager/game-manager';

import './jenkins-task-container.css';
import { GameContextForwarded } from '../layout/computer-screen-provider';

const BASE_RELEASE_SCORE = 100;
const BASE_RELEASE_SPRINT_METER_GAIN = 5;

export function JenkinsTaskContainer() {
    const { dispatch, completedTasks } = useContext(GameContextForwarded);

    const handlePushRelease = () => {
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
    };

    return (
        <div className="jenkins-task-container">
            <div className="jenkins-task-header">
                <div>Jenkins {'>'} nutshell-release</div>
            </div>
            <div className="jenkins-task-content">
                <div className="jenkins-task-sidebar">
                    <div className="jenkins-task-sidebar-section">
                        <div
                            className="jenkins-task-sidebar-item"
                            style={{ fontWeight: 'bold' }}
                        >
                            <img
                                src="https://nutcracker.squirrel.house/static/3865d53e/images/24x24/search.png"
                                alt="Search"
                            />
                            <div>Status</div>
                        </div>
                        <div className="jenkins-task-sidebar-item">
                            <img
                                src="https://nutcracker.squirrel.house/static/3865d53e/images/24x24/notepad.png"
                                alt="Notepad"
                            />
                            <div>Changes</div>
                        </div>
                        <div
                            className="jenkins-task-sidebar-item build-now-item"
                            onClick={handlePushRelease}
                        >
                            <img
                                src="https://nutcracker.squirrel.house/static/3865d53e/images/24x24/clock.png"
                                alt="Jenkins"
                            />
                            <div>Build now</div>
                        </div>

                        <div className="jenkins-task-sidebar-item">
                            <img
                                src="https://nutcracker.squirrel.house/static/3865d53e/images/24x24/gear2.png"
                                alt="Gear"
                            />
                            <div>Configure</div>
                        </div>
                    </div>
                    <div className="jenkins-task-build-history-container">
                        <div className="build-history-header">
                            <img
                                src="https://nutcracker.squirrel.house/static/3865d53e/images/16x16/health-80plus.png"
                                alt="Health"
                            />
                            <div>Build History</div>
                        </div>
                        <div className="build-history-items">
                            <BuildHistoryItem number={1} />
                            <BuildHistoryItem number={2} />
                            <BuildHistoryItem number={3} />
                        </div>
                    </div>
                </div>
                <div className="jenkins-task-release-container">
                    <div className="jenkins-task-release-header">
                        Project nutshell-release
                    </div>
                    <div className="jenkins-task-release-description">
                        Start this job to build + deploy the app via AWS
                        CodeDeploy.
                    </div>
                    <div className="jenkins-task-release-breakdown-container">
                        <div className="jenkins-task-release-breakdown-item">
                            Unreleased commits:
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BuildHistoryItem({ number }: { number: number }) {
    return (
        <div className="build-history-item">
            <img
                src="https://nutcracker.squirrel.house/static/3865d53e/images/16x16/blue.png"
                alt="Blue"
            />
            <div className="build-history-item-number">#{number}</div>
            <div className="build-history-item-date">Today</div>
            <div className="build-history-item-score">100</div>
        </div>
    );
}
