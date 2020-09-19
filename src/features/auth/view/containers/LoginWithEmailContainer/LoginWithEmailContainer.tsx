import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { i18nConnect, ITranslateProps } from 'services/i18n';
import { loginFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { Button, Link, Error } from 'shared/view/elements';
import routes from 'modules/routes';

import './LoginWithEmailContainer.scss';

interface IStateProps {
	loginCommunication: ICommunication;
}

interface IActionProps {
	login: typeof actions.login;
}

const b = block('login-with-email-container');

const { name, fieldNames } = loginFormEntry;

type TProps = IStateProps & IActionProps & ITranslateProps & InjectedFormProps<NS.ILoginForm, ITranslateProps>;

class LoginWithEmailContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			loginCommunication: selectors.selectCommunication(state, 'login'),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				login: actions.login,
			},
			dispatch,
		);
	}

	public render() {
		const { translate: t, error, loginCommunication } = this.props;
		return (
			<div className={b()}>
				<form onSubmit={this.handleLoginSubmit} className={b('form')}>
					<div className={b('field')}>
						<InputBaseFieldWrapper
							component={InputBaseField}
							name={fieldNames.email}
							placeholder={t('LOGIN-FORM:STATIC:EMAIL')}
							type="email"
							validate={[required, validateEmail]}
							autoFocus
						/>
					</div>
					<div className={b('field')}>
						<InputBaseFieldWrapper
							component={InputBaseField}
							name={fieldNames.password}
							placeholder={t('LOGIN-FORM:STATIC:PASSWORD')}
							type="password"
							validateOnChange
							validate={[required]}
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

					{loginCommunication.error && (
						<div className={b('error')}>
							<Error>{loginCommunication.error}</Error>
						</div>
					)}

					<div className={b('actions')}>
						<Button color="blue" isShowPreloader={loginCommunication.isRequesting}>
							{t('SHARED:BUTTONS:LOGIN')}
						</Button>
					</div>

					<div className={b('links')}>
						<Link href={routes.auth.forgot.getPath()}>{t('LOGIN-WITH-EMAIL-CONTAINER:LINK:FORGOT-PASSWORD')}</Link>
					</div>
				</form>
			</div>
		);
	}

	@bind
	private handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit, login } = this.props;

		handleSubmit(async (data) => {
			login({
				password: data.password,
				email: data.email,
			});
		})(e);
	}
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
	LoginWithEmailContainer.mapStateToProps,
	LoginWithEmailContainer.mapDispatch,
)(LoginWithEmailContainer);
const withForm = reduxForm<NS.ILoginForm, ITranslateProps>({
	form: name,
})(withRedux);
export default i18nConnect<{}>(withForm);
