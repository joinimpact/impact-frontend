import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import routes from 'modules/routes';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
}

import './NpoHomeModule.scss';

const b = block('npo-home-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class NpoHomeModule extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
    };
  }

  public render() {
    const { NpoHomeViewContainer } = this.props.npoFeatureEntry.containers;
    return (
      <div className={b()}>
        <NpoHomeViewContainer
          onViewOpportunity={this.handleViewOpportunity}
          onCreateNewOpportunity={this.handleCreateNewOpportunity}
        />
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
})(NpoHomeModule);
const withRedux = connect<IStateProps, null, TRouteProps>(
  NpoHomeModule.mapStateToProps,
)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
