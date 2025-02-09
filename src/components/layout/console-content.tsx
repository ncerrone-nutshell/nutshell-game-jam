import { useContext } from 'react';
import { DIFFICULTY_DISPLAY_NAME_MAP } from '../game-manager/game-manager';
import { GameContextForwarded } from './computer-screen-provider';
import './console-content.css';
import { DEV_MODE } from '../../main';

export enum ConsoleContentItemType {
    Console = 'console',
    File = 'file',
    Folder = 'folder',
}

type ConsoleContentProps = {
    onTriggerEvent: (type: ConsoleContentItemType) => void;
};

export const COMPLETE_TASK_EVENT = 'complete-task-dev';

export function ConsoleContent(props: ConsoleContentProps) {
    const { day, score, completedTasks, sprintMeterValue, difficulty } =
        useContext(GameContextForwarded);

    const { onTriggerEvent } = props;

    return (
        <div className="console-content">
            <div className="console-content-items">
                {DEV_MODE && (
                    <ConsoleContentItem
                        onClick={() => {
                            window.dispatchEvent(
                                new Event(COMPLETE_TASK_EVENT)
                            );
                        }}
                    >
                        Complete current task (debug only)
                    </ConsoleContentItem>
                )}
            </div>
            <div className="console-content-status">
                <div className="console-content-status-title">
                    Current release:
                </div>
                {Object.entries(completedTasks).map(([task, score]) => (
                    <div key={task} className="console-content-status-item">
                        <div>{task}</div>
                        <div>completed: {score.completedCount}</div>
                        <div>score: {score.score}</div>
                    </div>
                ))}
                <div className="console-content-status-item">
                    <div className="console-content-status-score">
                        Score: {score}
                    </div>
                    <div className="console-content-status-life">
                        Life: {sprintMeterValue}
                    </div>
                    <div className="console-content-status-days">
                        Days: {day}
                    </div>
                    <div className="console-content-status-difficulty">
                        Difficulty: {DIFFICULTY_DISPLAY_NAME_MAP[difficulty]}
                    </div>
                </div>
            </div>
        </div>
    );
}

type ConsoleContentItemProps = {
    onClick: () => void;
    children: React.ReactNode;
};

function ConsoleContentItem(props: ConsoleContentItemProps) {
    const { onClick, children } = props;

    return (
        <div onClick={onClick} className="console-content-item">
            {'>'} {children}
        </div>
    );
}
