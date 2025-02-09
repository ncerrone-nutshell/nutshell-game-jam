export enum EventType {
    SystemRefresh = 'system-refresh',
    CsvImport = 'csv-import',
    AdoptionReport = 'adoption-report',
    ArjunPong = 'arjun-pong',
}
import { Difficulty, DIFFICULTY_DAY_THRESHOLDS } from './game-manager';

export interface Event {
    user: string;
    headerText: string;
    startButtonText: string;
    timeToCompleteDuration?: number;
    type: EventType;
    penaltyScore: number;
    id: string;
    tabText: string;
    startTimestamp: number;
}

const SYSTEM_REFRESH_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'Spencer McDonald',
    headerText:
        'SECURITY ALERT! We’ve detected suspicious activity on your account. Please reset your password to ensure your account remains secure.',
    startButtonText: 'Reset password',
    type: EventType.SystemRefresh,
    timeToCompleteDuration: 10,
    penaltyScore: 10,
    tabText: 'OperationsFX',
};

const CSV_IMPORT_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'James Laurenman',
    headerText:
        'Hey can you help me fix this CSV file? This customer is totally lost',
    startButtonText: 'Open CSV',
    type: EventType.CsvImport,
    timeToCompleteDuration: 10,
    penaltyScore: 10,
    tabText: 'CSV file',
};

const ADOPTION_REPORT_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'Andy Fowler',
    headerText:
        'Is anyone using the new product? I need to know if we’re on track',
    startButtonText: 'Open Redash',
    type: EventType.AdoptionReport,
    timeToCompleteDuration: 7,
    penaltyScore: 10,
    tabText: 'Redash',
};

const ARJUN_PONG_EVENT: Event = {
    id: crypto.randomUUID(),
    startTimestamp: new Date().getTime(),
    user: 'Arjun Pong',
    headerText:
        'Hey, I’m bored. Let’s play a game of Pong. I need to practice to beat Chris Cain 🏓',
    startButtonText: 'Play Pong',
    type: EventType.ArjunPong,
    timeToCompleteDuration: 7,
    penaltyScore: 10,
    tabText: 'Pong',
};

const RANDOM_EVENTS: Event[] = [
    SYSTEM_REFRESH_EVENT,
    CSV_IMPORT_EVENT,
    ADOPTION_REPORT_EVENT,
    ARJUN_PONG_EVENT,
];

const EVENT_LIKELIHOOD_DIFFICULTY_MAP = {
    1: 0.05,
    2: 0.1,
    3: 0.15,
};

const EVENT_MAX_COUNT_DIFFICULTY_MAP = {
    1: 1,
    2: 2,
    3: 3,
};

export function generateRandomEvents(
    difficulty: Difficulty,
    currentEvents: Event[]
): Event[] {
    const maxCount = EVENT_MAX_COUNT_DIFFICULTY_MAP[difficulty];

    if (currentEvents.length >= maxCount) {
        return currentEvents;
    }

    let events = [...currentEvents];

    for (const event of RANDOM_EVENTS) {
        if (events.length >= maxCount) {
            break;
        }

        const random = Math.random();
        const likelihood = EVENT_LIKELIHOOD_DIFFICULTY_MAP[difficulty];

        if (random < likelihood) {
            const startTimestamp = new Date().getTime();
            events.push({
                ...event,
                id: crypto.randomUUID(),
                startTimestamp,
            });
        }
    }

    return events.filter((event) => event !== undefined) as Event[];
}

export function getTimeLeftPercentage(event: Event): number {
    if (!event.timeToCompleteDuration) {
        return 0;
    }

    const timeToComplete = event.timeToCompleteDuration;
    const timeToCompleteMilliseconds = timeToComplete * 1000;

    const startTimestampMilliseconds = event.startTimestamp;
    const endTimestampMilliseconds =
        startTimestampMilliseconds + timeToCompleteMilliseconds;
    const currentTimeMilliseconds = new Date().getTime();
    const timeLeftMilliseconds =
        endTimestampMilliseconds - currentTimeMilliseconds;

    return timeLeftMilliseconds / timeToCompleteMilliseconds;
}

export function getNewDifficulty(
    currentDifficulty: Difficulty,
    day: number
): Difficulty {
    const dayThreshold = DIFFICULTY_DAY_THRESHOLDS[currentDifficulty];

    if (day >= dayThreshold) {
        return Math.min(Difficulty.Hard, currentDifficulty + 1);
    }

    return currentDifficulty;
}
