import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { InputBaseField } from 'shared/view/redux-form';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { makeReduxFormEntry } from 'shared/util/redux';

import './SearchForm.scss';

interface IOwnProps {
	onSearch(value: string): void;
}

interface ISearchForm {
	search: string;
}

const b = block('search-form');

const { name: formName, fieldNames } = makeReduxFormEntry<ISearchForm>('searchForm', ['search']);

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<ISearchForm, IOwnProps & ITranslateProps>;

class SearchForm extends React.PureComponent<TProps> {
	public render() {
		const { translate: t } = this.props;
		return (
			<div className={b()}>
				<form onSubmit={this.handleSubmit}>
					<div className={b('field')}>
						<InputBaseFieldWrapper
							component={InputBaseField}
							name={fieldNames.search}
							placeholder={t('TOP-BAR-SEARCH-FORM:PLACEHOLDER:SEARCH')}
						/>
					</div>
				</form>
			</div>
		);
	}

	@bind
	private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit } = this.props;

		handleSubmit(async (data) => {
			this.props.onSearch(data.search);
		})(e);
	}
}

const withForm = reduxForm<ISearchForm, IOwnProps & ITranslateProps>({
	form: formName,
})(SearchForm);
export default i18nConnect<IOwnProps>(withForm);
