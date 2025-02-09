import { useCallback, useContext, useEffect, useState } from 'react';
import GithubMark from '../../icons/github';
import './review-task-container.css';

import { GameContextForwarded } from '../layout/computer-screen-provider';
import { ActionType, CoreTaskType } from '../game-manager/game-manager';
import { DEV_MODE } from '../../main';
import { COMPLETE_TASK_EVENT } from '../layout/console-content';

const LINES = [
    'const handleSubmit = (event) => {',
    '    event.preventDefault();',
    '    setLoading(true);',
    '    processData(formData);',
    '};',
    'function calculateTotal(items) {',
    '    return items.reduce((sum, item) => sum + item.price, 0);',
    '}',
    'const userProfile = {',
    '    name: "John Smith",',
    '    role: "Developer",',
    '    team: "Frontend"',
    '};',
    'async function fetchUserData(userId) {',
    '    const response = await fetch(`/api/users/${userId}`);',
    '    return response.json();',
    '}',
    'const THEME_COLORS = {',
    '    primary: "#007bff",',
    '    secondary: "#6c757d",',
    '    success: "#28a745"',
    '};',
    'function validateEmail(email) {',
    '    const regex = /^[^s@]+@[^s@]+.[^s@]+$/;',
    '    return regex.test(email);',
    '}',
    'const formatDate = (date) => {',
    '    return new Date(date).toLocaleDateString();',
    '};',
    'const MAX_RETRY_ATTEMPTS = 3;',
];

const filename = 'src/components/tasks/review-task-container.tsx';

const MIN_LINES = 4;
const MAX_LINES_EASY = 10;
const MAX_LINES_MEDIUM = 12;
const MAX_LINES_HARD = 20;

const MAX_LINES = {
    1: MAX_LINES_EASY,
    2: MAX_LINES_MEDIUM,
    3: MAX_LINES_HARD,
};

export function ReviewTaskContainer() {
    const [randomBugIndex, setRandomBugIndex] = useState<number | null>(null);
    const [bugCharacterIndex, setBugCharacterIndex] = useState<number | null>(
        null
    );
    const [numLines, setNumLines] = useState<number>(1);
    const [failedTask, setFailedTask] = useState<boolean>(false);
    const [hoveredLineIndex, setHoveredLineIndex] = useState<number | null>(
        null
    );
    const [isReviewingLineIndex, setIsReviewingLineIndex] = useState<
        number | null
    >(null);
    const { dispatch, difficulty } = useContext(GameContextForwarded);

    const handleTaskCompleted = () => {
        dispatch({
            type: ActionType.CompleteTask,
            payload: {
                type: CoreTaskType.Review,
                score: 1,
            },
        });

        resetTask(MAX_LINES_EASY);
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

    const handleAttemptToReport = (index: number) => {
        if (index === randomBugIndex) {
            handleTaskCompleted();
        } else {
            setFailedTask(true);
        }
    };

    useEffect(() => {
        resetTask(MAX_LINES[difficulty]);
    }, []);

    const resetTask = useCallback(
        (maxLines: number) => {
            const randomizedNumLines =
                Math.floor(Math.random() * maxLines) + MIN_LINES;

            setFailedTask(false);
            setIsReviewingLineIndex(null);
            setHoveredLineIndex(null);
            setNumLines(randomizedNumLines);
            const randomBugIndex = Math.floor(
                Math.random() * randomizedNumLines
            );
            setRandomBugIndex(randomBugIndex);
            const bugCharacterIndex = Math.floor(
                Math.random() * LINES[randomBugIndex].length
            );
            setBugCharacterIndex(bugCharacterIndex);
        },
        [failedTask]
    );

    useEffect(() => {
        if (failedTask) {
            setTimeout(() => {
                setFailedTask(false);
            }, 5000);
        }
    }, [failedTask]);

    return (
        <div className="review-task-container">
            <div className="code-container">
                <div className="code-container-header">
                    <div className="code-container-header-icon">
                        <GithubMark height={32} width={32} />
                    </div>
                    <div className="code-container-header-lines">
                        {numLines}
                    </div>
                    <Boxes />
                    {filename}
                </div>
                {failedTask && (
                    <div className="code-container-failed-task-warning">
                        You reported a bug that was not there. Please wait 5
                        seconds before trying again
                    </div>
                )}
                <div className="code-container-content">
                    <div className="code-container-line-numbers">
                        {LINES.slice(0, numLines).map((_, index) => (
                            <div
                                key={index}
                                className="code-container-line-number"
                            >
                                {index}
                            </div>
                        ))}
                    </div>
                    <div className="code-container-line-content">
                        {LINES.slice(0, numLines).map((line, index) => {
                            return (
                                <div
                                    key={line + index}
                                    onClick={() => {
                                        if (failedTask === false) {
                                            setHoveredLineIndex(null);
                                            setIsReviewingLineIndex(index);
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        if (
                                            isReviewingLineIndex === null &&
                                            failedTask === false
                                        ) {
                                            setHoveredLineIndex(index);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredLineIndex(null);
                                    }}
                                    className="code-container-line"
                                >
                                    {hoveredLineIndex === index && (
                                        <div className="code-container-line-plus">
                                            +
                                        </div>
                                    )}
                                    {isReviewingLineIndex === index && (
                                        <div className="code-container-line-review-container">
                                            Leave review for line {index}
                                            <div className="code-container-line-review-container-buttons">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsReviewingLineIndex(
                                                            null
                                                        );
                                                    }}
                                                    className="code-container-line-review-container-button cancel"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsReviewingLineIndex(
                                                            null
                                                        );
                                                        handleAttemptToReport(
                                                            index
                                                        );
                                                    }}
                                                    className="code-container-line-review-container-button report"
                                                >
                                                    Report bug
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <span style={{ color: 'white' }}>
                                            +
                                        </span>{' '}
                                        {line
                                            .split('')
                                            .map((char, charIndex) => {
                                                return (
                                                    <Character
                                                        key={charIndex}
                                                        char={char}
                                                        isBugCharacter={
                                                            charIndex ===
                                                                bugCharacterIndex &&
                                                            index ===
                                                                randomBugIndex
                                                        }
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Character({
    char,
    isBugCharacter,
}: {
    char: string;
    isBugCharacter: boolean;
}) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <span
            onMouseEnter={isBugCharacter ? () => setIsHovered(true) : undefined}
            onMouseLeave={
                isBugCharacter ? () => setIsHovered(false) : undefined
            }
        >
            {isHovered ? '🐛' : char}
        </span>
    );
}

function Boxes() {
    return (
        <div className="boxes">
            <div className="box"></div>
            <div className="box red"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
        </div>
    );
}
