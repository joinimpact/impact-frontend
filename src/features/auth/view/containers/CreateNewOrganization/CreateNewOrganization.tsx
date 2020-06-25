import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import * as NS from '../../../namespace';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createNewOrganizationEntry } from '../../../redux/reduxFormEntries';
import { InputBaseField } from 'shared/view/redux-form';

const b = block('create-new-organization');
const { name: formName, fieldNames } = createNewOrganizationEntry;

type TProps = ITranslateProps & InjectedFormProps<NS.ICreateNewOrganizationForm, ITranslateProps>;

class CreateNewOrganization extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('CREATE-NEW-ORGANIZATION:STATIC:CAPTION')}
        </div>
        <form onSubmit={this.handleCreateNewOrganization}>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.organizationName}
              type="password"
              placeholder={t('CREATE-NEW-PASSWORD-FORM:PLACEHOLDER:PASSWORD')}
              validate={[required]}
            />
          </div>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.website}
              type="password"
              placeholder={t('CREATE-NEW-PASSWORD-FORM:PLACEHOLDER:PASSWORD')}
              validate={[required]}
            />
          </div>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.address}
              type="password"
              placeholder={t('CREATE-NEW-PASSWORD-FORM:PLACEHOLDER:PASSWORD')}
              validate={[required]}
            />
          </div>
        </form>
      </div>
    );
  }

  @bind
  private handleCreateNewOrganization(e: React.FormEvent<HTMLFormElement>) {
    console.log('[handleCreateNewOrganization]');
  }
}

const withForm = reduxForm<NS.ICreateNewOrganizationForm, ITranslateProps>({
  form: formName,
})(CreateNewOrganization);
export default i18nConnect<{}>(withForm);
