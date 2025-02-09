import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import { useReducer } from 'react';

import { App } from '../../app';

import { GlobalUI } from './global-ui';

// Currently unused, if we don't need this, let's remove it
export enum TaskType {
    Coding = 'coding',
    Review = 'review',
    Figma = 'figma',
    Jenkins = 'jenkins',
    CsvImport = EventType.CsvImport,
    SystemRefresh = EventType.SystemRefresh,
    AdoptionReport = EventType.AdoptionReport,
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
    status: GameStatus;
    isScreenFocused: boolean;
    dispatch: (action: Action) => void;
};

export enum GameStatus {
    NotStarted = 'not_started',
    Playing = 'playing',
    Lost = 'lost',
}

export type GameState = {
    day: number;
    score: number;
    completedTasks: CoreTaskTypeState;
    events: Event[];
    sprintMeterValue: number;
    requiredTasks: Event[];
    difficulty: Difficulty;
    isScreenFocused: boolean;
    status: GameStatus;
};

const SPRINT_METER_MAX = 100;
const SPRINT_METER_DECAY_RATES: { [key in Difficulty]: number } = {
    1: 0.5, // Slower decay for easy mode
    2: 1, // Normal decay for medium mode
    3: 2, // Faster decay for hard mode
};
const DAY_TIMER = 5; // 5 seconds

export const GAME_STATE_DEFAULTS: GameState = {
    day: 0,
    score: 0,
    completedTasks: CORE_TASKS_INITIAL_STATE,
    events: [],
    sprintMeterValue: SPRINT_METER_MAX,
    requiredTasks: [],
    difficulty: Difficulty.Easy,
    isScreenFocused: false,
    status: GameStatus.NotStarted,
};

export const GAME_CONTEXT_DEFAULTS: GameContextType = {
    ...GAME_STATE_DEFAULTS,
    dispatch: () => {},
};

export const GameContext = React.createContext<GameContextType>(
    GAME_CONTEXT_DEFAULTS
);

import {
    generateRandomEvents,
    Event,
    getNewDifficulty,
    EventType,
} from './helpers';

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
            const newSprintMeterValue =
                state.sprintMeterValue -
                SPRINT_METER_DECAY_RATES[state.difficulty] *
                    action.payload.delta;

            if (newSprintMeterValue <= 0) {
                // Handle losing

                console.log('Game lost');

                return {
                    ...state,
                    sprintMeterValue: 0,
                    status: GameStatus.Lost,
                };
            }

            return {
                ...state,
                sprintMeterValue: Math.max(0, newSprintMeterValue),
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
            const taskScore = action.payload.score;

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
        case ActionType.StartGame: {
            return {
                ...GAME_STATE_DEFAULTS,
                status: GameStatus.Playing,
            };
        }
        case ActionType.ResetGame: {
            return {
                ...GAME_STATE_DEFAULTS,
                status: GameStatus.NotStarted,
            };
        }
        case ActionType.SetScreenFocus: {
            return {
                ...state,
                isScreenFocused: action.payload.isScreenFocused,
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

export enum ActionType {
    IncrementDay = 'incremented_day',
    DecrementSprintMeter = 'decremented_sprint_meter',
    IncrementScore = 'incremented_score',
    SetCompletedTasks = 'set_completed_tasks',
    SetEvents = 'set_events',
    CompleteTask = 'complete_task',
    PushRelease = 'push_release',
    StartRequiredTask = 'start_required_task',
    StartGame = 'start_game',
    ResetGame = 'reset_game',
    SetScreenFocus = 'set_screen_focus',
}

export const GameManager = () => {
    const dayTimer = React.useRef<number>(0);
    const [state, dispatch] = useReducer(reducer, GAME_STATE_DEFAULTS);

    useFrame((_, delta) => {
        // Do not progress the game if it's not playing
        if (state.status !== GameStatus.Playing) {
            return;
        }

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
            {state.status === GameStatus.Playing && (
                <GlobalUI sprintMeterPercentage={state.sprintMeterValue} />
            )}
            <GameContext.Provider
                value={{
                    day: state.day,
                    sprintMeterValue: state.sprintMeterValue,
                    completedTasks: state.completedTasks,
                    events: state.events,
                    score: state.score,
                    requiredTasks: state.requiredTasks,
                    difficulty: state.difficulty,
                    status: state.status,
                    isScreenFocused: state.isScreenFocused,
                    dispatch,
                }}
            >
                <App />
            </GameContext.Provider>
        </>
    );
};
