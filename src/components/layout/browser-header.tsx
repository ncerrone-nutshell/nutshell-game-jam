import { useContext } from 'react';

import './browser-header.css';
import { Tab } from './computer-screen';
import { BrowserTabs } from './browser-tabs';
import { GameContextForwarded } from './computer-screen-provider';

type BrowserHeaderProps = {
    setActiveTab: (tab: Tab) => void;
    activeTab: Tab;
};

export function BrowserHeader(props: BrowserHeaderProps) {
    const { userName } = useContext(GameContextForwarded);

    return (
        <div className="browser-header">
            <div className="controls-container">
                <div className="button close" />
                <div className="button minimize" />
                <div className="button maximize" />
            </div>
            <BrowserTabs
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
            />
            <div className='initials'>
                {userName.includes(' ') 
                    ? userName.split(' ').map(word => word[0]).join('')
                    : userName.slice(0, 2)}
            </div>
        </div>
    );
}
