import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { forgotPasswordFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { Button, Error,  Link } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import routes from 'modules/routes';

import './ForgotPasswordContainer.scss';

interface IStateProps {
	recoveryPasswordCommunication: ICommunication;
}

interface IActionProps {
	recoveryPassword: typeof actions.recoveryPassword;
}

interface IState {
	email: string | null;
}

const b = block('forgot-password-container');

const { name: formName, fieldNames } = forgotPasswordFormEntry;

type TProps = IStateProps & IActionProps & ITranslateProps & InjectedFormProps<NS.IForgotPasswordForm, ITranslateProps>;

class ForgotPasswordContainer extends React.PureComponent<TProps, IState> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			recoveryPasswordCommunication: selectors.selectCommunication(state, 'recoveryPassword'),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				recoveryPassword: actions.recoveryPassword,
			},
			dispatch,
		);
	}

	public state: IState = {
		email: null,
	};

	public render() {
		const { translate: t, error, recoveryPasswordCommunication } = this.props;
		return (
			<div className={b()}>
				<Link href={routes.auth.login.getPath()}>
					<div className={b('card-header')}>
						<i className="zi zi-cheveron-left" />
						<span className={b('link-span')}>{t('FORGOT-PASSWORD-CONTAINER:LINK:LOGIN-WITH-EMAIL')}</span>
					</div>
				</Link>
				<div className={b('main-wrapper')}>
					<div className={b('header-wrapper')}>
						<h3 className={b('header')}>{t('FORGOT-PASSWORD-CONTAINER:STATIC:RECOVER-HEADER')}</h3>
						<p className={b('description')}>{t('FORGOT-PASSWORD-CONTAINER:STATIC:RECOVER-DESCRIPTION')}</p>
					</div>
					<form onSubmit={this.handleForgotPasswordSubmit}>
						<div className={b('field')}>
							<span className={b('input-label')}>{t('LOGIN-FORM:STATIC:EMAIL')}</span>
							<InputBaseFieldWrapper
								component={InputBaseField}
								name={fieldNames.email}
								placeholder={t('LOGIN-FORM:STATIC:EMAIL-PLACEHOLDER')}
								type="email"
								validate={[required, validateEmail]}
								autoFocus
							/>
						</div>

						{error && (
							<div className={b('error')}>
								<Error>{error}</Error>
							</div>
						)}

						{recoveryPasswordCommunication.error && (
							<div className={b('error')}>
								<Error>{recoveryPasswordCommunication.error}</Error>
							</div>
						)}

						{recoveryPasswordCommunication.isLoaded ? (
							<div className={b('info')}>
								{t('FORGOT-PASSWORD-CONTAINER:STATIC:PASSWORD-RESTORED', {
									email: this.state.email,
								})}
							</div>
						) : (
							<div className={b('actions')}>
								<div className={b('actions-left')}>
								</div>
								<div className={b('actions-right')}>
									<Button color="blue" minWidth={true} isShowPreloader={recoveryPasswordCommunication.isRequesting}>
										{t('SHARED:BUTTONS:SUBMIT')}
									</Button>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
		);
	}

	@bind
	private handleForgotPasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit, recoveryPassword } = this.props;

		handleSubmit(async (data) => {
			this.setState({ email: data.email }, () => {
				recoveryPassword({
					email: data.email,
				});
			});
		})(e);
	}
}

const withRedux = connect<IStateProps, IActionProps>(
	ForgotPasswordContainer.mapStateToProps,
	ForgotPasswordContainer.mapDispatch,
)(ForgotPasswordContainer);
const withForm = reduxForm<NS.IForgotPasswordForm, ITranslateProps>({
	form: formName,
})(withRedux);

export default i18nConnect<{}>(withForm);
