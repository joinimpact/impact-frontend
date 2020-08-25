import React from 'react';
import block from 'bem-cn';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ErrorScreen } from 'shared/view/components';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
}

interface IState {
  error: string | null;
}

const b = block('invite-module');

type TRouteProps = RouteComponentProps<{ organizationId: string, inviteId: string}>;
type TProps = TRouteProps & ITranslateProps & IFeatureProps;

class InviteModule extends React.PureComponent<TProps, IState> {
  public state: IState = {
    error: null,
  };

  public componentDidMount() {
    const { translate: t } = this.props;
    const { organizationId, inviteId } = this.props.match.params;

    if (!organizationId || !inviteId) {
      this.setState({ error: t('INVITE-MODULE:ERROR:WRONG-URL') });
    }
  }

  public render() {
    const { translate: t } = this.props;
    const { error } = this.state;
    const { organizationId, inviteId } = this.props.match.params;
    const { InviteController } = this.props.authFeatureEntry.containers;
    return (
      <div className={b()}>
        {error ? (
          <ErrorScreen
            title={t('INVITE-MODULE:ERROR:TITLE')}
            message={error}
          />
        ) : (
          <InviteController
            organizationId={organizationId}
            inviteId={inviteId}
          />
        )}
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
})(InviteModule);
export default i18nConnect<{}>(withRouter(withFeatures));
