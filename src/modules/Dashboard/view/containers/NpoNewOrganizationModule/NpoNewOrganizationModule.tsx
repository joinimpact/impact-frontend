import React from 'react';
import block from 'bem-cn';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { connect } from 'react-redux';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';
import { Link, Logo } from 'shared/view/elements';

import './NpoNewOrganizationModule.scss';
import { bind } from 'decko';
import routes from 'modules/routes';

interface IFeatureProps {
	npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
	isNpoServiceReady: boolean;
}

const b = block('npo-new-organization-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class NpoNewOrganizationModule extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
		};
	}

	public render() {
		const { translateArray: ta } = this.props;
		const { NpoCreateOrganizationContainer } = this.props.npoFeatureEntry.containers;
		return (
			<div className={b()}>
				<div className={b('top-bar')}>
					<Link href="/">
						<div className={b('logo')}>
							<Logo />
						</div>
					</Link>
				</div>
				<div className={b('greeting-text')}>
					<div className={b('greeting-text-block')}>
						{ta('NPO-NEW-ORGANIZATION-MODULE:STATIC:TEXT').map((row: string, index: number) => (
							<div className={b('greeting-text-row')} key={`row-${index}`}>
								{row}
							</div>
						))}
					</div>
				</div>
				<div className={b('content')}>
					<NpoCreateOrganizationContainer onGoToNPODashboard={this.handleGoToNPODashboard} />
				</div>
			</div>
		);
	}

	@bind
	private handleGoToNPODashboard() {
		this.props.history.push(routes.dashboard.organization.home.getPath());
	}
}

const withFeatures = withAsyncFeatures({
	npoFeatureEntry: npoFeatureLoadEntry,
})(NpoNewOrganizationModule);
const withRedux = connect<IStateProps, null, TRouteProps>(NpoNewOrganizationModule.mapStateToProps)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
