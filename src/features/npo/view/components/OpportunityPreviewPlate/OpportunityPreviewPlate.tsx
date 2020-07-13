import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Button, Image } from 'shared/view/elements';
import { IOpportunityResponse, IOpportunityTagItem } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './OpportunityPreviewPlate.scss';

const b = block('opportunity-preview-plate');

interface IOwnProps {
  opportunity: IOpportunityResponse;
  onViewOpportunity(opportunity: IOpportunityResponse): void;
  onOpenApplications(opportunity: IOpportunityResponse): void;
  onCloseApplications(opportunity: IOpportunityResponse): void;
}

type TOpportunityState = 'accepting' | 'closed';

type TProps = IOwnProps & ITranslateProps;

class OpportunityPreviewPlate extends React.PureComponent<TProps> {
  public render() {
    const { opportunity, translate: t } = this.props;
    const picUrl =
      opportunity.profilePicture;
      // || 'https://cdn.joinimpact.org/opportunity-picture-1281690192863825920-1594413736.png';

    return (
      <div className={b()}>
        {picUrl && (
          <div className={b('image')}>
            <Image src={picUrl}/>
          </div>
        )}
        {this.renderTags()}
        <div className={b('title')}>
          {opportunity.title}
        </div>
        <div className={b('cap-limit')}>
          {t('OPPORTUNITY-PREVIEW-PLATE:CAP-LIMIT:ACCEPTED', {
            accepted: 0,
            limit: opportunity.limits.volunteersCap.cap,
          })}
        </div>
        <div className={b('status')}>
          {this.renderStatus()}
        </div>
        <div className={b('actions')}>
          <Button color="blue" onClick={this.props.onViewOpportunity.bind(this, opportunity)}>
            {t('OPPORTUNITY-PREVIEW-PLATE:BUTTONS:VIEW')}
          </Button>
          {opportunity.public ? (
            <Button color="grey" onClick={this.props.onCloseApplications.bind(this, opportunity)}>
              {t('OPPORTUNITY-PREVIEW-PLATE:BUTTONS:CLOSE-APPLICATIONS')}
            </Button>
          ) : (
            <Button color="grey" onClick={this.props.onOpenApplications.bind(this, opportunity)}>
              {t('OPPORTUNITY-PREVIEW-PLATE:BUTTONS:OPEN-APPLICATIONS')}
            </Button>
          )}
        </div>
      </div>
    );
  }

  @bind
  private renderStatus() {
    const { opportunity } = this.props;

    const status: TOpportunityState = opportunity.public ? 'accepting' : 'closed';
    const statusTest = this.statusText;

    return (
      <div className={b('status-row')}>
        <div className={b('status-icon', { [status]: true })}/>
        <div className={b('status-label')}>
          {statusTest}
        </div>
      </div>
    );
  }

  @bind
  private renderTags() {
    const { opportunity } = this.props;

    if (!opportunity.tags || !opportunity.tags.length) {
      return null;
    }

    return (
      <div className={b('tags')}>
        {opportunity.tags.map((tag: IOpportunityTagItem, index: number) => {
          return (
            <div className={b('tags-value')} key={`value-${index}`}>
              {tag.name}
            </div>
          );
        })}
      </div>
    );
  }

  private get statusText() {
    const { translate: t } = this.props;
    if (this.props.opportunity.public) {
      return t('OPPORTUNITY-PREVIEW-PLATE:STATUS:ACCEPTING');
    }

    return t('OPPORTUNITY-PREVIEW-PLATE:STATUS:CLOSED');
  }
}

export default i18nConnect<IOwnProps>(OpportunityPreviewPlate);
