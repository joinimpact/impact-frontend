import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { connect } from 'react-redux';
import { Preloader } from 'shared/view/elements';
import routes from 'modules/routes';
import { IOpportunityResponse } from 'shared/types/responses/npo';

import './ViewSingleOpportunityModule.scss';

interface IFeatureProps {
	npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
	isNpoServiceReady: boolean;
}

const b = block('view-single-opportunity');

type TRouteProps = RouteComponentProps<{ opportunityId: string }>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class ViewSingleOpportunityModule extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
		};
	}

	public render() {
		const { translate: t } = this.props;
		const { ViewSingleOpportunityContainer } = this.props.npoFeatureEntry.containers;
		const { isNpoServiceReady } = this.props;

		return (
			<div className={b()}>
				<Preloader isShow={!isNpoServiceReady} position="relative" size={14}>
					<div className={b('warn')}>{t('VIEW-SINGLE-OPPORTUNITY-MODULE:INFO:VIEW-MIRRORS-FOR-VOLUNTEER')}</div>
					<ViewSingleOpportunityContainer
						opportunityId={this.props.match.params.opportunityId}
						onGoToAllOpportunities={this.handleGoToAllOpportunities}
						onEditOpportunity={this.handleEditOpportunity}
					/>
				</Preloader>
			</div>
		);
	}

	@bind
	private handleGoToAllOpportunities() {
		this.props.history.push(routes.dashboard.organization.opportunity.getPath());
	}

	@bind
	private handleEditOpportunity(opportunity: IOpportunityResponse) {
		this.props.history.push(`${routes.dashboard.organization.opportunity.edit.getPath()}/${opportunity.id}`);
	}
}

const withFeatures = withAsyncFeatures({
	npoFeatureEntry: npoFeatureLoadEntry,
})(ViewSingleOpportunityModule);
const withRedux = connect<IStateProps, null, TRouteProps>(ViewSingleOpportunityModule.mapStateToProps)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
