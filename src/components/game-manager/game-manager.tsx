import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import { useReducer } from 'react';

import { App } from '../../app';

import { GlobalUI } from './global-ui';

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

export enum Difficulty {
    Easy = 1,
    Medium = 2,
    Hard = 3,
}

export const DIFFICULTY_DAY_THRESHOLDS: {
    [key in Difficulty]: number;
} = {
    [Difficulty.Easy]: 10,
    [Difficulty.Medium]: 20,
    [Difficulty.Hard]: 30,
};

export const DIFFICULTY_DISPLAY_NAME_MAP: {
    [key in Difficulty]: string;
} = {
    [Difficulty.Easy]: 'Jr. Software Engineer',
    [Difficulty.Medium]: 'Software Engineer',
    [Difficulty.Hard]: 'Senior Software Engineer',
};

export type GameContextType = {
    day: number;
    score: number;
    completedTasks: CoreTaskTypeState;
    events: Event[];
    sprintMeterValue: number;
    requiredTasks: Event[];
    difficulty: Difficulty;
    dispatch: (action: Action) => void;
};

export type GameState = {
    day: number;
    score: number;
    completedTasks: CoreTaskTypeState;
    events: Event[];
    sprintMeterValue: number;
    requiredTasks: Event[];
    difficulty: Difficulty;
};

const SPRINT_METER_MAX = 100;
const SPRINT_METER_DECAY_RATE = 1; // The rate at which the sprint meter decays per second
const DAY_TIMER = 5; // 5 seconds

export const GAME_STATE_DEFAULTS: GameState = {
    day: 0,
    score: 0,
    completedTasks: CORE_TASKS_INITIAL_STATE,
    events: [],
    sprintMeterValue: SPRINT_METER_MAX,
    requiredTasks: [],
    difficulty: Difficulty.Easy,
};

export const GAME_CONTEXT_DEFAULTS: GameContextType = {
    ...GAME_STATE_DEFAULTS,
    dispatch: () => {},
};

export const GameContext = React.createContext<GameContextType>(
    GAME_CONTEXT_DEFAULTS
);

import { generateRandomEvents, Event, getNewDifficulty } from './helpers';

type Action = {
    type: ActionType;
    payload?: any;
};

function reducer(state: GameState, action: Action) {
    switch (action.type) {
        case ActionType.IncrementDay: {
            const newEvents = generateRandomEvents(state.day);

            const newDifficulty = getNewDifficulty(state.difficulty, state.day);

            return {
                ...state,
                day: state.day + 1,
                events: [...state.events, ...newEvents],
                difficulty: newDifficulty,
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
                sprintMeterValue: Math.min(
                    SPRINT_METER_MAX,
                    state.sprintMeterValue + action.payload.sprintMeterGain
                ),
                completedTasks: CORE_TASKS_INITIAL_STATE,
            };
        }
        case ActionType.StartRequiredTask: {
            return {
                ...state,
                requiredTasks: addRequiredTask(
                    state.requiredTasks,
                    action.payload.task
                ),
                events: removeEventById(state.events, action.payload.task.id),
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

function removeEventById(events: Event[], id: string) {
    return events.filter((event) => event.id !== id);
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

function addRequiredTask(requiredTasks: Event[], task: Event) {
    return [...requiredTasks, task];
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
    StartRequiredTask = 'start_required_task',
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
                    requiredTasks: state.requiredTasks,
                    difficulty: state.difficulty,
                    dispatch,
                }}
            >
                <App />
            </GameContext.Provider>
        </>
    );
};
