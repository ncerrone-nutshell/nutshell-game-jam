import { Tab } from './computer-screen';
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
    JenkinsTaskContainer,
} from '../tasks';

import './task-container.css';
import { GuruCard } from '../tasks/guru-card';
import { ActionType, TaskType } from '../game-manager/game-manager';
import { GameContextForwarded } from './computer-screen-provider';
import { useContext } from 'react';

interface TaskContainerProps {
    activeTab: Tab;
}

function getTaskTypeFromTab(tab: Tab) {
    switch (tab) {
        case Tab.Coding:
            return TaskType.Coding;
        case Tab.Review:
            return TaskType.Review;
        case Tab.Figma:
            return TaskType.Figma;
        case Tab.Jenkins:
            return TaskType.Jenkins;
        default:
            return null;
    }
}

export function TaskContainer(props: TaskContainerProps) {
    const { activeTab } = props;
    const { requiredTasks, dispatch } = useContext(GameContextForwarded);
    const customTask = requiredTasks.find((task) => task.id === activeTab);
    const customTaskType = customTask?.type;

    const taskEndTime =
        customTask?.startTimestamp + customTask?.timeToCompleteDuration;

    const taskType = customTaskType || getTaskTypeFromTab(activeTab);

    return (
        <div className="task-container">
            {taskType && <GuruCard taskType={taskType} />}
            <div className="task-content-container">
                {taskType === TaskType.Coding && <CodingTaskContainer />}
                {taskType === TaskType.Review && <ReviewTaskContainer />}
                {taskType === TaskType.Figma && <FigmaTaskContainer />}
                {taskType === TaskType.Jenkins && <JenkinsTaskContainer />}
                {customTask && (
                    <>
                        {taskType === TaskType.CsvImport && (
                            <CsvImportTaskContainer
                                eventId={customTask.id}
                                score={customTask.penaltyScore}
                            />
                        )}
                        {taskType === TaskType.ArjunPongRequest && (
                            <ArjunPongRequestTaskContainer
                                eventId={customTask.id}
                                score={customTask.penaltyScore}
                            />
                        )}
                        {taskType === TaskType.AdoptionReport && (
                            <AdoptionReportTaskContainer
                                eventId={customTask.id}
                                score={customTask.penaltyScore}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

type TaskProps = {
    eventId: string;
    score: number;
};

function CsvImportTaskContainer(props: TaskProps) {
    const { dispatch } = useContext(GameContextForwarded);
    const { eventId, score } = props;

    return (
        <button
            style={{ color: 'black', fontSize: 25, padding: 16 }}
            onClick={() => {
                dispatch({
                    type: ActionType.EndEvent,
                    payload: {
                        id: eventId,
                        score,
                        success: true,
                    },
                });
            }}
        >
            TODO: CsvImportTaskContainer
        </button>
    );
}

function ArjunPongRequestTaskContainer(props: TaskProps) {
    const { dispatch } = useContext(GameContextForwarded);

    const { eventId, score } = props;

    return (
        <button
            style={{ color: 'black', fontSize: 25, padding: 16 }}
            onClick={() => {
                dispatch({
                    type: ActionType.EndEvent,
                    payload: {
                        id: eventId,
                        score,
                        success: true,
                    },
                });
            }}
        >
            TODO: ArjunPongRequestTaskContainer
        </button>
    );
}

function AdoptionReportTaskContainer(props: TaskProps) {
    const { dispatch } = useContext(GameContextForwarded);

    const { eventId, score } = props;

    return (
        <button
            style={{ color: 'black', fontSize: 25, padding: 16 }}
            onClick={() => {
                dispatch({
                    type: ActionType.EndEvent,
                    payload: {
                        id: eventId,
                        score,
                        success: true,
                    },
                });
            }}
        >
            TODO: AdoptionReportTaskContainer
        </button>
    );
}
