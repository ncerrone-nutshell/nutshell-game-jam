import { CoreTaskTypeState } from '../game-manager/game-manager';

export const BASE_RELEASE_SCORE = 100;
export const BASE_RELEASE_SPRINT_METER_GAIN = 5;

export function getTotalReleaseMultiplier(completedTasks: CoreTaskTypeState) {
    return (
        completedTasks.coding.completedCount *
        completedTasks.review.completedCount *
        completedTasks.figma.completedCount
    );
}

export function getReleaseScoreGain(completedTasks: CoreTaskTypeState) {
    const multiplier = getTotalReleaseMultiplier(completedTasks);
    return multiplier * BASE_RELEASE_SCORE;
}

export function getReleaseSprintMeterGain(completedTasks: CoreTaskTypeState) {
    const multiplier = getTotalReleaseMultiplier(completedTasks);
    return multiplier * BASE_RELEASE_SPRINT_METER_GAIN;
}
