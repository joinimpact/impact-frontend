import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IEventResponsesResponse } from 'shared/types/responses/npo';
import { UserAvatar } from 'shared/view/components';
import { Image, Link } from 'shared/view/elements';

import './EventResponsePortalComponent.scss';
import routes from 'modules/routes';

interface IOwnProps {
  eventResponses: IEventResponsesResponse[];
}

const b = block('event-responses-portal-component');

type TProps = IOwnProps;

class EventResponsesPortalComponent extends React.PureComponent<TProps> {
  public render() {
    const { eventResponses } = this.props;
    return (
      <div className={b()}>
        {eventResponses.map(this.renderResponseItem)}
      </div>
    );
  }

  @bind
  private renderResponseItem(response: IEventResponsesResponse, index: number) {
    return (
      <Link href={`${routes.dashboard.user.profile.view.getPath()}/${response.userId}`}>
        <div className={b('item')} key={`item-${index}`}>
          <div className={b('item-image')}>
            {response.profilePicture ? (
              <Image src={response.profilePicture}/>
            ) : (
              <UserAvatar
                className={b('item-user-avatar')}
                firstName={response.firstName}
                lastName={response.lastName}
              />
            )}
          </div>
          <div className={b('item-name')}>{response.firstName} {response.lastName}</div>
        </div>
      </Link>
    );
  }
}

export default EventResponsesPortalComponent;
