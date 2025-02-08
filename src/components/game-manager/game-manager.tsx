import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import { useReducer } from 'react';

import { App } from '../../app';

export enum TaskType {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
}

export enum CoreTaskType {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
}

export type CoreTaskTypeState = {
    [key in CoreTaskType]: {
        score: number;
        completedCount: number;
    };
};

export const CORE_TASKS_INITIAL_STATE: CoreTaskTypeState = {
    [CoreTaskType.Coding]: {
        score: 0,
        completedCount: 0,
    },
    [CoreTaskType.Review]: {
        score: 0,
        completedCount: 0,
    },
    [CoreTaskType.Figma]: {
        score: 0,
        completedCount: 0,
    },
};

import { GlobalUI } from './global-ui';

export type GameContextType = {
    day: number;
    score: number;
    completedTasks: CoreTaskTypeState;
    events: RandomEvent[];
    sprintMeterValue: number;
    dispatch: (action: Action) => void;
};

export type GameState = {
    day: number;
    score: number;
    completedTasks: CoreTaskTypeState;
    events: RandomEvent[];
    sprintMeterValue: number;
};

const SPRINT_METER_MAX = 100;
const SPRINT_METER_DECAY_RATE = 5; // The rate at which the sprint meter decays per second
const DAY_TIMER = 5; // 5 seconds

export const GAME_STATE_DEFAULTS: GameState = {
    day: 0,
    score: 0,
    completedTasks: CORE_TASKS_INITIAL_STATE,
    events: [],
    sprintMeterValue: SPRINT_METER_MAX,
};

export const GAME_CONTEXT_DEFAULTS: GameContextType = {
    ...GAME_STATE_DEFAULTS,
    dispatch: () => {},
};

export const GameContext = React.createContext<GameContextType>(
    GAME_CONTEXT_DEFAULTS
);

import { generateRandomEvents, RandomEvent } from './helpers';

type Action = {
    type: ActionType;
    payload?: any;
};

function reducer(state: GameState, action: Action) {
    switch (action.type) {
        case ActionType.IncrementDay: {
            const newEvents = generateRandomEvents(state.day);

            return {
                ...state,
                day: state.day + 1,
                events: [...state.events, ...newEvents],
            };
        }
        case ActionType.DecrementSprintMeter: {
            return {
                ...state,
                sprintMeterValue:
                    state.sprintMeterValue -
                    SPRINT_METER_DECAY_RATE * action.payload.delta,
            };
        }
        case ActionType.IncrementScore: {
            return {
                ...state,
                score: state.score + action.payload.score,
            };
        }
        case ActionType.PushRelease: {
            return {
                ...state,
                score: state.score + action.payload.score,
                completedTasks: CORE_TASKS_INITIAL_STATE,
            };
        }
        case ActionType.CompleteTask: {
            const taskScore = getTaskScore(
                action.payload.type,
                action.payload.score
            );

            return {
                ...state,
                score: state.score + taskScore,
                completedTasks: updateCompletedTasks(
                    state.completedTasks,
                    action.payload.type,
                    taskScore
                ),
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}

function updateCompletedTasks(
    completedTasks: CoreTaskTypeState,
    type: CoreTaskType,
    score: number
) {
    return {
        ...completedTasks,
        [type]: {
            ...completedTasks[type],
            completedCount: completedTasks[type].completedCount + 1,
            score: completedTasks[type].score + score,
        },
    };
}

// TODO: implement this
function getTaskScore(type: TaskType, score: number) {
    return score;
}

export enum ActionType {
    IncrementDay = 'incremented_day',
    DecrementSprintMeter = 'decremented_sprint_meter',
    IncrementScore = 'incremented_score',
    SetCompletedTasks = 'set_completed_tasks',
    SetEvents = 'set_events',
    CompleteTask = 'complete_task',
    PushRelease = 'push_release',
}

export const GameManager = () => {
    const dayTimer = React.useRef<number>(0);
    const [state, dispatch] = useReducer(reducer, GAME_STATE_DEFAULTS);

    useFrame((_, delta) => {
        // Decrease the day timer by the delta time
        dayTimer.current = dayTimer.current - delta;
        if (dayTimer.current <= 0) {
            dispatch({
                type: ActionType.IncrementDay,
            });
            dayTimer.current = DAY_TIMER;
        }

        // Decrease the sprint meter value by the delta time
        dispatch({
            type: ActionType.DecrementSprintMeter,
            payload: {
                delta,
            },
        });
    });

    return (
        <>
            <GlobalUI sprintMeterPercentage={state.sprintMeterValue} />
            <GameContext.Provider
                value={{
                    day: state.day,
                    sprintMeterValue: state.sprintMeterValue,
                    completedTasks: state.completedTasks,
                    events: state.events,
                    score: state.score,
                    dispatch,
                }}
            >
                <App />
            </GameContext.Provider>
        </>
    );
};
