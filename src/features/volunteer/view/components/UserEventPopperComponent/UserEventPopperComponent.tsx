import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IEvent } from 'shared/types/models/events';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { defaultDateAndTimeFormat } from 'shared/types/app';
// import { bind } from 'decko';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { Button } from 'shared/view/elements';

import './UserEventPopperComponent.scss';

interface IOwnProps {
  event: IEvent;
  opportunity: IOpportunityResponse;
  paletteIndex: number;
  onGoToOpportunity(opportunityId: string): void;
  onAttend?(event: IEvent): void;
  onDecline?(event: IEvent): void;
}

const b = block('user-event-popper-component');

type TProps = IOwnProps & ITranslateProps;

class UserEventPopperComponent extends React.PureComponent<TProps> {
  public render() {
    const { event, translate: t, paletteIndex, onAttend, onDecline } = this.props;
    return (
      <div className={b({ [`color-${paletteIndex}`]: true })}>
        <div className={b('content')} onClick={this.handleStopEvent}>
          <div className={b('title')}>
            <div className={b('dot')}/>
            <div className={b('title-content')}>
              {event.title}
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('USER-EVENT-POPPER-COMPONENT:LABEL:DESCRIPTION')}
              </div>
              <div className={b('row-value')}>
                {event.description}
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('USER-EVENT-POPPER-COMPONENT:LABEL:LOCATION')}
              </div>
              <div className={b('row-value')}>
                {event.location.city.longName} {event.location.streetAddress.shortName}
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('USER-EVENT-POPPER-COMPONENT:LABEL:OPPORTUNITY')}
              </div>
              <div className={b('row-value', { bold: true })}>
                <div className={b('link')} onClick={this.handleGoToOpportunity}>
                  <i className="zi zi-link"/>
                  <div className={b('link-text')}>
                    {this.props.opportunity!.title}
                  </div>
                </div>
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('EVENT-POPPER-COMPONENT:LABEL:VOLUNTEERS')}
              </div>
              <div className={b('row-value', { bold: true })}>
                {t('USER-EVENT-POPPER-COMPONENT:VALUE:VOLUNTEERS-JOINED', {
                  num: event.responses.totalVolunteers,
                })}
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('USER-EVENT-POPPER-COMPONENT:LABEL:STARTING-DATE')}
              </div>
              <div className={b('row-value')}>
                {event.schedule.from.format(defaultDateAndTimeFormat)}
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('USER-EVENT-POPPER-COMPONENT:LABEL:ENDING-DATE')}
              </div>
              <div className={b('row-value')}>
                {event.schedule.to.format(defaultDateAndTimeFormat)}
              </div>
            </div>
          </div>

        </div>

        {(onAttend && onDecline) && (
          <div className={b('actions')}>
            <Button color="blue" onClick={this.handleAttendEvent}>
              {t('USER-EVENT-POPPER-COMPONENT:ACTION:I-CAN-ATTEND')}
            </Button>
            <Button color="grey" onClick={this.handleDeclineEvent}>
              {t('USER-EVENT-POPPER-COMPONENT:ACTION:I-CANT-ATTEND')}
            </Button>
          </div>
        )}

      </div>
    );
  }

  @bind
  private handleStopEvent(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  @bind
  private handleGoToOpportunity() {
    this.props.onGoToOpportunity(this.props.opportunity.id);
  }

  @bind
  private handleAttendEvent() {
    this.props.onAttend && this.props.onAttend(this.props.event);
  }

  @bind
  private handleDeclineEvent() {
    this.props.onDecline && this.props.onDecline(this.props.event);
  }
}

export default i18nConnect<IOwnProps>(UserEventPopperComponent);
