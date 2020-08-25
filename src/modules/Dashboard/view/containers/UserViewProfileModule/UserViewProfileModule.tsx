import React from 'react';
import block from 'bem-cn';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';

interface IFeatureProps {
  volunteerFeatureEntry: VolunteerFeatureEntry;
}

const b = block('user-view-profile-module');

type TRouteProps = RouteComponentProps<{ userId?: string; }>;
type TProps = IFeatureProps & TRouteProps & ITranslateProps;

class UserViewProfileModule extends React.PureComponent<TProps> {
  public render() {
    const { UserViewProfileContainer } = this.props.volunteerFeatureEntry.containers;
    return (
      <div className={b()}>
        <UserViewProfileContainer
          userId={this.props.match.params.userId}
        />
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(UserViewProfileModule);
export default withRouter(i18nConnect<TRouteProps>(withFeatures));
