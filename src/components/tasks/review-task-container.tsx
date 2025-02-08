import './task.css';

interface ReviewTaskContainerProps {
    onComplete: (score: number) => void;
}

export function ReviewTaskContainer(props: ReviewTaskContainerProps) {
    return (
        <button
            className="task-button review"
            onClick={() => {
                props.onComplete(1);
            }}
        >
            Review PR
        </button>
    );
}
