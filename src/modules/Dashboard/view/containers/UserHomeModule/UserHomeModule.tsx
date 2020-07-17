import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Entry as VolunteersFeatureEntry } from 'features/volunteer/entry';
import { loadEntry as volunteersFeatureLoadEntry } from 'features/volunteer/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import routes from 'modules/routes';

import './UserHomeModule.scss';

interface IFeatureProps {
  volunteersFeatureEntry: VolunteersFeatureEntry;
}

const b = block('user-home-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & ITranslateProps & TRouteProps;

class UserHomeModule extends React.PureComponent<TProps> {
  public render() {
    const { UserHomeContainer } = this.props.volunteersFeatureEntry.containers;
    return (
      <div className={b()}>
        <UserHomeContainer
          onViewOpportunityClicked={this.handleViewOpportunityClicked}
        />
      </div>
    );
  }

  @bind
  private handleViewOpportunityClicked(opportunityId: string) {
    this.props.history.push(`${routes.dashboard.user.opportunities.view.getPath()}/${opportunityId}`);
  }
}

const withFeatures = withAsyncFeatures({
  volunteersFeatureEntry: volunteersFeatureLoadEntry,
})(UserHomeModule);
const i18nConnected = i18nConnect<TRouteProps>(withFeatures);
export default withRouter(i18nConnected);
