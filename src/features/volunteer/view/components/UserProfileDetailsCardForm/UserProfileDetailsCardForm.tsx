import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { editProfileForm } from '../../../redux/reduxFormEntries';
import { IVolunteerPersonalInfoForm } from '../../../namespace';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { defaultDateFormat } from 'shared/types/app';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseField } from 'shared/view/redux-form';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { Label } from 'shared/view/elements';
import { CountryFieldWrapper, DatePickerFieldWrapper } from 'shared/view/redux-form/components';

import './UserProfileDetailsCardForm.scss';

interface IOwnProps {
  values: IVolunteerPersonalInfoForm;
  editMode: boolean;
}

const b = block('user-profile-details-card-form');

const { fieldNames } = editProfileForm;

type TProps = IOwnProps & ITranslateProps;

class UserProfileDetailsCardForm extends React.PureComponent<TProps> {
  public render() {
    const { editMode } = this.props;
    return (
      <div className={b()}>
        {editMode ? this.renderEditableCard() : this.renderReadonlyCard()}
      </div>
    );
  }

  @bind
  private renderReadonlyCard() {
    const { translate: t, values } = this.props;
    return (
      <div className={b('readonly-card')}>
        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:NAME')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {`${values.firstName} ${values.lastName}`}
          </div>
        </div>

        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:EMAIL')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {values.email}
          </div>
        </div>

        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:LOCATION')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {values.address.description}
          </div>
        </div>

        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:BIRTHDAY')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {moment(values.birthday).format(defaultDateFormat)}
          </div>
        </div>
      </div>
    );
  }

  @bind
  private renderEditableCard() {
    const { translate: t, values } = this.props;
    return (
      <div className={b('edit-card')}>
        <div className={b('edit-card-row')}>
          <Label htmlFor={fieldNames.firstName}>{t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:NAME')}</Label>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.firstName}
              // placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:FIRST-NAME')}
              validate={[required]}
            />
          </div>
        </div>
        <div className={b('edit-card-row')}>
          <Label htmlFor={fieldNames.lastName}>{t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:LAST-NAME')}</Label>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.lastName}
              // placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:LAST-NAME')}
              validate={[required]}
            />
          </div>
        </div>
        <div className={b('edit-card-row')}>
          <Label htmlFor={fieldNames.email}>{t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:EMAIL')}</Label>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.email}
              type="email"
              // placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:EMAIL')}
              validate={[required, validateEmail]}
            />
          </div>
        </div>
        <div className={b('edit-card-row')}>
          <Label htmlFor={fieldNames.email}>{t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:BIRTHDAY')}</Label>
          <div className={b('field')}>
            <DatePickerFieldWrapper
              name={fieldNames.birthday}
              // placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:BIRTHDAY')}
              validate={[required]}
            />
          </div>
        </div>
        <div className={b('edit-card-row')}>
          <Label htmlFor={fieldNames.email}>{t('USER-PROFILE-DETAILS-CARD-FORM:LABEL:LOCATION')}</Label>
          <div className={b('field')}>
            <CountryFieldWrapper
              name={fieldNames.address}
              initialValue={values.address ? values.address.description : undefined}
              // placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:ADDRESS')}
              validate={[required]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(UserProfileDetailsCardForm);
