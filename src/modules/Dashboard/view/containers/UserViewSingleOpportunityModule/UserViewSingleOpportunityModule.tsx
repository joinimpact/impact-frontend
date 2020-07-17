import React from 'react';
import block from 'bem-cn';
import { Entry as VolunteersFeatureEntry } from 'features/volunteer/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { RouteComponentProps, withRouter } from 'react-router';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as volunteersFeatureLoadEntry } from 'features/volunteer/loader';
import { ErrorScreen } from 'shared/view/components';

import './UserViewSingleOpportunityModule.scss';

interface IFeatureProps {
  volunteersFeatureEntry: VolunteersFeatureEntry;
}

const b = block('user-view-single-opportunity');

type TRouteProps = RouteComponentProps<{ opportunityId: string }>;
type TProps = IFeatureProps & ITranslateProps & TRouteProps;

class UserViewSingleOpportunityModule extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    const opportunityId = this.props.match.params.opportunityId;
    const { ViewSingleOpportunityContainer } = this.props.volunteersFeatureEntry.containers;
    return (
      <div className={b()}>
        {opportunityId ? (
          <ViewSingleOpportunityContainer
            opportunityId={opportunityId}
          />
        ) : (
          <ErrorScreen
            title={t('USER-VIEW-SINGLE-OPPORTUNITY-MODULE:PARAM-ERROR:TITLE')}
            message={t('USER-VIEW-SINGLE-OPPORTUNITY-MODULE:PARAM-ERROR:MESSAGE')}
          />
        )}
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  volunteersFeatureEntry: volunteersFeatureLoadEntry,
})(UserViewSingleOpportunityModule);
const i18nConnected = i18nConnect<TRouteProps>(withFeatures);
export default withRouter(i18nConnected);
