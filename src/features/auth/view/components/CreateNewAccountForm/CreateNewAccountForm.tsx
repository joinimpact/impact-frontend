import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import { createNewAccountFormEntry } from '../../../redux/reduxFormEntries';
import { Button, Error } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { CountryFieldWrapper, DatePickerFieldWrapper } from 'shared/view/redux-form/components';
import { IAddressLocation } from 'shared/types/requests/auth';
import { countryToAddressLocation } from 'shared/helpers/reactPlaceHelper';
import { InputCard } from 'shared/view/components';

import './CreateNewAccountForm.scss';

interface IOwnProps {
	communication?: ICommunication;
	onCreateAccount(values: NS.ICreateAccountValues): void;
}

interface IState {
	error: string | null;
}

const b = block('create-new-account-form');
const { name: formName, fieldNames } = createNewAccountFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.ICreateAccountForm, ITranslateProps & IOwnProps>;

class CreateNewAccountForm extends React.PureComponent<TProps, IState> {
	public state: IState = {
		error: null,
	};

	public render() {
		const { translate: t, communication, error } = this.props;
		return (
			<div className={b()}>
				<div className={b('caption')}>{t('CREATE-NEW-ACCOUNT-FORM:STATIC:CAPTION')}</div>
				<form className={b('form')} onSubmit={this.handleCreateAccount}>
					<InputCard
						title={t('CREATE-NEW-ACCOUNT-FORM:TITLE:YOUR-NAME')}
						description={t('CREATE-NEW-ACCOUNT-FORM:DESCRIPTION:YOUR-NAME')}
						required={true}
						inputs={
							<div className={b('split-fields')}>
								<div className={b('field')}>
									<InputBaseFieldWrapper
										component={InputBaseField}
										name={fieldNames.firstName}
										label={t('CREATE-NEW-ACCOUNT-FORM:LABEL:FIRST-NAME')}
										placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:FIRST-NAME')}
										validate={[required]}
									/>
								</div>
								<div className={b('field')}>
									<InputBaseFieldWrapper
										component={InputBaseField}
										name={fieldNames.lastName}
										label={t('CREATE-NEW-ACCOUNT-FORM:LABEL:LAST-NAME')}
										placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:LAST-NAME')}
										validate={[required]}
									/>
								</div>
							</div>
						}
						footer={<span>{t('CREATE-NEW-ACCOUNT-FORM:FOOTER:YOUR-NAME')}</span>}
					/>
					<InputCard
						title={t('CREATE-NEW-ACCOUNT-FORM:TITLE:EMAIL')}
						description={t('CREATE-NEW-ACCOUNT-FORM:DESCRIPTION:EMAIL')}
						required={true}
						inputs={
							<div className={b('field')}>
								<InputBaseFieldWrapper
									component={InputBaseField}
									name={fieldNames.email}
									label={t('CREATE-NEW-ACCOUNT-FORM:LABEL:EMAIL')}
									placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:EMAIL')}
									validate={[required, validateEmail]}
								/>
							</div>
						}
						footer={<span>{t('CREATE-NEW-ACCOUNT-FORM:FOOTER:EMAIL')}</span>}
					/>
					<InputCard
						title={t('CREATE-NEW-ACCOUNT-FORM:TITLE:YOUR-BIRTHDAY')}
						description={t('CREATE-NEW-ACCOUNT-FORM:DESCRIPTION:YOUR-BIRTHDAY')}
						required={true}
						inputs={
							<div className={b('field')}>
								<DatePickerFieldWrapper
									name={fieldNames.birthday}
									placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:BIRTHDAY')}
									validate={[required]}
								/>
							</div>
						}
						footer={<span>{t('CREATE-NEW-ACCOUNT-FORM:FOOTER:YOUR-BIRTHDAY')}</span>}
					/>
					<InputCard
						title={t('CREATE-NEW-ACCOUNT-FORM:TITLE:LOCATION')}
						description={t('CREATE-NEW-ACCOUNT-FORM:DESCRIPTION:LOCATION')}
						required={true}
						inputs={
							<div className={b('field')}>
								<CountryFieldWrapper
									name={fieldNames.address}
									placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:LOCATION')}
									validate={[required]}
								/>
							</div>
						}
						footer={<span>{t('CREATE-NEW-ACCOUNT-FORM:FOOTER:LOCATION')}</span>}
					/>

					{error && (
						<div className={b('error')}>
							<Error>{error}</Error>
						</div>
					)}

					{/* {(communication && communication.error) && (
            <div className={b('error')}>
              <Error>{communication.error}</Error>
            </div>
          )}*/}

					{this.state.error && (
						<div className={b('error')}>
							<Error>{this.state.error}</Error>
						</div>
					)}

					<div className={b('form-actions')}>
						<Button color="blue" isShowPreloader={communication ? communication.isRequesting : false}>
							{t('SHARED:BUTTONS:CONTINUE')}
						</Button>
					</div>
				</form>
			</div>
		);
	}

	@bind
	private handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit, onCreateAccount } = this.props;

		handleSubmit(async (data) => {
			const location: IAddressLocation = await countryToAddressLocation(data.address);
			onCreateAccount({
				...data,
				// Warning! Converting google location to lat/long point for api call
				address: location,
			});
		})(e);
	}
}

const withForm = reduxForm<NS.ICreateAccountForm, ITranslateProps & IOwnProps>({
	form: formName,
})(CreateNewAccountForm);
export default i18nConnect<IOwnProps>(withForm);
