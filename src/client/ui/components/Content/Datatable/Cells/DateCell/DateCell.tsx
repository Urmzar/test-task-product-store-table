import { FC } from "react";

interface Props {
  cellData: Date;
}

const DateCell: FC<Props> = ({ cellData }) => <>{Intl.DateTimeFormat("ru-RU").format(cellData)}</>;

export default DateCell;
