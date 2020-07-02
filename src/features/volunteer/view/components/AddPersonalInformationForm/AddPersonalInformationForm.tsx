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
import { Button, Error, Card } from 'shared/view/elements';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { DatePickerFieldWrapper } from 'shared/view/redux-form/components';
import { UploadPhotoComponent } from 'shared/view/components';
import { ICreateAccountRequest } from 'shared/types/requests/auth';
import { NBSP } from 'shared/types/app';

import './AddPersonalInformationForm.scss';

interface IOwnProps {
  communication: ICommunication;
  userAccount: ICreateAccountRequest;
  onSave(values: NS.IVolunteerPersonalInfoForm): void;
  onSkip(): void;
  onUpload(file: IImageFile): void;
}

interface IState {
  readony: boolean;
}

const b = block('add-personal-information-form');

const { name: formName, fieldNames } = addVolunteerPersonalInfoForm;

type TProps = IOwnProps & ITranslateProps
  & InjectedFormProps<NS.IVolunteerPersonalInfoForm, ITranslateProps & IOwnProps>;

class AddPersonalInformationForm extends React.PureComponent<TProps, IState> {
  public state: IState = {
    readony: true,
  };

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

        <form onSubmit={this.handleSubmitPersonalInfo} className={b('form')}>

          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('ADD-PERSONAL-INFORMATION-FORM:FIELD-NAME:PROFILE-PICTURE')}
            </div>
            <div className={b('row-fields')}>
              <div className={b('avatar')}>
                <UploadPhotoComponent onUpload={onUpload} />
              </div>
            </div>
          </div>

          <div className={b('row')}>
            <div className={b('row-label')}>
              {t('ADD-PERSONAL-INFORMATION-FORM:FIELD-NAME:SCHOOL')}
            </div>
            <div className={b('row-fields')}>
              <div className={b('field')}>
                <InputBaseFieldWrapper
                  component={InputBaseField}
                  name={fieldNames.school}
                  placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:SCHOOL')}
                  validate={[]}
                />
              </div>
            </div>
          </div>

          <div className={b('row')}>
            <div className={b('row-label')}/>
            <div className={b('row-fields')}>
              <Card
                header={(
                  <div className={b('card-header')}>
                    <div className={b('card-header-title')}>
                      {t('ADD-PERSONAL-INFORMATION-FORM:STATIC:YOUR-PROFILE')}
                    </div>
                    <div>
                      <Button
                        className={b('pencil-btn')}
                        color="grey"
                        size="small"
                        onClick={this.handleSwitchReadonlyMode}
                      >
                        {NBSP}
                        <i className={b('pencil zi zi-edit-pencil')}/>
                      </Button>
                    </div>
                  </div>
                )}
              >
                {this.renderCard(this.state.readony)}
              </Card>
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

  @bind
  private renderCard(readonly: boolean) {
    const { translate: t, userAccount } = this.props;
    return (
      <div className={b('readonly-card')}>
        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:FULL-NAME')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {readonly ? <>{userAccount.firstName} {userAccount.lastName}</> : (
              <div className={b('field')}>
                <InputBaseFieldWrapper
                  component={InputBaseField}
                  name={fieldNames.fullName}
                  placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:FULL-NAME')}
                  validate={[required]}
                />
              </div>
            )}

          </div>
        </div>

        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:EMAIL')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {readonly ? userAccount.email : (
              <div className={b('field')}>
                <InputBaseFieldWrapper
                  component={InputBaseField}
                  name={fieldNames.email}
                  type="email"
                  placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:EMAIL')}
                  validate={[required, validateEmail]}
                />
              </div>
            )}
          </div>
        </div>

        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:ADDRESS')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {readonly ? userAccount.zipCode : (
              <div className={b('field')}>
                <InputBaseFieldWrapper
                  component={InputBaseField}
                  name={fieldNames.address}
                  placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:ADDRESS')}
                  validate={[required]}
                />
              </div>
            )}
          </div>
        </div>

        <div className={b('readonly-card-row')}>
          <div className={b('readonly-card-row-label')}>
            {t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:BIRTHDAY')}
          </div>
          <div className={b('readonly-card-row-value')}>
            {readonly ? userAccount.dateOfBirth : (
              <div className={b('field')}>
                <DatePickerFieldWrapper
                  name={fieldNames.birthday}
                  placeholder={t('ADD-PERSONAL-INFORMATION-FORM:PLACEHOLDER:BIRTHDAY')}
                  validate={[required]}
                />
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  @bind
  private handleSwitchReadonlyMode(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ readony: !this.state.readony });
  }
}

const withForm = reduxForm<NS.IVolunteerPersonalInfoForm, ITranslateProps & IOwnProps>({
  form: formName,
})(AddPersonalInformationForm);
export default i18nConnect<IOwnProps>(withForm);
