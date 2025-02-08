import './browser-tabs.css';
import { CompletedTaskType, Tab } from './computer-screen';
import GithubMark from '../../icons/github';
import CursorMark from '../../icons/cursor';
import FigmaMark from '../../icons/figma';
import JenkinsMark from '../../icons/jenkins';

function getJenkinsStatus(completedTasks: CompletedTaskType) {
    let baseString = 'Jenkins';

    Object.entries(completedTasks).forEach(([task, score]) => {
        baseString += ` - ${task}: ${score.completedCount} / ${score.score}`;
    });
    return baseString;
}

type BrowserTabsProps = {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    completedTasks: CompletedTaskType;
};

export function BrowserTabs(props: BrowserTabsProps) {
    return (
        <div className="browser-tabs">
            <button
                className="browser-tab"
                data-state={
                    props.activeTab === Tab.Coding ? 'active' : 'inactive'
                }
                onClick={() => props.setActiveTab(Tab.Coding)}
            >
                <div className="browser-tab-icon">
                    <CursorMark height={12} width={12} fill="black" />
                </div>
                Cursor
            </button>
            <button
                className="browser-tab"
                data-state={
                    props.activeTab === Tab.Review ? 'active' : 'inactive'
                }
                onClick={() => props.setActiveTab(Tab.Review)}
            >
                <div className="browser-tab-icon">
                    <GithubMark height={16} width={16} fill="black" />
                </div>
                Github
            </button>
            <button
                className="browser-tab"
                data-state={
                    props.activeTab === Tab.Figma ? 'active' : 'inactive'
                }
                onClick={() => props.setActiveTab(Tab.Figma)}
            >
                <div className="browser-tab-icon">
                    <FigmaMark height={12} width={12} fill="black" />
                </div>
                Figma
            </button>
            <button
                className="browser-tab"
                data-state={
                    props.activeTab === Tab.Jenkins ? 'active' : 'inactive'
                }
                onClick={() => props.setActiveTab(Tab.Jenkins)}
            >
                <div className="browser-tab-icon">
                    <JenkinsMark height={20} width={16} fill="black" />
                </div>
                {getJenkinsStatus(props.completedTasks)}
            </button>
        </div>
    );
}
