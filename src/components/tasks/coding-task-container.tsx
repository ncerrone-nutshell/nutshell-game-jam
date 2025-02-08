import { useCallback, useContext, useState } from 'react';
import './coding-task-container.css';

import commits from '../../data/ccain-commits-sorted.json';
import { GameContextForwarded } from '../layout/computer-screen-provider';
import { ActionType, CoreTaskType } from '../game-manager/game-manager';

function pickRandomCommitMessage() {
    const randomIndex = Math.floor(Math.random() * commits.length);
    return commits[randomIndex].message;
}

function getAccuracy(commitMessage: string, targetMessage: string): number {
    if (commitMessage.length === 0) {
        return 0;
    }

    const correctChars = commitMessage
        .split('')
        .filter((char, index) => char === targetMessage[index]).length;

    return Math.round((correctChars / commitMessage.length) * 100);
}

function getScore(commitMessage: string, targetMessage: string) {
    const accuracy = getAccuracy(commitMessage, targetMessage);

    if (accuracy === 100) {
        return 100;
    } else if (accuracy >= 90) {
        return 80;
    } else if (accuracy >= 80) {
        return 60;
    } else if (accuracy >= 70) {
        return 30;
    } else if (accuracy >= 60) {
        return 10;
    } else if (accuracy >= 50) {
        return 5;
    }

    return 0;
}

export function CodingTaskContainer() {
    const { dispatch } = useContext(GameContextForwarded);
    const [targetMessage, setTargetMessage] = useState(
        pickRandomCommitMessage()
    );
    const [isFocused, setIsFocused] = useState(false);
    const [commitMessage, setCommitMessage] = useState<string>('');

    const handleCommit = useCallback(() => {
        dispatch({
            type: ActionType.CompleteTask,
            payload: {
                type: CoreTaskType.Coding,
                score: getScore(commitMessage, targetMessage),
            },
        });
        setTargetMessage(pickRandomCommitMessage());
        setCommitMessage('');
    }, [commitMessage, targetMessage]);

    return (
        <div className="commit-container">
            <CommitMessageScored
                commitMessage={commitMessage}
                onCommit={handleCommit}
                targetMessage={targetMessage}
                isActive={isFocused}
            />
            <textarea
                value={commitMessage}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (commitMessage.length >= targetMessage.length) {
                            handleCommit();
                        }
                    }
                }}
                className="commit-input"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ color: '#fff' }}
                onChange={(e) => setCommitMessage(e.target.value)}
            />
        </div>
    );
}

function CommitMessageScored(props: {
    commitMessage: string;
    targetMessage: string;
    onCommit: () => void;
    isActive: boolean;
}) {
    const characters = props.targetMessage.split('').map((char, index) => {
        if (props.commitMessage.length <= index) {
            return (
                <span
                    key={index}
                    className="commit-message-char"
                    style={{ color: '#757575' }}
                >
                    {char}
                </span>
            );
        }

        const isCorrect = props.commitMessage[index] === char;

        return (
            <span
                key={index}
                className={`commit-message-char ${
                    isCorrect ? 'correct' : 'incorrect'
                }`}
                style={{
                    color: isCorrect ? 'green' : 'red',
                }}
            >
                {char}
            </span>
        );
    });

    return (
        <div className={`commit-message ${props.isActive ? 'active' : ''}`}>
            {characters}
            <ControlBar
                onCommit={props.onCommit}
                targetMessage={props.targetMessage}
                commitMessage={props.commitMessage}
            />
        </div>
    );
}

type ControlBarProps = {
    onCommit: () => void;
    commitMessage: string;
    targetMessage: string;
};

function ControlBar(props: ControlBarProps) {
    return (
        <div className="commit-control-bar">
            <div className="commit-control-bar-text">
                {props.commitMessage.length} / {props.targetMessage.length}
            </div>
            <div className="commit-control-bar-text">
                {props.commitMessage.length
                    ? getAccuracy(props.commitMessage, props.targetMessage) +
                      '%'
                    : '--%'}
            </div>
            <button
                className="task-button commit-btn"
                disabled={
                    props.commitMessage.length < props.targetMessage.length
                }
                onClick={() => {
                    props.onCommit();
                }}
            >
                Commit
            </button>
        </div>
    );
}
