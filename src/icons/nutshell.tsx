import { ReactComponent as NutshellIcon } from './nutshell.svg';

type NutshellIconProps = {
    color?: string;
    width?: number;
    height?: number;
};

export default function Nutshell(props: NutshellIconProps) {
    return <NutshellIcon {...props} />;
}
