import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Button, Card, Error } from 'shared/view/elements';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { required } from 'shared/helpers/validators';
import { SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { ICommunication } from 'shared/types/redux';
import { makeReduxFormEntry } from 'shared/util/redux';

import './EditOpportunityTagsForm.scss';

interface IOwnProps {
  communication: ICommunication;
  tags: string[];
  onSave(tags: string[]): void;
  onGoToNext(): void;
}

interface IFormProps {
  tags: string[];
}

const b = block('edit-organization-tags-form');
const { name: formName, fieldNames } = makeReduxFormEntry<IFormProps>('editOrganizationTagsForm', ['tags']);

type TComponentProps = IOwnProps & ITranslateProps;
type TProps = TComponentProps & InjectedFormProps<IFormProps, TComponentProps>;

class EditOrganizationTagsForm extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, error, communication } = this.props;
    return (
      <div className={b()}>
        <div className={b('content')}>
          <form onSubmit={this.handleSubmit}>
            <Card
              className={b('card')}
              title={t('EDIT-ORGANIZATION-TAGS-FORM:STATIC:TITLE')}
              footer={t('EDIT-ORGANIZATION-TAGS-FORM:CARD:FOOTER')}
            >
              <div className={b('card-body')}>{t('EDIT-ORGANIZATION-TAGS-FORM:CARD:BODY')}</div>
              <div className={b('field')}>
                <SelectFieldWrapper
                  isMulti
                  component={SelectField}
                  name={fieldNames.tags}
                  placeholder={t('EDIT-ORGANIZATION-TAGS-FORM:PLACEHOLDER:SELECT-TAGS')}
                  options={this.props.tags}
                  validate={[required]}
                />
              </div>
            </Card>
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
              <Button
                color="blue"
                isShowPreloader={this.props.communication.isRequesting}
                onClick={this.props.onGoToNext}
              >
                {t('SHARED:BUTTONS:CONTINUE')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  @bind
  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onSave } = this.props;

    handleSubmit(async data => {
      onSave(data.tags);
    })(e);
  }
}

const withForm = reduxForm<IFormProps, TComponentProps>({
  form: formName,
})(EditOrganizationTagsForm);
export default i18nConnect<IOwnProps>(withForm);
