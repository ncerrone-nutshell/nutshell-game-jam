// @ts-ignore
import { ReactComponent as Person } from './person.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function PersonIcon(props: Props) {
    return <Person {...props} />;
}
