import './browser-tabs.css';
import { Tab } from './computer-screen';
import GithubMark from '../../icons/github';
import CursorMark from '../../icons/cursor';
import FigmaMark from '../../icons/figma';

export function BrowserTabs({
    activeTab,
    setActiveTab,
}: {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}) {
    return (
        <div className="browser-tabs">
            <button
                className="browser-tab"
                data-state={activeTab === Tab.Coding ? 'active' : 'inactive'}
                onClick={() => setActiveTab(Tab.Coding)}
            >
                <div className="browser-tab-icon">
                    <CursorMark height={12} width={12} fill="black" />
                </div>
                Cursor
            </button>
            <button
                className="browser-tab"
                data-state={activeTab === Tab.Review ? 'active' : 'inactive'}
                onClick={() => setActiveTab(Tab.Review)}
            >
                <div className="browser-tab-icon">
                    <GithubMark height={16} width={16} fill="black" />
                </div>
                Github
            </button>
            <button
                className="browser-tab"
                data-state={activeTab === Tab.Figma ? 'active' : 'inactive'}
                onClick={() => setActiveTab(Tab.Figma)}
            >
                <div className="browser-tab-icon">
                    <FigmaMark height={12} width={12} fill="black" />
                </div>
                Figma
            </button>
        </div>
    );
}
