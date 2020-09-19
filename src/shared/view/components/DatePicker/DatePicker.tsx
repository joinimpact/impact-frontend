import React from 'react';
import { block } from 'bem-cn';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './DatePicker.scss';

type IOwnProps = ReactDatePickerProps;

const b = block('calendar');

const DatePicker: React.FC<IOwnProps> = (props: IOwnProps) => {
	return (
		<div className={b()}>
			<ReactDatePicker {...props} />
		</div>
	);
};

export { IOwnProps as IDatePickerProps };
export default React.memo(DatePicker);
