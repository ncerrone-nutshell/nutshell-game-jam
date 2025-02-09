// @ts-ignore
import { ReactComponent as Checkmark } from './checkmark.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function CheckmarkIcon(props: Props) {
    return <Checkmark {...props} />;
}
