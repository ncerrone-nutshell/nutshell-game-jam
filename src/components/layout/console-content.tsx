import { useContext } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import './console-content.css';

export enum ConsoleContentItemType {
    Console = 'console',
    File = 'file',
    Folder = 'folder',
}

type ConsoleContentProps = {
    onTriggerEvent: (type: ConsoleContentItemType) => void;
};

export function ConsoleContent(props: ConsoleContentProps) {
    const { day, score, completedTasks, sprintMeterValue } =
        useContext(GameContextForwarded);
    const { onTriggerEvent } = props;

    return (
        <div className="console-content">
            <div className="console-content-items">
                <ConsoleContentItem
                    onClick={() => {
                        onTriggerEvent(ConsoleContentItemType.Console);
                    }}
                >
                    Trigger hackathon
                </ConsoleContentItem>
                <ConsoleContentItem
                    onClick={() => {
                        onTriggerEvent(ConsoleContentItemType.Console);
                    }}
                >
                    Trigger escalation process
                </ConsoleContentItem>
                <ConsoleContentItem
                    onClick={() => {
                        onTriggerEvent(ConsoleContentItemType.Console);
                    }}
                >
                    Trigger arjun pong
                </ConsoleContentItem>
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
