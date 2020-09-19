import * as React from 'react';
import { block } from 'bem-cn';
import './Error.scss';

interface IProps {
	children: React.ReactNode;
	underField?: boolean;
	className?: string;
}

const b = block('error');

/* tslint:disable:function-name */
function Error({ children, underField, className = '' }: IProps) {
	return (
		<div className={b({ 'under-field': !!underField }).mix(className)}>
			{!underField && <i className={b('icon zi zi-exclamation-outline')} />}
			<span className={b('text')}>{children}</span>
		</div>
	);
}

export { IProps };
export default React.memo(Error);
