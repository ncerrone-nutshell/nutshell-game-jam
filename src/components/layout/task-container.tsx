import { Tab, TaskType } from './computer-screen';
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
    JenkinsTaskContainer,
} from '../tasks';

import './task-container.css';

interface TaskContainerProps {
    activeTab: Tab;
    onComplete: (taskType: TaskType, score: number) => void;
    onPushRelease: () => void;
}

export function TaskContainer(props: TaskContainerProps) {
    return (
        <div className="task-container">
            {props.activeTab === Tab.Coding && (
                <CodingTaskContainer
                    onComplete={(score) => {
                        props.onComplete(TaskType.Coding, score);
                    }}
                />
            )}
            {props.activeTab === Tab.Review && (
                <ReviewTaskContainer
                    onComplete={(score) => {
                        props.onComplete(TaskType.Review, score);
                    }}
                />
            )}
            {props.activeTab === Tab.Figma && (
                <FigmaTaskContainer
                    onComplete={(score) => {
                        props.onComplete(TaskType.Figma, score);
                    }}
                />
            )}
            {props.activeTab === Tab.Jenkins && (
                <JenkinsTaskContainer
                    onComplete={() => {
                        props.onPushRelease();
                    }}
                />
            )}
        </div>
    );
}
