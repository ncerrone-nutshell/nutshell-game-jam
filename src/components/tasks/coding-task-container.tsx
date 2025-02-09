import { useCallback, useContext, useEffect, useState } from 'react';
import './coding-task-container.css';

import commits from '../../data/ccain-commits-sorted.json';
import { GameContextForwarded } from '../layout/computer-screen-provider';
import {
    ActionType,
    CoreTaskType,
    Difficulty,
} from '../game-manager/game-manager';
import { DEV_MODE } from '../../main';
import { COMPLETE_TASK_EVENT } from '../layout/console-content';

const MAX_SCORE = 100;

/**
 * This map defines the maximum length of commit you will be served in the
 * coding task. Messages selected will tend to be towards the higher end of
 * the range.
 */
const COMMIT_LENGTH_DIFFICULTY_MAP = {
    1: 50, // Easy
    2: 100, // Medium
    3: 200, // Hard
} as const;

interface Commit {
    message: string;
    chars: number;
}

/**
 * Picks a random commit message based on the difficulty. Tends to select
 * commits towards the upper end of the possible range.
 *
 * @param difficulty - The difficulty level of the task.
 * @returns A random commit message.
 */
function pickRandomCommitMessage(difficulty: Difficulty) {
    // Commits are already sorted by length, so we can just pick a random index
    const sortedCommits: Commit[] = commits;

    const maxLength = COMMIT_LENGTH_DIFFICULTY_MAP[difficulty];

    // Already sorted by length
    const filteredCommits = sortedCommits.filter(
        (commit) => commit.chars <= maxLength
    );

    const randomValue = 1 - Math.pow(Math.random(), 3);
    const randomIndex = Math.floor(randomValue * filteredCommits.length);

    return filteredCommits[randomIndex].message;
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
    if (DEV_MODE) {
        return MAX_SCORE;
    }

    const accuracy = getAccuracy(commitMessage, targetMessage);

    // Convert accuracy to decimal percentage (0-1)
    const percentage = accuracy / 100;

    // Apply x^4 interpolation and scale back to 0-100 range
    // This creates a steeper curve that rewards higher accuracy
    return Math.round(Math.pow(percentage, 4) * MAX_SCORE);
}

export function CodingTaskContainer() {
    const { dispatch, difficulty } = useContext(GameContextForwarded);
    const [targetMessage, setTargetMessage] = useState(
        pickRandomCommitMessage(difficulty)
    );
    const [isFocused, setIsFocused] = useState(false);
    const [commitMessage, setCommitMessage] = useState<string>('');

    const handleCommit = useCallback(() => {
        handleTaskCompleted();
    }, [commitMessage, targetMessage]);

    const handleTaskCompleted = () => {
        dispatch({
            type: ActionType.CompleteTask,
            payload: {
                type: CoreTaskType.Coding,
                score: getScore(commitMessage, targetMessage),
            },
        });
        setTargetMessage(pickRandomCommitMessage(difficulty));
        setCommitMessage('');
    };

    useEffect(() => {
        const handleCompleteTask = () => {
            if (DEV_MODE) {
                handleTaskCompleted();
            }
        };

        window.addEventListener(COMPLETE_TASK_EVENT, handleCompleteTask);

        return () => {
            window.removeEventListener(COMPLETE_TASK_EVENT, handleCompleteTask);
        };
    }, []);

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
                autoFocus={true}
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
                className="commit-btn"
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
