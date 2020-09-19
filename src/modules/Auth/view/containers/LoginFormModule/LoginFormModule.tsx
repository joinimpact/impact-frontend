import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { RouteComponentProps, withRouter } from 'react-router';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { AuthLayout } from 'modules/shared/components';
import routes from 'modules/routes';

import './LoginFormModule.scss';

interface IFeatureProps {
	authFeatureEntry: AuthFeatureEntry;
}

const b = block('login-form-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class LoginFormModule extends React.Component<TProps> {
	public render() {
		const {
			authFeatureEntry: { containers },
		} = this.props;
		const { LoginFormContainer } = containers;
		return (
			<div className={b()}>
				<AuthLayout>
					<LoginFormContainer onSignUpRequest={this.handleSignUpRequest} />
				</AuthLayout>
			</div>
		);
	}

	@bind
	private handleSignUpRequest() {
		this.props.history.push(routes.auth.register.getPath());
	}
}

const withFeatures = withAsyncFeatures({
	authFeatureEntry: authFeatureLoadEntry,
})(LoginFormModule);
const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
