import React from 'react';
import block from 'bem-cn';
import { Entry as VolunteersFeatureEntry } from 'features/volunteer/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { loadEntry as volunteersFeatureLoadEntry } from 'features/volunteer/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';

import './UserChatModule.scss';

interface IFeatureProps {
  volunteersFeatureEntry: VolunteersFeatureEntry;
}

const b = block('user-chat-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & ITranslateProps & TRouteProps;

class UserChatModule extends React.PureComponent<TProps> {
  public render() {
    const { UserChatContainer, UserChatConversationsContainer } = this.props.volunteersFeatureEntry.containers;
    return (
      <div className={b()}>
        <div className={b('left')}>
          <UserChatConversationsContainer/>
        </div>
        <div className={b('right')}>
          <UserChatContainer/>
        </div>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  volunteersFeatureEntry: volunteersFeatureLoadEntry,
})(UserChatModule);
const i18nConnected = i18nConnect<TRouteProps>(withFeatures);
export default withRouter(i18nConnected);
