import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createNewEventFormEntry } from 'features/npo/redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as NS from '../../../namespace';
import { Label } from 'shared/view/elements';
import {
  CheckboxFieldWrapper,
  InputBaseFieldWrapper,
  MarkdownEditorFieldWrapper, SelectFieldWrapper,
} from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { CheckboxField, CountryField, InputBaseField, MarkdownEditorField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { CountryFieldWrapper, DatePickerFieldWrapper } from 'shared/view/redux-form/components';

import './CreateNewEventModal.scss';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';

interface IOwnProps {
  onClose(): void;
}

const b = block('create-new-event-modal');

const { name: formName, fieldNames } = createNewEventFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.ICreateNewEventForm, IOwnProps & ITranslateProps>;

class CreateNewEventModal extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <Modal
        isOpen
        disablePadding
        onClose={this.props.onClose}
      >
        <div className={b()}>
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
                  minHeight={'147px'}
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
                <InputBaseFieldWrapper
                  component={InputBaseField}
                  name={fieldNames.opportunity}
                  validate={[required]}
                />
              </div>
            </div>
          </div>

          <div className={b('block')}>
            <div className={b('row')}>
              <div className={b('row-label')}>
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
                  name={fieldNames.startTime}
                />
              </div>
            </div>

            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('CREATE-NEW-EVENT-MODAL:LABEL:ENDING-DATE')}
              </div>
              <div className={b('row-field')}>
                <DatePickerFieldWrapper
                  name={fieldNames.endTime}
                />
              </div>
            </div>

            <div className={b('row')}>
              <div className={b('row-label')}>
                {t('CREATE-NEW-EVENT-MODAL:LABEL:HOURS')}
              </div>
              <div className={b('row-field')}>
                <InputBaseFieldWrapper
                  name={fieldNames.hours}
                  component={InputBaseField}
                />

                <SelectFieldWrapper
                  component={SelectField}
                  name={fieldNames.hoursQuantum}
                  options={[
                    t('CREATE-NEW-EVENT-MODAL:QUANTUM:PER-DAY'),
                    t('CREATE-NEW-EVENT-MODAL:QUANTUM:PER-WEEK')
                  ]}
                />
              </div>
            </div>
          </div>

        </div>
      </Modal>
    );
  }
}

const withForm = reduxForm<NS.ICreateNewEventForm, IOwnProps & ITranslateProps>({
  form: formName,
})(CreateNewEventModal);
export default i18nConnect<IOwnProps>(withForm);
