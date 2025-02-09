import CheckmarkIcon from '../../icons/checkmark';

export function TaskCompleted() {
    console.log('TaskCompleted');
    return (
        <div className="task-completed-icon">
            <CheckmarkIcon height={50} width={50} />
        </div>
    );
}
