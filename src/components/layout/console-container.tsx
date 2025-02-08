import { ConsoleHeader } from './console-header';
import { ConsoleContent, ConsoleContentItemType } from './console-content';

import './console-container.css';

type ConsoleContainerProps = {
    onTriggerEvent: (type: ConsoleContentItemType) => void;
};

export function ConsoleContainer(props: ConsoleContainerProps) {
    return (
        <div className="console-container">
            <ConsoleHeader />
            <ConsoleContent onTriggerEvent={props.onTriggerEvent} />
        </div>
    );
}
