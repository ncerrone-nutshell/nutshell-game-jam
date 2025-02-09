import { ReactComponent as JiraOutline } from './jira-outline.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function JiraOutlineIcon(props: Props) {
    return <JiraOutline {...props} />;
}
