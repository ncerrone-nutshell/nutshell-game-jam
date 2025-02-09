// @ts-ignore
import { ReactComponent as Company } from './company.svg';

type Props = {
    color?: string;
    width?: number;
    height?: number;
};

export default function CompanyIcon(props: Props) {
    return <Company {...props} />;
}
