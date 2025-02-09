import { useContext } from 'react';
import { ActionType } from '../game-manager/game-manager';

import './jenkins-task-container.css';
import { GameContextForwarded } from '../layout/computer-screen-provider';
import { PieChart } from 'react-minimal-pie-chart';
import { getReleaseScoreGain, getReleaseSprintMeterGain } from './helpers';

export function JenkinsTaskContainer() {
    const { dispatch, completedTasks } = useContext(GameContextForwarded);

    const handlePushRelease = () => {
        dispatch({
            type: ActionType.PushRelease,
            payload: {
                score: getReleaseScoreGain(completedTasks),
                sprintMeterGain: getReleaseSprintMeterGain(completedTasks),
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
                            Commit breakdown:{' '}
                            {completedTasks.coding.completedCount ||
                            completedTasks.review.completedCount ||
                            completedTasks.figma.completedCount
                                ? ''
                                : 'up to date with main'}
                        </div>
                        {completedTasks.coding.completedCount ||
                        completedTasks.review.completedCount ||
                        completedTasks.figma.completedCount ? (
                            <div
                                style={{
                                    paddingTop: '30px',
                                    width: '65%',
                                    height: '65%',
                                }}
                            >
                                <PieChart
                                    labelStyle={{
                                        fontSize: '5px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                    label={({ dataEntry }) => {
                                        if (dataEntry.value == 0) {
                                            return '';
                                        }
                                        return `${dataEntry.title}`;
                                    }}
                                    data={[
                                        {
                                            title: 'Code',
                                            value: completedTasks.coding
                                                .completedCount,
                                            color: '#e38627',
                                            key: 'code',
                                        },
                                        {
                                            title: 'Review',
                                            value: completedTasks.review
                                                .completedCount,
                                            color: '#0f46bd',
                                            key: 'review',
                                        },
                                        {
                                            title: 'Design',
                                            value: completedTasks.figma
                                                .completedCount,
                                            color: '#2ab711',
                                            key: 'design',
                                        },
                                    ]}
                                />
                                <div className="jenkins-task-multiplier-container">
                                    <div className="jenkins-task-coding-multiplier">
                                        {completedTasks.coding.completedCount}
                                    </div>
                                    x
                                    <div className="jenkins-task-review-multiplier">
                                        {completedTasks.review.completedCount}
                                    </div>
                                    x
                                    <div className="jenkins-task-design-multiplier">
                                        {completedTasks.figma.completedCount}
                                    </div>
                                    x 100 =
                                    <div className="jenkins-task-multiplier-result">
                                        {getReleaseScoreGain(completedTasks)}
                                    </div>
                                </div>
                            </div>
                        ) : null}
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
