import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { resetPasswordFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { InputBaseField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { Button, Error, Link } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';

import './ResetPasswordContainer.scss';

import routes from 'modules/routes';

interface IOwnProps {
	token: string;
}

interface IStateProps {
	resetPasswordCommunication: ICommunication;
}

interface IActionProps {
	resetPassword: typeof actions.resetPassword;
}

const b = block('reset-password-container');

const { name: formName, fieldNames } = resetPasswordFormEntry;

type TProps = IOwnProps &
IStateProps &
IActionProps &
ITranslateProps &
InjectedFormProps<NS.IResetPasswordForm, IOwnProps & ITranslateProps>;

class ResetPasswordContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			resetPasswordCommunication: selectors.selectCommunication(state, 'resetPassword'),
		};
	}

	public static mapDispatch(dispatch: Dispatch) {
		return bindActionCreators(
			{
				resetPassword: actions.resetPassword,
			},
			dispatch,
		);
	}

	public render() {
		const { translate: t, error, resetPasswordCommunication } = this.props;
		return (
			<div className={b()}>
				<div className={b('caption')}>{t('RESET-PASSWORD-CONTAINER:STATIC:CAPTION')}</div>
				<form onSubmit={this.handleResetPasswordForm}>
					<div className={b('field')}>
						<InputBaseFieldWrapper
							component={InputBaseField}
							name={fieldNames.password}
							placeholder={t('RESET-PASSWORD-CONTAINER:PLACEHOLDER:PASSWORD')}
							type="password"
							validate={[required]}
							// validateOnChange
							autoFocus
						/>
					</div>

					<div className={b('field')}>
						<InputBaseFieldWrapper
							component={InputBaseField}
							name={fieldNames.passwordRepeat}
							placeholder={t('RESET-PASSWORD-CONTAINER:PLACEHOLDER:CONFIRM-PASSWORD')}
							type="password"
							validate={[required, this.validatePasswordRepeat]}
						/>
					</div>

					<div className={b('spacer')}>
						<hr />
					</div>

					{error && (
						<div className={b('error')}>
							<Error>{error}</Error>
						</div>
					)}

					{resetPasswordCommunication.error && (
						<div className={b('error')}>
							<Error>{resetPasswordCommunication.error}</Error>
						</div>
					)}

					<div className={b('actions')}>
						<Button color="blue" isShowPreloader={resetPasswordCommunication.isRequesting}>
							{t('SHARED:BUTTONS:CONTINUE')}
						</Button>
					</div>

					<div className={b('links')}>
						<Link href={routes.auth['login-with-email'].getPath()}>
							{t('RESET-PASSWORD-CONTAINER:LINK:LOGIN-WITH-EMAIL')}
						</Link>
					</div>
				</form>
			</div>
		);
	}

	@bind
	private handleResetPasswordForm(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit, resetPassword } = this.props;

		handleSubmit(async (data) => {
			resetPassword({
				token: this.props.token,
				password: data.password,
				passwordRepeat: data.passwordRepeat,
			});
		})(e);
	}

	@bind
	private validatePasswordRepeat(
		value: string,
		allValues?: NS.IResetPasswordForm,
		props?: TProps,
		name?: string,
	): string | undefined {
		const { translate: t } = this.props;
		const { password, passwordRepeat } = allValues || {};
		return password && passwordRepeat && password !== passwordRepeat
			? t('RESET-PASSWORD-CONTAINER:ERROR:PASSWORD-NOT-EQUALS')
			: undefined;
	}
}

const withRedux = connect<IStateProps, IActionProps>(
	ResetPasswordContainer.mapStateToProps,
	ResetPasswordContainer.mapDispatch,
)(ResetPasswordContainer);
const withForm = reduxForm<NS.IResetPasswordForm, IOwnProps & ITranslateProps>({
	form: formName,
})(withRedux);
export default i18nConnect<IOwnProps>(withForm);
