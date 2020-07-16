import React from 'react';
import block from 'bem-cn';
import { Entry as VolunteersFeatureEntry } from 'features/volunteer/entry';
import { loadEntry as volunteersFeatureLoadEntry } from 'features/volunteer/loader';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';

interface IFeatureProps {
  volunteersFeatureEntry: VolunteersFeatureEntry;
}

const b = block('user-view-opportunities-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & ITranslateProps & TRouteProps;

class UserViewOpportunitiesModule extends React.PureComponent<TProps> {
  public render() {
    const { ViewUserOpportunitiesContainer } = this.props.volunteersFeatureEntry.containers;
    return (
      <div className={b()}>
        <ViewUserOpportunitiesContainer/>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  volunteersFeatureEntry: volunteersFeatureLoadEntry,
})(UserViewOpportunitiesModule);
const i18nConnected = i18nConnect<TRouteProps>(withFeatures);
export default withRouter(i18nConnected);
