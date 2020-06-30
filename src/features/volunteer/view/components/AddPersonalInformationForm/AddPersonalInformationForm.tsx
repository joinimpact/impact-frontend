import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { addVolunteerPersonalInfoForm } from '../../../redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as NS from '../../../namespace';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { DatePickerFieldWrapper } from 'shared/view/redux-form/components';
import { UploadPhotoComponent } from 'shared/view/components';
import { ICreateAccountRequest } from 'shared/types/requests/auth';
import EditableLabelField from 'shared/view/redux-form/EditableLabelField/EditableLabelField';

import './AddPersonalInformationForm.scss';

interface IOwnProps {
  communication: ICommunication;
  userAccount: ICreateAccountRequest;
  onSave(values: NS.IVolunteerPersonalInfoForm): void;
  onSkip(): void;
  onUpload(file: IImageFile): void;
}

const b = block('add-personal-information-form');

const { name: formName, fieldNames } = addVolunteerPersonalInfoForm;

type TProps = IOwnProps & ITranslateProps
  & InjectedFormProps<NS.IVolunteerPersonalInfoForm, ITranslateProps & IOwnProps>;

class AddPersonalInformationForm extends React.PureComponent<TProps> {
  public componentDidMount() {
    const { userAccount } = this.props;
    this.props.initialize({
      address: userAccount.zipCode,
      email: userAccount.email,
      fullName: `${userAccount.firstName} ${userAccount.lastName}`,
      birthday: userAccount.dateOfBirth,
    });
  }

  public render() {
    const { translate: t, communication, error, onSkip, onUpload } = this.props;
    return (
      <div className={b()}>

        <div className={b('caption')}>
          {t('ADD-PERSONAL-INFORMATION-FORM:STATIC:CAPTION')}
        </div>
        <div className={b('info')}>
          {t('ADD-PERSONAL-INFORMATION-FORM:STATIC:INFO')}
        </div>
        <div className={b('subtitle')}>
          {t('ADD-PERSONAL-INFORMATION-FORM:STATIC:SUBTITLE')}
        </div>

        <div className={b('avatar')}>
          <UploadPhotoComponent
            onUpload={onUpload}
          />
        </div>

        <form onSubmit={this.handleSubmitPersonalInfo} className={b('form')}>
          <div className={b('fields')}>
            <div className={b('field')}>
              <InputBaseFieldWrapper
                component={EditableLabelField}
                name={fieldNames.fullName}
                placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:FULL-NAME')}
                validate={[required]}
              />
            </div>
            <div className={b('field')}>
              <InputBaseFieldWrapper
                component={EditableLabelField}
                name={fieldNames.email}
                type="email"
                placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:EMAIL')}
                validate={[required, validateEmail]}
              />
            </div>
            <div className={b('field')}>
              <InputBaseFieldWrapper
                component={EditableLabelField}
                name={fieldNames.address}
                placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:ADDRESS')}
                validate={[required]}
              />
            </div>
            <div className={b('field')}>
              <DatePickerFieldWrapper
                asEditableLabel
                name={fieldNames.birthday}
                placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:BIRTHDAY')}
                validate={[required]}
              />
            </div>

            <div className={b('field')}>
              <InputBaseFieldWrapper
                component={InputBaseField}
                name={fieldNames.school}
                placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:SCHOOL')}
                validate={[]}
              />
            </div>
          </div>

          {error && (
            <div className={b('error')}>
              <Error>{error}</Error>
            </div>
          )}

          {communication.error && (
            <div className={b('error')}>
              <Error>{communication.error}</Error>
            </div>
          )}

          <div className={b('actions')}>
            <Button color="grey" onClick={onSkip}>
              {t('SHARED:BUTTONS:SKIP')}
            </Button>

            <Button color="blue" type="submit" isShowPreloader={communication.isRequesting}>
              {t('SHARED:BUTTONS:NEXT')}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  @bind
  private handleSubmitPersonalInfo(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onSave } = this.props;

    handleSubmit(async data => {
      onSave(data);
    })(e);
  }
}

const withForm = reduxForm<NS.IVolunteerPersonalInfoForm, ITranslateProps & IOwnProps>({
  form: formName,
})(AddPersonalInformationForm);
export default i18nConnect<IOwnProps>(withForm);
