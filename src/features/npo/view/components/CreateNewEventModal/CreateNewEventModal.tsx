import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Modal } from 'services/modal';
import moment from 'moment';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createNewEventFormEntry } from 'features/npo/redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as NS from '../../../namespace';
import { Button, Label, Error } from 'shared/view/elements';
import {
  CheckboxFieldWrapper,
  InputBaseFieldWrapper,
  MarkdownEditorFieldWrapper, OpportunitySelectFieldWrapper, SelectNumberFieldWrapper,
} from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { CheckboxField, CountryField, InputBaseField, MarkdownEditorField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { CountryFieldWrapper, DatePickerFieldWrapper } from 'shared/view/redux-form/components';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { countryToAddressLocation } from 'shared/helpers/reactPlaceHelper';
import { IAddressLocation } from 'shared/types/requests/auth';
import { ICommunication } from 'shared/types/redux';
import { ISimpleOptionValue } from 'shared/view/elements/Select/Select';
import OpportunitySelectField from 'shared/view/redux-form/OpportunitySelectField/OpportunitySelectField';
import { $moment } from 'shared/helpers/moment';

import './CreateNewEventModal.scss';

interface IOwnProps {
  communication: ICommunication;
  currentValues: NS.ICreateNewEventForm;
  orgId: string;
  onClose(): void;
  onCreateNewEvent(values: NS.ICreateNewEventProps): void;
}

const b = block('create-new-event-modal');

const { name: formName, fieldNames } = createNewEventFormEntry;

const hoursFrequencyOptions: Array<ISimpleOptionValue<number>> = [
  { label: 'Per day', value: 1 },
  { label: 'per week', value: 7 }
];

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.ICreateNewEventForm, IOwnProps & ITranslateProps>;

class CreateNewEventModal extends React.PureComponent<TProps> {
  public componentDidMount() {
    this.props.initialize({
      hoursFrequency: hoursFrequencyOptions[0].value,
      hours: 8,
      startTime: moment().startOf('day').format(),
      endTime: moment().startOf('day').add(1, 'day').format(),
    });
  }

  public render() {
    const { communication } = this.props;
    return (
      <Modal
        isOpen
        disablePadding
        onClose={this.props.onClose}
      >
        <div className={b()}>
          <form onSubmit={this.handleCreateNewEvent}>
            {this.renderContent()}
            {communication.error && (
              <div className={b('error')}>
                <Error>{communication.error}</Error>
              </div>
            )}
            {this.renderActions()}
          </form>
        </div>
      </Modal>
    );
  }

  @bind
  private renderContent() {
    const { translate: t } = this.props;
    const currentValues = this.props.currentValues || {} as NS.ICreateNewEventForm;
    const isAllDay = currentValues.hasOwnProperty('isAllDay') ? currentValues.isAllDay : false;
    const hoursFrequency = currentValues.hoursFrequency || 1;
    return (
      <div className={b('content')}>
        <div className={b('title')}>
          <Label className={b('title-label')} htmlFor={fieldNames.title}>
            {t('CREATE-NEW-EVENT-MODAL:LABEL:TITLE')}
          </Label>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.title}
              validate={[required]}
            />
          </div>
        </div>

        <div className={b('block')}>
          <div className={b('row', { 'up-aligned': true })}>
            <div className={b('row-label')}>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:DESCRIPTION')}
            </div>
            <div className={b('row-field')}>
              <MarkdownEditorFieldWrapper
                noToolbar
                noStatus
                minHeight={'120px'}
                component={MarkdownEditorField}
                name={fieldNames.description}
                validate={[required]}
              />
            </div>
          </div>

          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:LOCATION')}
            </div>
            <div className={b('row-field')}>
              <CountryFieldWrapper
                component={CountryField}
                name={fieldNames.location}
                validate={[required]}
              />
            </div>
          </div>
        </div>

        <div className={b('block')}>
          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:OPPORTUNITY')}
            </div>
            <div className={b('row-field')}>
              <OpportunitySelectFieldWrapper
                component={OpportunitySelectField}
                name={fieldNames.opportunityId}
                orgId={this.props.orgId}
                validate={[required]}
              />
            </div>
          </div>
        </div>

        <div className={b('block')}>
          <div className={b('row', { 'with-checkbox': true })}>
            <div>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:ALL-DAY')}
            </div>
            <div className={b('row-field')}>
              <CheckboxFieldWrapper
                component={CheckboxField}
                name={fieldNames.isAllDay}
              />
            </div>
          </div>

          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:STARTING-DATE')}
            </div>
            <div className={b('row-field')}>
              <DatePickerFieldWrapper
                noIcon
                withTime={!isAllDay}
                name={fieldNames.startTime}
                validate={[required, this.validateStartDate]}
              />
            </div>
          </div>

          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:ENDING-DATE')}
            </div>
            <div className={b('row-field')}>
              <DatePickerFieldWrapper
                noIcon
                withTime={!isAllDay}
                name={fieldNames.endTime}
                validate={[required, this.validateEndDate]}
              />
            </div>
          </div>

          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('CREATE-NEW-EVENT-MODAL:LABEL:HOURS')}
            </div>
            <div className={b('row-field')}>
              <div className={b('hours-field')}>
                <InputBaseFieldWrapper
                  name={fieldNames.hours}
                  type="number"
                  component={InputBaseField}
                  validate={[required]}
                />

                <SelectNumberFieldWrapper
                  readonly
                  component={SelectField}
                  name={fieldNames.hoursFrequency}
                  options={hoursFrequencyOptions}
                />
              </div>
              <div className={b('hours-award-hint')}>
                {t('CREATE-NEW-EVENT-MODAL:STATIC:HOURS-AWARDED', {
                  quantum: hoursFrequency === 1 ? 'day' : 'week'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private renderActions() {
    const { translate: t, communication } = this.props;
    return (
      <div className={b('actions')}>
        <Button color="blue" type="submit" isShowPreloader={communication.isRequesting}>
          {t('SHARED:BUTTONS:SAVE')}
        </Button>
        <Button color="grey" onClick={this.handleCancelClicked}>
          {t('SHARED:BUTTONS:CANCEL')}
        </Button>
      </div>
    );
  }

  @bind
  private handleCreateNewEvent(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onCreateNewEvent } = this.props;

    handleSubmit(async data => {
      const location: IAddressLocation = await countryToAddressLocation(data.location);

      onCreateNewEvent({
        ...data,
        location,
        hours: parseInt(`${data.hours}`, 10)
      });

    })(e);
  }

  @bind
  private handleCancelClicked(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClose();
  }

  @bind
  private validateStartDate(
    value: string,
    allValues: NS.ICreateNewEventForm,
    props: TProps,
    name: string,
  ) {
    const { translate: t } = this.props;
    if ($moment(moment(value)).moreThan(moment(allValues.endTime))) {
      return t('CREATE-NEW-EVENT-MODAL:ERROR:START-DATE-LATER-THAN-END');
    }
  }

  @bind
  private validateEndDate(
    value: string,
    allValues: NS.ICreateNewEventForm,
    props: TProps,
    name: string,
  ) {
    const { translate: t } = this.props;
    if ($moment(moment(value)).lessThan(moment(allValues.startTime))) {
      return t('CREATE-NEW-EVENT-MODAL:ERROR:END-DATE-EARLIER-THAN-START');
    }
  }
}

const withForm = reduxForm<NS.ICreateNewEventForm, IOwnProps & ITranslateProps>({
  form: formName,
})(CreateNewEventModal);
export default i18nConnect<IOwnProps>(withForm);
