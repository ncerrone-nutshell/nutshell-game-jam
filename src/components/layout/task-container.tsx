import { Tab } from './computer-screen';
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
    JenkinsTaskContainer,
} from '../tasks';

import './task-container.css';
import { GuruCard } from '../tasks/guru-card';
import { TaskType } from '../game-manager/game-manager';

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

    const taskType = getTaskTypeFromTab(activeTab);

    return (
        <div className="task-container">
            {taskType && <GuruCard taskType={taskType} />}
            <div className="task-content-container">
                {taskType === TaskType.Coding && <CodingTaskContainer />}
                {taskType === TaskType.Review && <ReviewTaskContainer />}
                {taskType === TaskType.Figma && <FigmaTaskContainer />}
                {taskType === TaskType.Jenkins && <JenkinsTaskContainer />}
            </div>
        </div>
    );
}
