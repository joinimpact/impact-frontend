import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { Button, Error, Select } from 'shared/view/elements';

import './AddVolunteerAreasOfInterest.scss';

interface IOwnProps {
  communication: ICommunication;
  tags: string[];
  onNext(interests: string[]): void;
  onSkip(): void;
}

interface IState {
  areas: string[];
}

const b = block('add-volunteer-area-of-interest');

type TProps = IOwnProps & ITranslateProps;

class AddVolunteerAreasOfInterest extends React.PureComponent<TProps, IState> {
  public state: IState = {
    areas: [],
  };

  public render() {
    const { translate: t, communication, onSkip } = this.props;

    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('ADD-VOLUNTEER-AREAS-OF-INTEREST:STATIC:CAPTION')}
        </div>
        <div className={b('title')}>
          {t('ADD-VOLUNTEER-AREAS-OF-INTEREST:STATIC:TITLE')}
        </div>
        <div className={b('subtitle')}>
          {t('ADD-VOLUNTEER-AREAS-OF-INTEREST:STATIC:SUBTITLE')}
        </div>

        <div className={b('field')}>
          <Select
            isMulti
            options={this.tags}
            onSelect={this.handleSelectTag}
          />
        </div>

        {communication.error && (
          <div className={b('error')}>
            <Error>{communication.error}</Error>
          </div>
        )}

        <div className={b('actions')}>
          <Button color="grey" onClick={onSkip}>
            {t('SHARED:BUTTONS:SKIP')}
          </Button>

          <Button color="blue" isShowPreloader={communication.isRequesting} onClick={this.handleNextButtonClicked}>
            {t('SHARED:BUTTONS:NEXT')}
          </Button>
        </div>
      </div>
    );
  }

  /*@bind
  private validateArea(
    value: string,
    allValues?: NS.IInterestAreaForm,
    props?: TProps,
    name?: string,
  ) {
    const { translate: t } = this.props;
    const { areas } = this.state;

    if (areas.find(area => area.value === value)) {
      return t('ADD-VOLUNTEER-AREAS-OF-INTEREST:ERROR:AREA-ALREADY-EXISTS');
    }

    return;
  }*/

  @bind
  private handleNextButtonClicked() {
    this.props.onNext(this.state.areas);
  }

  @bind
  private handleSelectTag(tags: string[] | null) {
    this.setState({ areas: tags ? tags : [] });
  }

  private get tags() {
    return this.props.tags;
  }
}

export default i18nConnect<IOwnProps>(AddVolunteerAreasOfInterest);
