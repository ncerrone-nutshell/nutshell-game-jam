export enum EventType {
    SystemRefresh = 'system-refresh',
    CsvImport = 'csv-import',
    AdoptionReport = 'adoption-report',
}
import { Difficulty, DIFFICULTY_DAY_THRESHOLDS } from './game-manager';

export interface Event {
    user: string;
    headerText: string;
    startButtonText: string;
    timeToCompleteDuration?: number;
    type: EventType;
    likelihood: number;
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
    likelihood: 0.05,
    timeToCompleteDuration: 30,
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
    likelihood: 0.05,
    timeToCompleteDuration: 50,
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
    likelihood: 0.05,
    timeToCompleteDuration: 100,
    penaltyScore: 10,
    tabText: 'Redash',
};

const RANDOM_EVENTS: Event[] = [
    SYSTEM_REFRESH_EVENT,
    CSV_IMPORT_EVENT,
    ADOPTION_REPORT_EVENT,
];

// TODO: Scale event likelihood & difficulty based on day
export function generateRandomEvents(day: number): Event[] {
    if (day < 2) {
        return [];
    }

    const events = RANDOM_EVENTS.map((event) => {
        const random = Math.random();
        if (random < event.likelihood) {
            const startTimestamp = new Date().getTime();

            return {
                ...event,
                id: crypto.randomUUID(),
                startTimestamp,
            };
        }
    });

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
