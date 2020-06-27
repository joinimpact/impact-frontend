import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';
import { inviteTeamFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from 'features/auth/namespace';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { InputBaseField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';

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
    const { translate: t, communication, onSkip } = this.props;
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
        {this.renderMembers()}

        <form onSubmit={this.handleAddEmail}>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.email}
              type="email"
              placeholder={t('INVITE-TEAM-MEMBERS-FORM:PLACEHOLDER:EMAIL')}
              validate={[required, this.validateMember]}
            />
          </div>
        </form>

        {communication.error && (
          <div className={b('error')}>
            <Error>{communication.error}</Error>
          </div>
        )}

        <div className={b('actions')}>
          <Button color="blue" onClick={onSkip}>
            {t('SHARED:BUTTONS:SKIP')}
          </Button>

          <Button color="blue" isShowPreloader={communication.isRequesting} onClick={this.handleNextButtonClicked}>
            {t('SHARED:BUTTONS:NEXT')}
          </Button>
        </div>
      </div>
    );
  }

  @bind
  private validateMember(
    value: string,
    allValues?: NS.IInviteTeamForm,
    props?: TProps,
    name?: string,
  ) {
    const { translate: t } = this.props;
    const { members } = this.state;

    if (members.find(member => member.value === value)) {
      return t('INVITE-TEAM-MEMBERS-FORM:ERROR:EMAIL-EXISTS');
    }

    return;
  }

  @bind
  private renderMembers() {
    const { members } = this.state;

    return (
      <div className={b('members')}>
        {members.map((member: IMemberRecord, index: number) => {
          return (
            <div className={b('member', { deleted: member.deleted })} key={`member-${index}`}>
              <div className={b('member-caption')}>
                {member.value}
              </div>
              <div className={b('member-trash-icon')} onClick={this.handleRemoveMember.bind(this, member)}>
                <i className="zi-trash"/>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  @bind
  private handleRemoveMember(member: IMemberRecord) {
    const { members } = this.state;

    this.setState({
      members: members.map( item => {
        if (item.value === member.value) {
          return { ...item, deleted: true };
        }
        return item;
      })
    }, () => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.setState({ members: members.filter(item => item.value !== member.value) });
      }, 200);
    });
  }

  @bind
  private handleAddEmail(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit } = this.props;

    handleSubmit(async data => {
      this.setState({
        members: this.state.members.concat([{
          value: data.email,
          deleted: false,
        }])
      });
      this.props.reset();
    })(e);
  }

  @bind
  private handleNextButtonClicked() {
    this.props.onNext(this.state.members.map(item => item.value));
  }
}

const withForm = reduxForm<NS.IInviteTeamForm, ITranslateProps & IOwnProps>({
  form: formName,
})(InviteTeamMembersForm);
export default i18nConnect<IOwnProps>(withForm);
