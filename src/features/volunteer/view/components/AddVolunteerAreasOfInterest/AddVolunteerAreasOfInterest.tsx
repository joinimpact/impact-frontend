import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { addVolunteerAreasForm } from '../../../redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as NS from '../../../namespace';
import { InputBaseField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { Button, Error } from 'shared/view/elements';
import { bind } from 'decko';

import './AddVolunteerAreasOfInterest.scss';

interface IOwnProps {
  communication: ICommunication;
  onNext(interests: string[]): void;
  onSkip(): void;
}

interface IAreaOfInterestRecord {
  value: string;
  deleted: boolean;
}

interface IState {
  areas: IAreaOfInterestRecord[];
}

const b = block('add-volunteer-area-of-interest');

const { name: formName, fieldNames } = addVolunteerAreasForm;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.IInterestAreaForm, ITranslateProps & IOwnProps>;

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

        {this.renderAreas()}

        <form onSubmit={this.handleAddAreaOfInterest}>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.value}
              placeholder={t('ADD-VOLUNTEER-AREAS-OF-INTEREST:PLACEHOLDER:AREA-OF-INTEREST')}
              validate={[required, this.validateArea]}
            />
          </div>
        </form>

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

  @bind
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
  }

  @bind
  private renderAreas() {
    const { areas } = this.state;

    return (
      <div className={b('areas')}>
        {areas.map((area: IAreaOfInterestRecord, index: number) => {
          return (
            <div className={b('area', { deleted: area.deleted})} key={`area-${index}`}>
              <div className={b('area-caption')}>
                {area.value}
              </div>
              <div className={b('area-trash-icon')} onClick={this.handleRemoveArea.bind(this, area)}>
                <i className="zi-trash"/>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  @bind
  private handleRemoveArea(area: IAreaOfInterestRecord) {
    const { areas } = this.state;

    this.setState({
      areas: areas.map(item => {
        if (item.value === area.value) {
          return { ...item, deleted: true };
        }

        return item;
      })
    }, () => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.setState({
          areas: areas.filter(item => item.value !== area.value)
        });
      }, 200);
    });
  }

  @bind
  private handleAddAreaOfInterest(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit } = this.props;

    handleSubmit(async data => {
      this.setState({
        areas: this.state.areas.concat([{
          value: data.value,
          deleted: false,
        }])
      });
      this.props.reset();
    })(e);
  }

  @bind
  private handleNextButtonClicked() {
    this.props.onNext(this.state.areas.map(item => item.value));
  }
}

const withForm = reduxForm<NS.IInterestAreaForm, ITranslateProps & IOwnProps>({
  form: formName,
})(AddVolunteerAreasOfInterest);
export default i18nConnect<IOwnProps>(withForm);
