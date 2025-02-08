import './browser-header.css';
import { CompletedTaskType, Tab } from './computer-screen';
import { BrowserTabs } from './browser-tabs';

type BrowserHeaderProps = {
    setActiveTab: (tab: Tab) => void;
    activeTab: Tab;
    completedTasks: CompletedTaskType;
};

export function BrowserHeader(props: BrowserHeaderProps) {
    return (
        <div className="browser-header">
            <div className="controls-container">
                <div className="button close" />
                <div className="button minimize" />
                <div className="button maximize" />
            </div>
            <BrowserTabs
                completedTasks={props.completedTasks}
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
            />
        </div>
    );
}
