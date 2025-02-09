// @ts-ignore
import { ReactComponent as PersonOutline } from './person-outline.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function PersonOutlineIcon(props: Props) {
    return <PersonOutline {...props} />;
}
