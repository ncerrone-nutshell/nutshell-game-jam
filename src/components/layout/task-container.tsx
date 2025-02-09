import { Tab } from './computer-screen';
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
    JenkinsTaskContainer,
} from '../tasks';

import './task-container.css';
import { GuruCard } from '../tasks/guru-card';
import { GameContext, TaskType } from '../game-manager/game-manager';
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
    const { requiredTasks } = useContext(GameContextForwarded);
    const customTask = requiredTasks.find((task) => task.id === activeTab);
    const customTaskType = customTask?.type;

    const taskType = customTaskType || getTaskTypeFromTab(activeTab);

    return (
        <div className="task-container">
            {taskType && <GuruCard taskType={taskType} />}
            <div className="task-content-container">
                {taskType === TaskType.Coding && <CodingTaskContainer />}
                {taskType === TaskType.Review && <ReviewTaskContainer />}
                {taskType === TaskType.Figma && <FigmaTaskContainer />}
                {taskType === TaskType.Jenkins && <JenkinsTaskContainer />}
                {taskType === TaskType.CsvImport && <CsvImportTaskContainer />}
                {taskType === TaskType.SystemRefresh && (
                    <SystemRefreshTaskContainer />
                )}
                {taskType === TaskType.AdoptionReport && (
                    <AdoptionReportTaskContainer />
                )}
            </div>
        </div>
    );
}

function CsvImportTaskContainer() {
    return (
        <div style={{ color: 'black', fontSize: 25, padding: 16 }}>
            TODO: CsvImportTaskContainer
        </div>
    );
}

function SystemRefreshTaskContainer() {
    return (
        <div style={{ color: 'black', fontSize: 25, padding: 16 }}>
            TODO:SystemRefreshTaskContainer
        </div>
    );
}

function AdoptionReportTaskContainer() {
    return (
        <div style={{ color: 'black', fontSize: 25, padding: 16 }}>
            TODO: AdoptionReportTaskContainer
        </div>
    );
}
