import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ITranslateProps } from 'services/i18n';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';
import { Preloader } from 'shared/view/elements';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import routes from 'modules/routes';

import './ViewOpportunitiesModule.scss';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
}

const b = block('view-opportunity-modules');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class ViewOpportunitiesModule extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
    };
  }

  public render() {
    const { ViewOpportunitiesContainer, NpoModalsContainer } = this.props.npoFeatureEntry.containers;
    const { isNpoServiceReady } = this.props;
    return (
      <div className={b()}>
        <NpoModalsContainer/>
        <Preloader isShow={!isNpoServiceReady} position="relative" size={14}>
          <ViewOpportunitiesContainer
            onViewOpportunity={this.handleViewOpportunity}
            onCreateNewOpportunity={this.handleCreateNewOpportunity}
          />
        </Preloader>
      </div>
    );
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.history.push(`${routes.dashboard.organization.opportunity.view.getPath()}/${opportunity.id}`);
  }

  @bind
  private handleCreateNewOpportunity() {
    this.props.history.push(routes.dashboard.organization.opportunity.create.getPath());
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(ViewOpportunitiesModule);
const withRedux = connect<IStateProps, null, TRouteProps>(
  ViewOpportunitiesModule.mapStateToProps,
)(withFeatures);
export default withRouter(withRedux);
