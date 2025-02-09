import './task-controls.css';

export function TaskControls() {
    return (
        <div className="task-controls">
            <div className="task-controls-row">
                <div className="task-controls-row-title">Select a shape</div>
                <div className="task-controls-row-control">Click</div>
            </div>
            <div className="task-controls-row">
                <div className="task-controls-row-title">Move</div>
                <div className="task-controls-row-control">Arrow keys</div>
            </div>
            <div className="task-controls-row">
                <div className="task-controls-row-title">
                    Rotate counter-clockwise
                </div>
                <div className="task-controls-row-control">Q</div>
            </div>
            <div className="task-controls-row">
                <div className="task-controls-row-title">Rotate clockwise</div>
                <div className="task-controls-row-control">E</div>
            </div>
        </div>
    );
}
