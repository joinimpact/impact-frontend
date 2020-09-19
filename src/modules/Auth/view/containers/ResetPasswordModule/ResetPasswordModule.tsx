import React from 'react';
import block from 'bem-cn';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { AuthLayout } from 'modules/shared/components';

import './ResetPasswordModule.scss';

interface IFeatureProps {
	authFeatureEntry: AuthFeatureEntry;
}

const b = block('reset-password-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{ token: string }>;

class ResetPasswordModule extends React.PureComponent<TProps> {
	public render() {
		const {
			authFeatureEntry: { containers },
		} = this.props;
		const { ResetPasswordContainer } = containers;
		return (
			<div className={b()}>
				<AuthLayout withoutLogo>
					<ResetPasswordContainer token={this.props.match.params.token} />
				</AuthLayout>
			</div>
		);
	}
}

const withFeatures = withAsyncFeatures({
	authFeatureEntry: authFeatureLoadEntry,
})(ResetPasswordModule);

const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
