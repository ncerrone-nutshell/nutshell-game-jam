import { Tab } from './computer-screen';
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
    JenkinsTaskContainer,
} from '../tasks';

import './task-container.css';

interface TaskContainerProps {
    activeTab: Tab;
}

export function TaskContainer(props: TaskContainerProps) {
    return (
        <div className="task-container">
            {props.activeTab === Tab.Coding && <CodingTaskContainer />}
            {props.activeTab === Tab.Review && <ReviewTaskContainer />}
            {props.activeTab === Tab.Figma && <FigmaTaskContainer />}
            {props.activeTab === Tab.Jenkins && <JenkinsTaskContainer />}
        </div>
    );
}
