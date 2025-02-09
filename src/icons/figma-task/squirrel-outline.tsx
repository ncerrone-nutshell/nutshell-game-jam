import { ReactComponent as SquirrelOutline } from './squirrel-outline.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function SquirrelOutlineIcon(props: Props) {
    return <SquirrelOutline {...props} />;
}
