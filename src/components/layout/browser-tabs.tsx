import './browser-tabs.css';
import { ActionType, CoreTaskTypeState } from '../game-manager/game-manager';

import GithubMark from '../../icons/github';
import CursorMark from '../../icons/cursor';
import FigmaMark from '../../icons/figma';
import JenkinsMark from '../../icons/jenkins';
import { useContext, useEffect, useState } from 'react';
import { GameContextForwarded } from './computer-screen-provider';
import { Tab } from './computer-screen';
import {
    Event,
    EventType,
    getTimeLeftPercentage,
} from '../game-manager/helpers';
import WebfxMark from '../../icons/webfx';
import SheetsMark from '../../icons/sheets';
import RedashMark from '../../icons/redash';

export function getTaskIcon(event: Event): React.ReactNode {
    switch (event.type) {
        case EventType.SystemRefresh:
            return <WebfxMark width={16} height={16} />;
        case EventType.CsvImport:
            return <SheetsMark width={16} height={16} />;
        case EventType.AdoptionReport:
            return <RedashMark width={16} height={16} />;
    }
}

function getJenkinsStatus(completedTasks: CoreTaskTypeState) {
    let baseString = 'Jenkins';

    const completedCounts = Object.values(completedTasks).map(
        (task) => task.completedCount
    );

    return baseString + ` - ${completedCounts.join(' / ')}`;
}

type BrowserTabsProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export function BrowserTabs(props: BrowserTabsProps) {
    const { completedTasks, requiredTasks, dispatch } =
        useContext(GameContextForwarded);

    const [taskButtons, setTaskButtons] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const buttons = [];
        for (const task of requiredTasks) {
            const timeLeftPercentage = getTimeLeftPercentage(task);

            const timeRemaining = task.timeToCompleteDuration;
            setTimeout(() => {
                dispatch({
                    type: ActionType.EndEvent,
                    payload: {
                        id: task.id,
                        score: task.penaltyScore,
                        success: false,
                    },
                });
            }, timeRemaining);

            buttons.push(
                <button
                    key={`browser-tab-${task.id}`}
                    className="browser-tab"
                    data-state={
                        props.activeTab === task.id ? 'active' : 'inactive'
                    }
                    onClick={() => props.setActiveTab(task.id)}
                >
                    <div className="browser-tab-icon">{getTaskIcon(task)}</div>
                    {task.startButtonText} •{' '}
                    {(timeLeftPercentage * 100).toFixed(1)}%
                </button>
            );
        }
        setTaskButtons(buttons);
    }, [requiredTasks]);

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
            {taskButtons}
        </div>
    );
}
