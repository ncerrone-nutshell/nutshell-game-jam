import { ConsoleHeader } from './console-header'
import { ConsoleContent, ConsoleContentItemType } from './console-content'

import './console-container.css'

type ConsoleContainerProps = {
    onTriggerEvent: (type: ConsoleContentItemType) => void
    score: number
    life: number
    days: number
}

export function ConsoleContainer(props: ConsoleContainerProps) {
    return (
        <div className="console-container">
            <ConsoleHeader />
            <ConsoleContent
                onTriggerEvent={props.onTriggerEvent}
                score={props.score}
                life={props.life}
                days={props.days}
            />
        </div>
    )
}
