import './task.css';

interface FigmaTaskContainerProps {
    onComplete: (score: number) => void;
}

export function FigmaTaskContainer(props: FigmaTaskContainerProps) {
    return (
        <button
            className="task-button figma"
            onClick={() => {
                props.onComplete(1);
            }}
        >
            Create mock-up
        </button>
    );
}
