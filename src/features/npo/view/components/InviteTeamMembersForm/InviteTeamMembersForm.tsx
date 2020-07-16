import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';
import { inviteTeamFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import { InjectedFormProps, reduxForm } from 'redux-form';
// import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { /*InputBaseFieldWrapper, */SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';

import './InviteTeamMembersForm.scss';

interface IOwnProps {
  communication: ICommunication;
  onSkip(): void;
  onNext(members: string[]): void;
}

interface IMemberRecord {
  value: string;
  deleted: boolean;
}

interface IState {
  members: IMemberRecord[];
}

const b = block('invite-team-members-form');

const { name: formName, fieldNames } = inviteTeamFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.IInviteTeamForm, ITranslateProps & IOwnProps>;

class InviteTeamMembersForm extends React.PureComponent<TProps, IState> {
  public state: IState = {
    members: [],
  };

  public render() {
    const { translate: t, communication, } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('INVITE-TEAM-MEMBERS-FORM:STATIC:CAPTION')}
        </div>
        <div className={b('subtitle')}>
          {t('INVITE-TEAM-MEMBERS-FORM:STATIC:TITLE')}
        </div>

        <div className={b('team-label')}>
          {t('INVITE-TEAM-MEMBERS-FORM:STATIC:TEAM')}
        </div>
        {this.state.members.length === 0 && (
          <div className={b('team-sublabel')}>
            {t('INVITE-TEAM-MEMBERS-FORM:STATIC:TEAM-PLACEHOLDER')}
          </div>
        )}

        <form onSubmit={this.handleSubmitTeamMembers}>
          <div className={b('field')}>
            <SelectFieldWrapper
              isMulti
              isCreatable
              disabledDropdown
              component={SelectField}
              name={fieldNames.email}
              placeholder={t('INVITE-TEAM-MEMBERS-FORM:PLACEHOLDER:EMAIL')}
              onSelect={this.handleSelect}
              validate={[required]}
            />
          </div>

          {communication.error && (
            <div className={b('error')}>
              <Error>{communication.error}</Error>
            </div>
          )}

          <div className={b('actions')}>
            <Button color="grey" onClick={this.handleSkipButtonClicked}>
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
  private handleSkipButtonClicked(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onSkip();
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
  private handleSubmitTeamMembers(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit } = this.props;

    handleSubmit(async data => {
      this.props.onNext(data.email);
    })(e);
  }
}

const withForm = reduxForm<NS.IInviteTeamForm, ITranslateProps & IOwnProps>({
  form: formName,
})(InviteTeamMembersForm);
export default i18nConnect<IOwnProps>(withForm);
