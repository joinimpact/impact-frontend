import React from 'react';
import block from 'bem-cn';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { connect } from 'react-redux';

import './OrganizationMessagesModule.scss';

interface IFeatureProps {
	npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
	isNpoServiceReady: boolean;
}

const b = block('organization-messages-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class OrganizationMessagesModule extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
		};
	}

	public render() {
		const { NpoMessagesContainer, NpoChatConversationsContainer } = this.props.npoFeatureEntry.containers;
		return (
			<div className={b()}>
				<div className={b('left')}>
					<NpoChatConversationsContainer />
				</div>
				<div className={b('right')}>
					<NpoMessagesContainer />
				</div>
			</div>
		);
	}
}

const withFeatures = withAsyncFeatures({
	npoFeatureEntry: npoFeatureLoadEntry,
})(OrganizationMessagesModule);
const withRedux = connect<IStateProps, null, TRouteProps>(OrganizationMessagesModule.mapStateToProps)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
