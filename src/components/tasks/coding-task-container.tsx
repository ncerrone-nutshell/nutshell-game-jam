import './task.css';

interface CodingTaskContainerProps {
    onComplete: () => void;
}

export function CodingTaskContainer(props: CodingTaskContainerProps) {
    return (
        <button
            className="task-button coding"
            onClick={() => {
                props.onComplete();
            }}
        >
            Run code
        </button>
    );
}
