import { ConsoleHeader } from './console-header';
import { ConsoleContent, ConsoleContentItemType } from './console-content';

import './console-container.css';
import { CompletedTaskType, TaskType } from './computer-screen';

type ConsoleContainerProps = {
    onTriggerEvent: (type: ConsoleContentItemType) => void;
    score: number;
    life: number;
    days: number;
    completedTasks: CompletedTaskType;
};

export function ConsoleContainer(props: ConsoleContainerProps) {
    return (
        <div className="console-container">
            <ConsoleHeader />
            <ConsoleContent
                onTriggerEvent={props.onTriggerEvent}
                score={props.score}
                life={props.life}
                days={props.days}
                completedTasks={props.completedTasks}
            />
        </div>
    );
}
