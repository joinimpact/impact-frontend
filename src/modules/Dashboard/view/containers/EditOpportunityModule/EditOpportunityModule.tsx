import React from 'react';
import block from 'bem-cn';
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
import { bind } from 'decko';

import './EditOpportunityModule.scss';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
}

const b = block('edit-opportunity-module');

type TRouteProps = RouteComponentProps<{ opportunityId: string }>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class EditOpportunityModule extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
    };
  }

  public render() {
    const { EditOpportunityContainer } = this.props.npoFeatureEntry.containers;
    const { isNpoServiceReady } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={!isNpoServiceReady} position="relative" size={14}>
          <EditOpportunityContainer
            editOpportunityId={this.props.match.params.opportunityId}
            onGoToViewAllOpportunities={this.handleGoToAllOpportunities}
          />
        </Preloader>
      </div>
    );
  }

  @bind
  private handleGoToAllOpportunities() {
    this.props.history.push(routes.dashboard.organization.opportunity.getPath());
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(EditOpportunityModule);
const withRedux = connect<IStateProps, null, TRouteProps>(
  EditOpportunityModule.mapStateToProps,
)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
