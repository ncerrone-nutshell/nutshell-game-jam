import { Tab } from './computer-screen';
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
} from '../tasks';

import './task-container.css';

interface TaskContainerProps {
    activeTab: Tab;
    onComplete: (score: number) => void;
}

export function TaskContainer(props: TaskContainerProps) {
    return (
        <div className="task-container">
            {props.activeTab === Tab.Coding && (
                <CodingTaskContainer
                    onComplete={(score) => {
                        props.onComplete(score);
                    }}
                />
            )}
            {props.activeTab === Tab.Review && (
                <ReviewTaskContainer
                    onComplete={(score) => {
                        props.onComplete(score);
                    }}
                />
            )}
            {props.activeTab === Tab.Figma && (
                <FigmaTaskContainer
                    onComplete={(score) => {
                        props.onComplete(score);
                    }}
                />
            )}
        </div>
    );
}
