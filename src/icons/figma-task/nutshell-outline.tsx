// @ts-ignore
import { ReactComponent as NutshellOutline } from './nutshell-outline.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function NutshellOutlineIcon(props: Props) {
    return <NutshellOutline {...props} />;
}
