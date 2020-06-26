import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import * as NS from '../../../namespace';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required } from 'shared/helpers/validators';
import { InputBaseFieldWrapper, MarkdownEditorFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createNewOrganizationEntry } from '../../../redux/reduxFormEntries';
import { InputBaseField, MarkdownEditorField } from 'shared/view/redux-form';
import { Button, Error, Label } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';

import './CreateNewOrganizationForm.scss';

interface IOwnProps {
  communication: ICommunication;
  onCreateNewOrganization(values: NS.ICreateNewOrganizationForm): void;
  onSkip(): void;
}

const b = block('create-new-organization-form');
const { name: formName, fieldNames } = createNewOrganizationEntry;

type TProps = IOwnProps & ITranslateProps &
  InjectedFormProps<NS.ICreateNewOrganizationForm, IOwnProps & ITranslateProps>;

class CreateNewOrganizationForm extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, error, communication, onSkip } = this.props;
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
              placeholder={t('CREATE-NEW-ORGANIZATION:PLACEHOLDER:ORGANIZATION-NAME')}
              validate={[required]}
            />
          </div>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.website}
              placeholder={t('CREATE-NEW-ORGANIZATION:PLACEHOLDER:WEBSITE')}
              validate={[]}
            />
          </div>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.address}
              placeholder={t('CREATE-NEW-ORGANIZATION:PLACEHOLDER:ADDRESS')}
              validate={[required]}
            />
          </div>

          <div className={b('field')}>
            <Label htmlFor={fieldNames.description}>
              {t('CREATE-NEW-ORGANIZATION:PLACEHOLDER:DESCRIPTION')}
            </Label>
            <MarkdownEditorFieldWrapper
              component={MarkdownEditorField}
              name={fieldNames.description}
              placeholder={t('CREATE-NEW-ORGANIZATION:PLACEHOLDER:DESCRIPTION')}
              validate={[]}
            />
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
            <Button color="blue" onClick={onSkip}>
              {t('SHARED:BUTTONS:SKIP')}
            </Button>

            <Button type="submit" color="blue" isShowPreloader={communication.isRequesting}>
              {t('SHARED:BUTTONS:NEXT')}
            </Button>
          </div>

        </form>
      </div>
    );
  }

  @bind
  private handleCreateNewOrganization(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onCreateNewOrganization } = this.props;

    handleSubmit(async data => {
      onCreateNewOrganization(data);
    })(e);
  }
}

const withForm = reduxForm<NS.ICreateNewOrganizationForm, IOwnProps & ITranslateProps>({
  form: formName,
})(CreateNewOrganizationForm);
export default i18nConnect<IOwnProps>(withForm);
