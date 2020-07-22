import React from 'react';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { RouteComponentProps, withRouter } from 'react-router';
import routes from 'modules/routes';
import { bind } from 'decko';
import { IOpportunityResponse } from 'shared/types/responses/npo';

interface IFeatureProps {
  volunteerFeatureEntry: VolunteerFeatureEntry;
}

type TRouteProp = RouteComponentProps<{}>;
type TProps = IFeatureProps & ITranslateProps & TRouteProp;

class UserBrowseOpportunitiesModule extends React.PureComponent<TProps> {
  public render() {
    const { BrowseOpportunitiesContainer } = this.props.volunteerFeatureEntry.containers;
    return (
      <BrowseOpportunitiesContainer
        onViewOpportunity={this.handleViewOpportunity}
      />
    );
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.history.push(`${routes.dashboard.user.opportunities.view.getPath()}/${opportunity.id}`);
  }
}

const withFeatures = withAsyncFeatures({
  volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(UserBrowseOpportunitiesModule);
const i18nConnected = i18nConnect(withFeatures);
export default withRouter(i18nConnected);
