import { ReactComponent as JiraFull } from './jira-full.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function JiraFullIcon(props: Props) {
    return <JiraFull {...props} />;
}
