import React from 'react';
import block from 'bem-cn';
import { IEventResponsesResponse } from 'shared/types/responses/npo';
import { bind } from 'decko';
import { Image } from 'shared/view/elements';

import './EventResponsePortalComponent.scss';

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
      <div className={b('item')} key={`item-${index}`}>
        <div className={b('item-image')}><Image src={response.profilePicture}/></div>
        <div className={b('item-name')}>{response.firstName} {response.lastName}</div>
      </div>
    );
  }
}

export default EventResponsesPortalComponent;
