import React from 'react';
import block from 'bem-cn';
import { ICommunication } from 'shared/types/redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Select, Error } from 'shared/view/elements';
import { bind } from 'decko';

import './FillOrganizationTags.scss';

interface IOwnProps {
  communication: ICommunication;
  onSkip(): void;
  onNext(tags: string[]): void;
}

interface IState {
  tags: string[];
}

const b = block('fill-organization-tags');

type TProps = IOwnProps & ITranslateProps;

class FillOrganizationTags extends React.PureComponent<TProps, IState> {
  public state: IState = {
    tags: [],
  };

  public render() {
    const { translate: t, communication, onSkip } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('FILL-ORGANIZATION-TAGS:STATIC:CAPTION')}
        </div>
        <div className={b('subtitle')}>
          {t('FILL-ORGANIZATION-TAGS:STATIC:TITLE')}
        </div>

        <div className={b('field')}>
          <Select
            isMulti
            options={[
              'Recycling',
              'Forest Care',
              'Environment',
              'One',
              'Two',
              'Three',
            ]}
            onSelect={this.handleSelect}
          />
        </div>

        {communication.error && (
          <div className={b('error')}>
            <Error>{communication.error}</Error>
          </div>
        )}

        <div className={b('actions')}>
          <Button color="blue" onClick={onSkip}>
            {t('SHARED:BUTTONS:SKIP')}
          </Button>

          <Button color="blue" isShowPreloader={communication.isRequesting} onClick={this.handleNextButtonClicked}>
            {t('SHARED:BUTTONS:NEXT')}
          </Button>
        </div>
      </div>
    );
  }

  @bind
  private handleNextButtonClicked() {
    const { onNext } = this.props;

    onNext(this.state.tags);
  }

  @bind
  private handleSelect(value: string[] | null) {
    this.setState({ tags: value ? value : [] });
  }
}

export default i18nConnect<IOwnProps>(FillOrganizationTags);
