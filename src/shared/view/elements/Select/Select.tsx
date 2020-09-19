import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import * as R from 'ramda';
import { default as ReactSelect, MultiValueProps, OptionTypeBase } from 'react-select';
import CreatableSelect from 'react-select/creatable';
// import ReactSelectCreatable from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { MultiValueRemoveProps } from 'react-select/src/components/MultiValue';
import { Props } from 'react-select/src/Creatable';
// import { SelectComponents } from 'react-select/src/components';
import { SelectDropdownIndicator, SelectInput } from 'shared/view/elements/index';

import './Select.scss';

type MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => void;

export interface IOptionValue<T> {
	data?: any;
	id: number;
	index: number;
	isDisabled?: boolean;
	isFocused?: boolean;
	isSelected?: boolean;
	label: React.ReactNode;
	onClick?: MouseEventHandler;
	onMouseOver?: MouseEventHandler;
	value: T;
	desc?: string;
}

export interface ISimpleOptionValue<T> {
	value: T;
	label: React.ReactNode;
	desc?: string;
	isDisabled?: boolean;
}

type IOption<T> = IOptionValue<T> | ISimpleOptionValue<T> | T;

interface ISelectionVariants<T> {
	selectedOption?: IOptionValue<T>;
	selectedLabel?: IOptionValue<T>['label'];
	selectedValue?: T | T[];
	selectedIndex?: number;
}

interface IProps<T> extends ISelectionVariants<T> {
	options?: IOption<T>[];
	debug?: boolean;
	disabled?: boolean;
	placeholder?: string;
	readonly?: boolean;
	isMulti?: boolean;
	isCreatable?: boolean;
	isAsync?: boolean;
	disabledDropdown?: boolean;
	menuIsOpen?: boolean;
	error?: boolean;
	onSelect(option: T | T[] | null): Promise<any> | void;
	optionRender?(option: IOptionValue<T>): JSX.Element;
	optionContentRender?(option: IOptionValue<T> | null): JSX.Element;
	singleValueRender?(option: IOptionValue<T> | null): JSX.Element;
}

interface IState<T> {
	options: IOptionValue<T>[];
	selectedOption: IOptionValue<T> | IOptionValue<T>[] | null;
}

const b = block('select');
const animatedComponents = makeAnimated();
/* const components = {
  simple: ReactSelect,
  creatable: CreatableSelect,
};*/

class Select<T extends OptionTypeBase | string> extends React.Component<IProps<T>, IState<T>> {
	public state: IState<T> = {
		options: [],
		selectedOption: null,
	};

	public componentDidMount() {
		const { selectedValue = null } = this.props;
		if (this.props.options) {
			const options = this.convertOptions(this.props.options);
			const selectedOption: IOptionValue<T> | IOptionValue<T>[] | null = Array.isArray(selectedValue)
				? options.filter((option) => selectedValue.indexOf(option.value) >= 0)
				: options.find((option) => option.value === selectedValue) || null;
			this.setState(
				{
					options,
					selectedOption,
				},
				() => this.selectOption(this.props),
			);
		}
	}

	public componentDidUpdate(prevProps: IProps<T>) {
		const { options } = this.props;
		const { options: prevOptions } = prevProps;

		if (options && (prevOptions == null || !R.equals<IOption<T>[]>(options, prevOptions))) {
			this.setState(
				{
					options: this.convertOptions(this.props.options!),
				},
				() => this.selectOption(this.props, prevProps),
			);
		}
	}

	@bind
	public changeOptions(options: IProps<T>['options']) {
		this.setState({ options: this.convertOptions(options!) });
	}

	public render() {
		const { placeholder, readonly, disabled, isMulti, error, isCreatable, menuIsOpen } = this.props;
		const { options, selectedOption } = this.state;
		// const ReactSelectTyped = isCreatable ? components.creatable : components.simple;
		const props: Props<IOptionValue<T>> = {
			isMulti,
			options,
			placeholder,
			menuIsOpen,
			className: b({ error, 'not-searchable': readonly }),
			classNamePrefix: b(),
			isDisabled: disabled,
			components: this.components,
			defaultValue: selectedOption,
			styles: {
				control: () => ({}),
				singleValue: () => ({}),
				valueContainer: () => ({}),
				placeholder: () => ({}),
				input: () => ({ display: 'flex', flex: 1 }),
			},
			value: selectedOption,
			isSearchable: !readonly,
			onChange: this.handleChange,
		};

		if (isCreatable) {
			return <CreatableSelect {...props} isMulti />;
		}

		return <ReactSelect {...props} />;
	}

	// private get components(): SelectComponents<IOptionValue<T>> {
	private get components(): any {
		const { optionRender, optionContentRender, singleValueRender, disabledDropdown } = this.props;
		const isCustomRender = optionRender || optionContentRender;
		return {
			...animatedComponents,
			// Input: disabledDropdown ? this.renderInput : animatedComponents.Input,
			Input: SelectInput,
			Option: isCustomRender ? this.optionRender : animatedComponents.Option,
			SingleValue: singleValueRender ? this.singleValueRender : animatedComponents.SingleValue,
			MultiValue: this.multiValueRender,
			MultiValueRemove: this.multiValueRemoveRender,
			DropdownIndicator: disabledDropdown ? null : SelectDropdownIndicator,
			IndicatorSeparator: null,
		};
	}

	@bind
	private optionRender(option: any) {
		const { optionRender, optionContentRender = () => null } = this.props;
		return optionRender ? (
			optionRender(option)
		) : (
			<animatedComponents.Option {...option}>{optionContentRender(option)}</animatedComponents.Option>
		);
	}

	@bind
	private singleValueRender(props: any) {
		const { singleValueRender } = this.props;
		const { selectedOption } = this.state;

		return (
			<animatedComponents.SingleValue {...props}>
				{singleValueRender ? singleValueRender(selectedOption as IOptionValue<T>) : props.children}
			</animatedComponents.SingleValue>
		);
	}

	@bind
	private multiValueRender(props: MultiValueProps<any>) {
		const getStyles = (type: string, childProps: any) => {
			return {};
		};
		return (
			<animatedComponents.MultiValue {...props} getStyles={getStyles}>
				{props.children}
			</animatedComponents.MultiValue>
		);
	}

	@bind
	private multiValueRemoveRender(props: MultiValueRemoveProps<any>) {
		const { className, ...restProps } = props;
		return (
			<div className={b('remove-btn')} {...restProps}>
				<i className="zi zi-close" />
			</div>
		);
	}

	@bind
	private handleChange(selectedOption: IOptionValue<T> | IOptionValue<T>[]) {
		const { onSelect } = this.props;
		// if isMulti - we always will have array of options here
		const value = selectedOption
			? Array.isArray(selectedOption)
				? selectedOption.map((option) => option.value)
				: selectedOption.value
			: null;
		const promise = onSelect(value);
		if (promise) {
			promise
				.then(() => {
					this.setState({ selectedOption });
				})
				.catch(() => {
					return void 0;
				});
		} else {
			this.setState({ selectedOption });
		}
	}

	private convertOptions(options: IOption<T>[]) {
		const { selectedOption, selectedValue, selectedIndex, selectedLabel } = this.props;
		return options.map((option: IOption<T>, index: number) => {
			const opt = this.convertOption(option, index);
			if (opt != null) {
				opt.isSelected =
					(selectedLabel && selectedLabel === opt.label) ||
					(selectedValue !== undefined && selectedValue === opt.value) ||
					(selectedOption && selectedOption === opt) ||
					(selectedIndex && selectedIndex === index) ||
					false;
			}
			return opt;
		});
	}

	private getOptionByLabel(label: IOptionValue<T>['label']) {
		return this.state.options.find((option) => option != null && option.label === label);
	}

	private getOptionByValue(value: T) {
		return this.state.options.find((option) => option != null && option.value === value);
	}

	private selectOption(props: ISelectionVariants<T>, prevProps: ISelectionVariants<T> = {}) {
		const { selectedIndex, selectedLabel, selectedOption, selectedValue } = props;
		const {
			selectedIndex: prevSelectedIndex,
			selectedLabel: prevSelectedLabel,
			selectedOption: prevSelectedOption,
			selectedValue: prevSelectedValue,
		} = prevProps;
		const { options } = this.state;
		if (selectedIndex && selectedIndex !== prevSelectedIndex) {
			this.setState({ selectedOption: options[selectedIndex] });
		} else if (selectedLabel && selectedLabel !== prevSelectedLabel) {
			const optionByLabel = this.getOptionByLabel(selectedLabel);
			if (optionByLabel) {
				this.setState({ selectedOption: optionByLabel });
			}
		} else if (
			selectedOption &&
			selectedOption.id &&
			(!prevSelectedOption || prevSelectedOption.id !== selectedOption.id)
		) {
			this.setState({ selectedOption });
		} else if (Array.isArray(selectedValue)) {
			// Selected value is array and looks like we are in multi mode
			const currentSelectedOptions: IOptionValue<T> | IOptionValue<T>[] | null = Array.isArray(selectedValue)
				? options.filter((option) => selectedValue.indexOf(option.value) >= 0)
				: options.find((option) => option.value === selectedValue) || null;
			this.setState({ selectedOption: currentSelectedOptions });
		} else if (selectedValue !== undefined && selectedValue !== prevSelectedValue) {
			const optionByValue = this.getOptionByValue(selectedValue);
			if (optionByValue) {
				this.setState({ selectedOption: optionByValue });
			}
		}
	}

	private convertOption(option: IOption<T>, index: number): IOptionValue<T> {
		if ((option as IOptionValue<T>).hasOwnProperty('id')) {
			return option as IOptionValue<T>;
		}

		if ((option as ISimpleOptionValue<T>).hasOwnProperty('value')) {
			const soption = option as ISimpleOptionValue<T>;
			return {
				...soption,
				index,
				label: soption.label || String(soption.value),
				data: soption.value,
				id: index,
				isDisabled: !!soption.isDisabled,
				isFocused: false,
				isSelected: false,
			};
		}

		const val = String(option);
		return {
			index,
			value: option as T,
			label: val,
			data: val,
			id: index,
			isDisabled: false,
			isFocused: false,
			isSelected: false,
		};
	}
}

export { IProps as ISelectProps };
export default Select;
