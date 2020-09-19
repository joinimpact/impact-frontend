import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Dispatch } from 'redux';
import { browseOpportunitiesForm } from '../../../redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import { Label } from 'shared/view/elements';
import { CountryFieldWrapper } from 'shared/view/redux-form/components';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { CommitmentFieldWrapper, SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { CommitmentField } from 'shared/view/redux-form';
import { ISimpleOptionValue } from 'shared/view/elements/Select/Select';
import { countryToAddressLocation } from 'shared/helpers/reactPlaceHelper';
import { IAddressLocation } from 'shared/types/requests/auth';

import './BrowseOpportunitiesFilter.scss';

interface IOwnProps {
	onFilter(values: NS.IBrowseOpportunitiesRequestProps): void;
}

interface IState {
	selectedAge: string;
	selectedRange: number[] | null;
}

const b = block('browse-opportunities-filter');

const { name: formName, fieldNames } = browseOpportunitiesForm;

const ageFrom = 13;
const ageRange: ISimpleOptionValue<string>[] = [{ label: 'Any', value: '' }].concat(
	Array.from({ length: 100 - ageFrom }, (_, index: number) => {
		return {
			label: `${index + ageFrom}`,
			value: `${index + ageFrom}`,
		};
	}),
);

type TComponentProps = IOwnProps & ITranslateProps;
type TProps = TComponentProps & InjectedFormProps<NS.IBrowseOpportunitiesForm, TComponentProps>;

class BrowseOpportunitiesFilter extends React.PureComponent<TProps, IState> {
	public state: IState = {
		selectedAge: ageRange[0].value,
		selectedRange: null,
	};

	public render() {
		const { translate: t } = this.props;
		return (
			<div className={b()}>
				<form onSubmit={this.props.handleSubmit}>
					<div className={b('field')}>
						<div className={b('field')}>
							<Label htmlFor={fieldNames.location}>{t('BROWSE-OPPORTUNITIES-FILTER:LABEL:NEAR')}</Label>
							<CountryFieldWrapper name={fieldNames.location} />
						</div>
					</div>
					<div className={b('field', { 'age-range': true })}>
						<Label htmlFor={fieldNames.ageRange}>{t('BROWSE-OPPORTUNITIES-FILTER:LABEL:AGE-RANGE')}</Label>
						<SelectFieldWrapper
							component={SelectField}
							name={fieldNames.ageRange}
							options={ageRange}
							selectedLabel={this.state.selectedAge}
							placeholder=""
							onSelect={this.handleSelectAge}
						/>
					</div>
					<div className={b('field', { 'range-select': true })}>
						<Label htmlFor={fieldNames.commitment}>
							<div>{t('BROWSE-OPPORTUNITIES-FILTER:LABEL:COMMITMENT')}</div>

							<div className={b('close-btn')} onClick={this.resetSelectedRange}>
								<i className="zi zi-close" />
							</div>
						</Label>
						<CommitmentFieldWrapper
							component={CommitmentField}
							name={fieldNames.commitment}
							from={0}
							to={40}
							step={1}
							tickerStep={10}
							currentValue={this.state.selectedRange}
							inputValue={this.rangeValue}
							onRangeChange={this.handleSelectRangeChanged}
						/>
					</div>
				</form>
			</div>
		);
	}

	private get rangeValue() {
		const { selectedRange } = this.state;

		if (!selectedRange) {
			return 'All';
		}

		const [from, to] = selectedRange;

		return `${from} - ${to} hrs`;
	}

	@bind
	private handleSelectAge(age: string) {
		this.setState({ selectedAge: age });
	}

	@bind
	private handleSelectRangeChanged(values: number[]) {
		this.setState({ selectedRange: values });
	}

	@bind
	private resetSelectedRange() {
		this.setState({ selectedRange: null }, () => {
			this.props.change(fieldNames.commitment, undefined);
		});
	}
}

const withForm = reduxForm<NS.IBrowseOpportunitiesForm, TComponentProps>({
	form: formName,
	onChange: async (
		values: NS.IBrowseOpportunitiesForm,
		dispatch: Dispatch,
		props: TComponentProps,
		prevValues: NS.IBrowseOpportunitiesForm,
	) => {
		const { location, ...resetValues } = values;
		if (location) {
			const convertedLocation: IAddressLocation = await countryToAddressLocation(location);
			props.onFilter({
				...resetValues,
				location: {
					lat: convertedLocation.lat,
					long: convertedLocation.long,
				},
			});
		} else {
			props.onFilter(resetValues as NS.IBrowseOpportunitiesRequestProps); // ignore location
		}
	},
})(BrowseOpportunitiesFilter);
export default i18nConnect<IOwnProps>(withForm);
