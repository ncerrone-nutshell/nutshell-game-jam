// @ts-ignore
import { ReactComponent as CompanyOutline } from './company-outline.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function CompanyOutlineIcon(props: Props) {
    return <CompanyOutline {...props} />;
}
