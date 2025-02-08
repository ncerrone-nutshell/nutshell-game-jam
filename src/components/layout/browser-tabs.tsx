import './browser-tabs.css';
import { CoreTaskTypeState } from '../game-manager/game-manager';

import GithubMark from '../../icons/github';
import CursorMark from '../../icons/cursor';
import FigmaMark from '../../icons/figma';
import JenkinsMark from '../../icons/jenkins';
import { useContext } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import { Tab } from './computer-screen';

function getJenkinsStatus(completedTasks: CoreTaskTypeState) {
    let baseString = 'Jenkins';

    const completedCounts = Object.values(completedTasks).map(
        (task) => task.completedCount
    );

    return baseString + ` - ${completedCounts.join(' / ')}`;
}

type BrowserTabsProps = {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
};

export function BrowserTabs(props: BrowserTabsProps) {
    const { completedTasks } = useContext(GameContextForwarded);

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
                {getJenkinsStatus(completedTasks)}
            </button>
        </div>
    );
}
