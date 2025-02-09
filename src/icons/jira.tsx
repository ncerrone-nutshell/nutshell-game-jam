import { ReactComponent as Jira } from './jira.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function JiraIcon(props: Props) {
    return <Jira {...props} />;
}
