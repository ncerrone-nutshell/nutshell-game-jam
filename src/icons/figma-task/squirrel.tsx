// @ts-ignore
import { ReactComponent as Squirrel } from './squirrel.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function SquirrelIcon(props: Props) {
    return <Squirrel {...props} />;
}
