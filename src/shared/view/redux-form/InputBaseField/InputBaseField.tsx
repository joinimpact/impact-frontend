import React from 'react';
import block from 'bem-cn';
import { Icon, InputBase, IInputBaseProps, Error } from 'shared/view/elements';
import { WrappedFieldProps } from 'redux-form';

import './InputBaseField.scss';

interface IProps extends IInputBaseProps {
	label?: string;
	hasIcon?: boolean;
	validateOnChange?: boolean;
	iconLeft?: string | JSX.Element;
	iconRight?: string | JSX.Element;
	errorIcon?: string | JSX.Element;
	renderLeftPart?(icon?: string | JSX.Element): JSX.Element;
	renderRightPart?(icon?: string | JSX.Element): JSX.Element;
}

const b = block('input-base-field');

class InputBaseField extends React.PureComponent<IProps & WrappedFieldProps> {
	public render() {
		const {
			input,
			name,
			label,
			meta: { error, submitFailed, touched, warning },
			hasIcon,
			validateOnChange,
			iconLeft,
			iconRight,
			errorIcon,
			className,
			size = 30,
			renderLeftPart = this.renderLeftPart.bind(this),
			renderRightPart = this.renderRightPart.bind(this),
			...restTextInputProps
		} = this.props;
		const hasError = touched && (validateOnChange || submitFailed) && Boolean(error);
		const hasLabel = Boolean(label);
		const hasWarning = Boolean(warning);
		const modificators = {
			'with-left-icon': !!iconLeft,
			'with-right-icon': !!iconRight,
			'with-error': hasError,
			'with-warn': hasWarning,
		};
		return (
			<div className={b.mix(className)}>
				{hasLabel ? (
					<div className={b('label-wrapper')}>
						<span className={b('label')}>{label}</span>
					</div>
				) : null}
				{hasWarning && <div className={b('warning')}>{warning}</div>}
				<div className={b('input-container', modificators)}>
					{renderLeftPart && renderLeftPart(iconLeft)}
					<InputBase {...input} {...restTextInputProps} error={hasError} name={name} hasIcon={hasIcon} size={size} />
					{renderRightPart && renderRightPart(hasError && !!errorIcon ? errorIcon : iconRight)}
				</div>
				{hasError && <Error>{error}</Error>}
			</div>
		);
	}

	private renderIconContent(icon: string | JSX.Element, className = '') {
		return typeof icon === 'string' ? <Icon className={b(className).toString()} src={String(icon)} /> : icon;
	}

	private renderLeftPart(icon?: string | JSX.Element) {
		if (icon) {
			return (
				<div className={b('left-part field-icon').toString()}>{this.renderIconContent(icon, 'left-part-icon')}</div>
			);
		}
	}

	private renderRightPart(icon?: string | JSX.Element) {
		if (icon) {
			return (
				<div className={b('right-part field-icon').toString()}>{this.renderIconContent(icon, 'right-part-icon')}</div>
			);
		}
		return <></>;
	}
}

export { IProps as IInputBaseFieldProps };
export default InputBaseField;
