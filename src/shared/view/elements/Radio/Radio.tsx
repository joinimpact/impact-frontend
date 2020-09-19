import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import './Radio.scss';

export type TRadioType = 'checkbox' | 'circle' | 'tab';

interface IOwnProps extends React.HTMLProps<HTMLInputElement> {
	radioValue?: string | number;
	type?: TRadioType;
	className?: string;
}

const b = block('radio-button');

type TProps = IOwnProps;

class Radio extends React.PureComponent<TProps> {
	public render() {
		const { checked, disabled, label, className, tabIndex, type = 'checkbox', ...restProps } = this.props;
		return (
			<label
				className={b({ checked, disabled, [type]: true })
					.mix(className)
					.toString()}
				tabIndex={tabIndex}
				onKeyDown={this.handleKeyDown}
			>
				<input className={b('fake-input').toString()} type="radio" {...restProps} />
				<div className={b('input').toString()}>{checked && <div className={b('checked-box')} />}</div>
				{label && <div className={b('label').toString()}>{label}</div>}
			</label>
		);
	}

	@bind
	private handleKeyDown(e: React.KeyboardEvent) {
		const { onChange = () => void 0, onKeyDown = () => void 0 } = this.props;
		if (e.keyCode === 32) {
			onChange(e as any);
		}
		onKeyDown(e as any);
	}
}

export { TProps as IRadioProps };
export default Radio;
