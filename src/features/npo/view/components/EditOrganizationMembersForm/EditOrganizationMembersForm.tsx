import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { makeReduxFormEntry } from 'shared/util/redux';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { required, validateEmail } from 'shared/helpers/validators';
import { Button, Card, Error } from 'shared/view/elements';
import { SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';

import './EditOrganizationMembersForm.scss';

interface IOwnProps {
  communication: ICommunication;
  onSave(emails: string[]): void;
}

interface IFormProps {
  members: string[];
}

interface IMemberRecord {
  value: string;
  deleted: boolean;
}

interface IState {
  members: IMemberRecord[];
}

const b = block('edit-opportunity-members-form');
const { name: formName, fieldNames } = makeReduxFormEntry<IFormProps>('editOrganizationMembersForm', [
  'members'
]);

type TComponentProps = IOwnProps & ITranslateProps;
type TProps = TComponentProps & InjectedFormProps<IFormProps, TComponentProps>;

class EditOrganizationMembersForm extends React.PureComponent<TProps, IState> {
  public state: IState = {
    members: [],
  };

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
                  isCreatable
                  disabledDropdown
                  component={SelectField}
                  name={fieldNames.members}
                  placeholder={t('INVITE-TEAM-MEMBERS-FORM:PLACEHOLDER:EMAIL')}
                  onSelect={this.handleSelect}
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
              <Button color="blue" isShowPreloader={this.props.communication.isRequesting}>
                {t('SHARED:BUTTONS:CONTINUE')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  @bind
  private async handleSelect(values: string | string[]) {
    if (!values) {
      return values;
    }

    const lastValue = values.length ? values[values.length - 1] : null;
    if (!lastValue) {
      return values;
    }

    let error = validateEmail(lastValue);
    if (error) {
      throw error;
    }

    error = this.validateMember(lastValue);
    if (error) {
      throw error;
    }

    return values;
  }

  @bind
  private validateMember(value: string) {
    const { translate: t } = this.props;
    const { members } = this.state;

    if (members.find(member => member.value === value)) {
      return t('INVITE-TEAM-MEMBERS-FORM:ERROR:EMAIL-EXISTS');
    }

    return;
  }

  @bind
  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onSave } = this.props;

    handleSubmit(async data => {
      onSave(data.members);
    })(e);
  }
}

const withForm = reduxForm<IFormProps, TComponentProps>({
  form: formName,
})(EditOrganizationMembersForm);
export default i18nConnect<IOwnProps>(withForm);
