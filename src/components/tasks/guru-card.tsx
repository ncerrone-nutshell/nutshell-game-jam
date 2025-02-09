import './guru-card.css';
import GuruMark from '../../icons/guru';
import { TaskType } from '../game-manager/game-manager';

function getGuruCardTitle(task: TaskType) {
    switch (task) {
        case TaskType.Coding:
            return 'Commit code';
        case TaskType.Review:
            return 'Review PRs';
        case TaskType.Figma:
            return 'Create a mockup';
        case TaskType.Jenkins:
            return 'Build a release';
        case TaskType.CsvImport:
            return 'Import a CSV';
        case TaskType.SystemRefresh:
            return 'System refresh';
        case TaskType.AdoptionReport:
            return 'Adoption report';
        default:
            return 'Guru';
    }
}

function getGuruCardDescription(task: TaskType) {
    switch (task) {
        case TaskType.Coding:
            return 'You’ve written some great code, and now it’s time to bring it home with an awesome commit message.';
        case TaskType.Review:
            return 'We need to review PRs to make sure they’re bug free. ';
        case TaskType.Figma:
            return 'A great product is only as good as its design. Rotate and align the shapes to complete a pixel-perfect mockup for development.';
        case TaskType.Jenkins:
            return 'A sprint isn’t complete without a build. Push a polished release to production to get your team ready for the next sprint.';
        case TaskType.CsvImport:
            return 'A customer is having trouble importing a CSV file. Help them out by importing the file and fixing any errors.';
        case TaskType.SystemRefresh:
            return 'Bummer, you have to reset your password… again.';
        case TaskType.AdoptionReport:
            return 'Andy needs a report to see if the new feature is being used. Let him know the usage based on the criteria provided.';
        default:
            return 'Guru';
    }
}

function getGuruCardInstructions(task: TaskType) {
    switch (task) {
        case TaskType.Coding:
            return 'Follow the prompt to write a great commit message. Only commit messages spelled at 60% or greater accuracy will score points.';
        case TaskType.Review:
            return 'Hover over each line searching for bugs. If there’s a bug in the code, the character in question will turn into a bug. Some PRs might not contain a bug!';
        case TaskType.Figma:
            return 'Click on a shape, and then use the arrow keys to move it around. You can also rotate the shape by clicking the A and D keys.';
        case TaskType.Jenkins:
            return 'Click the "Build a release" button when you’re ready to push a release to production. The more well-rounded your release, the more points you’ll score.';
        case TaskType.CsvImport:
            return 'Fix the formatting of the CSV file so that it can be properly imported. When the CSV is fixed correctly, click the "Import CSV" button.';
        case TaskType.ArjunPongRequest:
            return 'TODO: Figure this out';
        case TaskType.AdoptionReport:
            return 'Find the feature usage for the day provided. Hover over each day to see the usage. When you find usage for the day provided, send a message to Andy with the number of users.';
        default:
            return 'Guru';
    }
}

interface GuruCardProps {
    taskType: TaskType;
}

export function GuruCard(props: GuruCardProps) {
    return (
        <div className="guru-card">
            <div className="guru-card-header">
                <GuruMark width={128} />
            </div>
            <div className="guru-card-body">
                <div className="guru-card-body-title">
                    {getGuruCardTitle(props.taskType)}
                </div>
                <div className="guru-card-body-instructions-title">
                    Description
                </div>
                <div className="guru-card-body-description">
                    {getGuruCardDescription(props.taskType)}
                </div>
                <div className="guru-card-body-divider"></div>
                <div className="guru-card-body-instructions-title">
                    Instructions
                </div>
                <div className="guru-card-body-instructions">
                    {getGuruCardInstructions(props.taskType)}
                </div>
            </div>
        </div>
    );
}
