import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IEvent } from 'shared/types/models/events';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { defaultDateAndTimeFormat, defaultDateFormat } from 'shared/types/app';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { Button, Error } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { IEventUserResponse } from 'shared/types/responses/volunteer';

import './UserEventPopperComponent.scss';

interface IOwnProps {
  event: IEvent;
  opportunity: IOpportunityResponse;
  paletteIndex: number;
  attendCommunication: ICommunication;
  declineCommunication: ICommunication;
  getMyResponseToEventCommunication: ICommunication;
  myResponseToThisEvent: IEventUserResponse | null;
  onGoToOpportunity(opportunityId: string): void;
  onAttend?(event: IEvent): void;
  onDecline?(event: IEvent): void;
}

const b = block('user-event-popper-component');

type TProps = IOwnProps & ITranslateProps;

class UserEventPopperComponent extends React.PureComponent<TProps> {
  public render() {
    const {
      event,
      translate: t,
      paletteIndex,
      onAttend,
      onDecline,
      attendCommunication,
      declineCommunication,
    } = this.props;

    return (
      <div className={b({ [`color-${paletteIndex}`]: true })}>
        <div className={b('content')} onClick={this.handleStopEvent}>
          <div className={b('title')}>
            <div className={b('dot')} />
            <div className={b('title-content')}>{event.title}</div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>{t('USER-EVENT-POPPER-COMPONENT:LABEL:DESCRIPTION')}</div>
              <div className={b('row-value')}>{event.description}</div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>{t('USER-EVENT-POPPER-COMPONENT:LABEL:LOCATION')}</div>
              <div className={b('row-value')}>
                {event.location.city.longName} {event.location.streetAddress.shortName}
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>{t('USER-EVENT-POPPER-COMPONENT:LABEL:OPPORTUNITY')}</div>
              <div className={b('row-value', { bold: true })}>
                <div className={b('link')} onClick={this.handleGoToOpportunity}>
                  <i className="zi zi-link" />
                  <div className={b('link-text')}>{this.props.opportunity!.title}</div>
                </div>
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>{t('EVENT-POPPER-COMPONENT:LABEL:VOLUNTEERS')}</div>
              <div className={b('row-value', { bold: true })}>
                {t('USER-EVENT-POPPER-COMPONENT:VALUE:VOLUNTEERS-JOINED', {
                  num: event.responses.totalVolunteers,
                })}
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>{t('USER-EVENT-POPPER-COMPONENT:LABEL:STARTING-DATE')}</div>
              <div className={b('row-value')}>
                {event.schedule.from.format(event.schedule.dateOnly ? defaultDateFormat : defaultDateAndTimeFormat)}
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>{t('USER-EVENT-POPPER-COMPONENT:LABEL:ENDING-DATE')}</div>
              <div className={b('row-value')}>
                {event.schedule.to.format(event.schedule.dateOnly ? defaultDateFormat : defaultDateAndTimeFormat)}
              </div>
            </div>
          </div>
        </div>

        {attendCommunication.error && (
          <div className={b('error')}>
            <Error>{attendCommunication.error}</Error>
          </div>
        )}

        {declineCommunication.error && (
          <div className={b('error')}>
            <Error>{declineCommunication.error}</Error>
          </div>
        )}

        {onAttend && onDecline && this.renderActions()}
      </div>
    );
  }

  @bind
  private renderActions() {
    const {
      translate: t,
      getMyResponseToEventCommunication,
      declineCommunication,
      attendCommunication,
      myResponseToThisEvent,
    } = this.props;
    const response = myResponseToThisEvent ? myResponseToThisEvent.response : null;
    return (
      <div className={b('actions')}>
        {response === 1 ? (
          <div className={b('attend-status')}>
            <div className={b('attend-status-icon')}>
              <i className="zi zi-checkmark" />
            </div>
            <div className={b('attend-status-text')}>{t('USER-EVENT-POPPER-COMPONENT:STATUS:I-AM-ATTENDING')}</div>
          </div>
        ) : (
          <Button
            color="blue"
            isShowPreloader={getMyResponseToEventCommunication.isRequesting || attendCommunication.isRequesting}
            onClick={this.handleAttendEvent}
          >
            {t('USER-EVENT-POPPER-COMPONENT:ACTION:I-CAN-ATTEND')}
          </Button>
        )}
        {response === 2 ? (
          <div className={b('attend-status')}>{t('USER-EVENT-POPPER-COMPONENT:STATUS:I-DECLINED')}</div>
        ) : (
          <Button
            color="grey"
            isShowPreloader={getMyResponseToEventCommunication.isRequesting || declineCommunication.isRequesting}
            onClick={this.handleDeclineEvent}
          >
            {t('USER-EVENT-POPPER-COMPONENT:ACTION:I-CANT-ATTEND')}
          </Button>
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
  private handleAttendEvent(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onAttend && this.props.onAttend(this.props.event);
  }

  @bind
  private handleDeclineEvent(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onDecline && this.props.onDecline(this.props.event);
  }
}

export default i18nConnect<IOwnProps>(UserEventPopperComponent);
