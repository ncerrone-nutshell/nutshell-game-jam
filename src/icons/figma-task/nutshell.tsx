import { ReactComponent as Nutshell } from './nutshell.svg';

type NutshellIconProps = {
    color?: string;
    width?: number;
    height?: number;
};

export default function NutshellIcon(props: NutshellIconProps) {
    return <Nutshell {...props} />;
}
