import './task.css'

interface FigmaTaskContainerProps {
    onComplete: () => void
}

export function FigmaTaskContainer(props: FigmaTaskContainerProps) {
    return (
        <button
            className="task-button figma"
            onClick={() => {
                props.onComplete()
            }}
        >
            Create mock-up
        </button>
    )
}
