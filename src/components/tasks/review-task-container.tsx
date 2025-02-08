import './task.css'

interface ReviewTaskContainerProps {
    onComplete: () => void
}

export function ReviewTaskContainer(props: ReviewTaskContainerProps) {
    return (
        <button
            className="task-button review"
            onClick={() => {
                props.onComplete()
            }}
        >
            Review PR
        </button>
    )
}
