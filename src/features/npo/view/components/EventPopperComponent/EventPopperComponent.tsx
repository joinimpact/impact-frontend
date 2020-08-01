import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IEvent } from 'shared/types/models/events';
import { Button } from 'shared/view/elements';
import { defaultDateAndTimeFormat } from 'shared/types/app';
import { IOpportunityResponse } from 'shared/types/responses/npo';

import './EventPopperComponent.scss';

interface IOwnProps {
  event: IEvent;
  paletteIndex: number;
  opportunity: IOpportunityResponse | undefined;
  onGoToOpportunity(opportunityId: string): void;
}

const b = block('event-popper-component');

type TProps = IOwnProps & ITranslateProps;

class EventPopperComponent extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, event, paletteIndex } = this.props;
    return (
      <div className={b({ [`color-${paletteIndex}`]: true })}>
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
            <div className={b('row-value')}>
              <div className={b('link')} onClick={this.handleGoToOpportunity}>
                {this.props.opportunity!.title}
              </div>
            </div>
          </div>
          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('EVENT-POPPER-COMPONENT:LABEL:VOLUNTEERS')}
            </div>
            <div className={b('row-value')}>
              NOT YET IMPLEMENTED
            </div>
          </div>
        </div>

        <div className={b('block')}>
          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('EVENT-POPPER-COMPONENT:LABEL:STARTING-DATE')}
            </div>
            <div className={b('row-value')}>
              {event.schedule.from.format(defaultDateAndTimeFormat)}
            </div>
          </div>
          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('EVENT-POPPER-COMPONENT:LABEL:ENDING-DATE')}
            </div>
            <div className={b('row-value')}>
              {event.schedule.to.format(defaultDateAndTimeFormat)}
            </div>
          </div>
        </div>

        <div className={b('actions')}>
          <Button color="blue" onClick={this.handleGoToOpportunity}>
            {t('EVENT-POPPER-COMPONENT:ACTION:VIEW-EDIG')}
          </Button>
          <Button color="grey">
            {t('EVENT-POPPER-COMPONENT:ACTION:DELETE')}
          </Button>
        </div>

      </div>
    );
  }

  @bind
  private handleGoToOpportunity() {
    this.props.onGoToOpportunity(this.props.event.opportunityId);
  }
}

export default i18nConnect<IOwnProps>(EventPopperComponent);
