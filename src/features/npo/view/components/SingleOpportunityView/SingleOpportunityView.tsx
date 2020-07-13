import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { IOpportunityResponse, IOpportunityTagItem } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Image } from 'shared/view/elements';
import ReactMarkdown from 'react-markdown';

import './SingleOpportunityView.scss';

interface IOwnProps {
  opportunity: IOpportunityResponse;
}

const b = block('single-opportunity-view');

type TProps = IOwnProps & ITranslateProps;

class SingleOpportunityView extends React.PureComponent<TProps> {
  public render() {
    return (
      <div className={b()}>
        <div className={b('content')}>
          {this.renderImage()}
          {this.renderTags()}
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderRequirements()}
        </div>
      </div>
    );
  }

  @bind
  private renderImage() {
    const { opportunity } = this.props;

    if (!opportunity.profilePicture) {
      return null;
    }

    return (
      <div className={b('image-row')}>
        <Image className={b('image-row-image')} src={opportunity.profilePicture}/>
      </div>
    );
  }

  @bind
  private renderTags() {
    const { opportunity } = this.props;
    if (!opportunity.tags || opportunity.tags.length <= 0) {
      return null;
    }

    return (
      <div className={b('tags-row')}>
        {opportunity.tags.map((tag: IOpportunityTagItem, index: number) => {
          return (
            <div className={b('tags-row-item')} key={`tag-${index}`}>
              {tag.name}
            </div>
          );
        })}
      </div>
    );
  }

  @bind
  private renderTitle() {
    const { opportunity } = this.props;

    if (!opportunity.title) {
      return null;
    }

    return (
      <div className={b('title')}>
        {opportunity.title}
      </div>
    );
  }

  @bind
  private renderDescription() {
    const { translate: t, opportunity } = this.props;

    return (
      <div className={b('description')}>
        <div className={b('description-title')}>
          {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:TITLE:DESCRIPTION')}
        </div>
        <div className={b('description-value')}>
          <ReactMarkdown
            source={opportunity.description}
          />
        </div>
      </div>
    );
  }

  @bind
  private renderRequirements() {
    const { translate: t, opportunity } = this.props;
    const { ageLimit } = opportunity.requirements;

    if (!opportunity.requirements) {
      return null;
    }

    const rows = [];
    if (ageLimit.active) {

      if (ageLimit.from) {
        rows.push(
          <div className={b('requirements-row')} key={'age-from'}>
            {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:REQUIREMENTS:MIN-AGE-LIMIT', {
              years: ageLimit.from,
            })}
          </div>
        );
      }

      if (ageLimit.to) {
        rows.push(
          <div className={b('requirements-row')} key={'age-to'}>
            {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:REQUIREMENTS:MAX-AGE-LIMIT', {
              years: ageLimit.to,
            })}
          </div>
        );
      }

      if (ageLimit.from) {
        rows.push(
          <div className={b('requirements-row')} key={'min-age-restriction'}>
            {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:REQUIREMENTS:PARENTS-RESTRICTION-WARN')}
          </div>
        );
      }
    }

    return (
      <div className={b('requirements')}>
        <div className={b('requirements-title')}>
          {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:TITLE:REQUIREMENTS')}
        </div>
        <div className={b('requirements-content')}>
          {rows}
        </div>
      </div>
    );
  }

}

export default i18nConnect<IOwnProps>(SingleOpportunityView);
