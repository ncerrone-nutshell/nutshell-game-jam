import './console-content.css';

export enum ConsoleContentItemType {
    Console = 'console',
    File = 'file',
    Folder = 'folder',
}

type ConsoleContentProps = {
    onTriggerEvent: (type: ConsoleContentItemType) => void;
    score: number;
    days: number;
    life: number;
};

export function ConsoleContent(props: ConsoleContentProps) {
    const { onTriggerEvent } = props;

    return (
        <div className="console-content">
            <div className="console-content-items">
                <ConsoleContentItem
                    onClick={() => {
                        onTriggerEvent(ConsoleContentItemType.Console);
                    }}
                >
                    Trigger hackathon
                </ConsoleContentItem>
                <ConsoleContentItem
                    onClick={() => {
                        onTriggerEvent(ConsoleContentItemType.Console);
                    }}
                >
                    Trigger escalation process
                </ConsoleContentItem>
                <ConsoleContentItem
                    onClick={() => {
                        onTriggerEvent(ConsoleContentItemType.Console);
                    }}
                >
                    Trigger arjun pong
                </ConsoleContentItem>
            </div>
            <div className="console-content-status">
                <div className="console-content-status-score">
                    Score: {props.score}
                </div>
                <div className="console-content-status-life">
                    Life: {props.life}
                </div>
                <div className="console-content-status-days">
                    Days: {props.days}
                </div>
            </div>
        </div>
    );
}

type ConsoleContentItemProps = {
    onClick: () => void;
    children: React.ReactNode;
};

function ConsoleContentItem(props: ConsoleContentItemProps) {
    const { onClick, children } = props;

    return (
        <div onClick={onClick} className="console-content-item">
            {'>'} {children}
        </div>
    );
}
