import { useEffect, useState } from 'react';
import { BrowserHeader } from './browser-header';
import { ConsoleContainer } from './console-container';
import { ConsoleContentItemType } from './console-content';
import { TaskContainer } from './task-container';

import './computer-screen.css';

export enum Tab {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
}

export enum TaskType {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
}

export type CompletedTaskType = {
    [key in TaskType]: {
        score: number;
        completedCount: number;
    };
};

const EMPTY_COMPLETED_TASKS: CompletedTaskType = {
    [TaskType.Coding]: {
        score: 0,
        completedCount: 0,
    },
    [TaskType.Review]: {
        score: 0,
        completedCount: 0,
    },
    [TaskType.Figma]: {
        score: 0,
        completedCount: 0,
    },
};

export function ComputerScreen() {
    const [score, setScore] = useState<number>(0);
    const [life, setLife] = useState<number>(100);
    const [days, setDays] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Coding);

    const [completedTasks, setCompletedTasks] = useState<CompletedTaskType>(
        EMPTY_COMPLETED_TASKS
    );

    const handlePushRelease = () => {
        console.log(Object.values(completedTasks));
        const releaseScore = Object.values(completedTasks).reduce(
            (acc, task) => acc * (task.score || 1),
            1
        );

        console.log(releaseScore);

        setScore(score + releaseScore);
        // setCompletedTasks(EMPTY_COMPLETED_TASKS);
    };

    useEffect(() => {
        const lifeInterval = setInterval(() => {
            if (life > 0) {
                setLife(life - 1);
            }
        }, 1000);

        const daysInterval = setInterval(() => {
            setDays(days + 1);
        }, 5000);

        return () => {
            clearInterval(lifeInterval);
            clearInterval(daysInterval);
        };
    }, [life, days]);

    return (
        <div className="screen-container">
            <div className="container">
                <BrowserHeader
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    completedTasks={completedTasks}
                />
                <div className="content">
                    <TaskContainer
                        activeTab={activeTab}
                        onComplete={(taskType: TaskType, taskScore: number) => {
                            setCompletedTasks({
                                ...completedTasks,
                                [taskType]: {
                                    ...completedTasks[taskType],
                                    score:
                                        completedTasks[taskType].score +
                                        taskScore,
                                    completedCount:
                                        completedTasks[taskType]
                                            .completedCount + 1,
                                },
                            });
                            setScore(score + taskScore);
                        }}
                        onPushRelease={handlePushRelease}
                    />
                    <ConsoleContainer
                        onTriggerEvent={(type: ConsoleContentItemType) => {
                            console.log(type);
                        }}
                        completedTasks={completedTasks}
                        score={score}
                        life={life}
                        days={days}
                    />
                </div>
            </div>
        </div>
    );
}
