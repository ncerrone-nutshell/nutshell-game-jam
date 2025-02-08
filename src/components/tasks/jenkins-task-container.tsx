import './task.css';

interface JenkinsTaskContainerProps {
    onComplete: (score: number) => void;
}

export function JenkinsTaskContainer(props: JenkinsTaskContainerProps) {
    return (
        <button
            className="task-button figma"
            onClick={() => {
                props.onComplete(1);
            }}
        >
            Push release
        </button>
    );
}
