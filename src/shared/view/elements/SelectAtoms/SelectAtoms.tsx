import React from 'react';
import block from 'bem-cn';
import { InputProps } from 'react-select/src/components/Input';
import { InputBase } from 'shared/view/elements';
import { IndicatorProps } from 'react-select/src/components/indicators';

import './SelectAtoms.scss';

export const SelectDropdownIndicator: React.FC<IndicatorProps<any>> = (props: IndicatorProps<any>) => {
	const b = block('select-dropdown-indicator');
	return (
		<div className={b()} {...props.innerProps}>
			<i className={'zi zi-cheveron-down'} />
		</div>
	);
};

export const SelectInput: React.FC<InputProps> = (props: InputProps | any) => {
	const {
		className,
		cx,
		getStyles,
		innerRef,
		isHidden,
		isDisabled,
		theme,
		selectProps,
		onExited,
		in: _,
		...restInputProps
	} = props;

	const styles: React.CSSProperties = {};
	const b = block('select-input');

	return (
		<div
			className={b.mix(className).toString()}
			style={{
				...getStyles('input', { theme, ...props }),
			}}
		>
			<InputBase
				{...restInputProps}
				autoSize
				refCallback={innerRef}
				className={b('input-field').mix(className)}
				disabled={isDisabled}
				style={styles}
			/>
		</div>
	);
};
