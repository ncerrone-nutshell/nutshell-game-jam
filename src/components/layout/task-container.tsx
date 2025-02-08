import { Tab } from './computer-screen'
import {
    CodingTaskContainer,
    ReviewTaskContainer,
    FigmaTaskContainer,
} from '../tasks'

import './task-container.css'

interface TaskContainerProps {
    activeTab: Tab
    onComplete: () => void
}

export function TaskContainer(props: TaskContainerProps) {
    return (
        <div className="task-container">
            {props.activeTab === Tab.Coding && (
                <CodingTaskContainer
                    onComplete={() => {
                        props.onComplete()
                    }}
                />
            )}
            {props.activeTab === Tab.Review && (
                <ReviewTaskContainer
                    onComplete={() => {
                        props.onComplete()
                    }}
                />
            )}
            {props.activeTab === Tab.Figma && (
                <FigmaTaskContainer
                    onComplete={() => {
                        props.onComplete()
                    }}
                />
            )}
        </div>
    )
}
