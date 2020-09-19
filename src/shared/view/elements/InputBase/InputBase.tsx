import * as React from 'react';
import block from 'bem-cn';
import AutosizeInput from 'react-input-autosize';

import './InputBase.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	autoSize?: boolean;
	error?: boolean;
	hasIcon?: boolean;
	search?: boolean;
	unit?: string;
	refCallback?: (instance: HTMLInputElement | null) => void;
}

const b = block('input-base');

class InputBase extends React.PureComponent<IProps> {
	private ref: React.RefObject<any> = React.createRef();

	public componentDidMount() {
		const { refCallback } = this.props;
		if (refCallback && this.ref.current) {
			refCallback(this.ref.current);
		}
	}

	public render() {
		const {
			error,
			hasIcon,
			search,
			unit,
			refCallback,
			className,
			disabled,
			autoComplete,
			autoSize,
			style,
			...restInputProps
		} = this.props;
		const modificators = {
			error: !!error,
			icon: !!hasIcon,
			search: !!search,
			'with-unit': !!unit,
			disabled: !!disabled,
		};

		const finalClassName = b('field', modificators)
			.mix(className || '')
			.toString();

		if (autoSize) {
			return (
				<AutosizeInput
					{...restInputProps}
					disabled={disabled}
					className={b('autosize').toString()}
					inputClassName={finalClassName}
					inputStyle={style}
					autoComplete={autoComplete || 'off'}
					inputRef={this.props.refCallback}
				/>
			);
		}

		return (
			<input
				{...restInputProps}
				style={style}
				disabled={disabled}
				className={finalClassName}
				autoComplete={autoComplete || 'off'}
				ref={this.ref}
			/>
		);
	}
}

export default InputBase;
export { IProps as IInputBaseProps };
