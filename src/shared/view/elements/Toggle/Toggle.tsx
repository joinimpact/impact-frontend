import * as React from 'react';
import { block } from 'bem-cn';

import './Toggle.scss';
import { Preloader } from 'shared/view/elements/index';

const b = block('toggle');

interface IProps extends React.HTMLProps<HTMLInputElement> {
	leftLabel?: string;
	rightLabel: string;
	isShowPreloader?: boolean;
}

/* tslint:disable:function-name */
function Toggle(props: IProps) {
	const { leftLabel, rightLabel, isShowPreloader, ...restProps } = props;
	return (
		<label className={b({ checked: Boolean(restProps.checked) })}>
			<input className={b('fake-input')} type="checkbox" {...restProps} />
			<div className={b('switch')}>
				<Preloader isShow={isShowPreloader} position="relative" size={2}>
					<div className={b('switch-thumb')} />
				</Preloader>
			</div>
			<div className={b('label', { active: !!Boolean(restProps.checked) })}>
				{restProps.checked ? rightLabel : leftLabel}
			</div>
		</label>
	);
}

export { IProps as IToggleProps };
export default Toggle;
