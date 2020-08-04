import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IEvent } from 'shared/types/models/events';
import { Button, Error } from 'shared/view/elements';
import { defaultDateAndTimeFormat, defaultDateFormat } from 'shared/types/app';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { ICommunication } from 'shared/types/redux';

import './EventPopperComponent.scss';

interface IOwnProps {
  event: IEvent;
  paletteIndex: number;
  opportunity: IOpportunityResponse | undefined;
  deleteCommunication: ICommunication;
  onEditEvent(event: IEvent): void;
  onDeleteEvent(event: IEvent): void;
}

const b = block('event-popper-component');

type TProps = IOwnProps & ITranslateProps;

class EventPopperComponent extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, event, paletteIndex, deleteCommunication } = this.props;
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
                {t('EVENT-POPPER-COMPONENT:LABEL:DESCRIPTION')}
              </div>
              <div className={b('row-value')}>
                {event.description}
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('EVENT-POPPER-COMPONENT:LABEL:LOCATION')}
              </div>
              <div className={b('row-value')}>
                {event.location.city.longName} {event.location.streetAddress.shortName}
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('EVENT-POPPER-COMPONENT:LABEL:OPPORTUNITY')}
              </div>
              <div className={b('row-value', { bold: true })}>
                <div className={b('link')} onClick={this.handleEditEvent}>
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
                {t('EVENT-POPPER-COMPONENT:VALUE:VOLUNTEERS-JOINED', {
                  num: event.responses.totalVolunteers,
                })}
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('EVENT-POPPER-COMPONENT:LABEL:STARTING-DATE')}
              </div>
              <div className={b('row-value')}>
                {event.schedule.from.format(event.schedule.dateOnly ? defaultDateFormat : defaultDateAndTimeFormat)}
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('EVENT-POPPER-COMPONENT:LABEL:ENDING-DATE')}
              </div>
              <div className={b('row-value')}>
                {event.schedule.to.format(event.schedule.dateOnly ? defaultDateFormat : defaultDateAndTimeFormat)}
              </div>
            </div>
          </div>

          {deleteCommunication.error && (
            <div className={b('error')}>
              <Error>{deleteCommunication.error}</Error>
            </div>
          )}
        </div>


        <div className={b('actions')}>
          <Button color="blue" onClick={this.handleEditEvent}>
            {t('EVENT-POPPER-COMPONENT:ACTION:VIEW-EDIT')}
          </Button>
          <Button color="grey" onClick={this.handleDeleteEvent} isShowPreloader={deleteCommunication.isRequesting}>
            {t('EVENT-POPPER-COMPONENT:ACTION:DELETE')}
          </Button>
        </div>

      </div>
    );
  }

  @bind
  private handleEditEvent() {
    this.props.onEditEvent(this.props.event);
  }

  @bind
  private handleDeleteEvent(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onDeleteEvent(this.props.event);
  }

  @bind
  private handleStopEvent(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }
}

export default i18nConnect<IOwnProps>(EventPopperComponent);
