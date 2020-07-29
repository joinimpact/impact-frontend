import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Card, Error } from 'shared/view/elements';
import { bind } from 'decko';
import { inviteTeamFormEntry } from 'features/npo/redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as NS from 'features/npo/namespace';
import { required, validateEmail } from 'shared/helpers/validators';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { ICommunication } from 'shared/types/redux';
import { SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';

import './InviteTeamMembersModal.scss';

interface IOwnProps {
  communication: ICommunication;
  onClose(): void;
  onInvite(emails: string[]): void;
}

interface IState {
  members: string[];
}

const b = block('invite-team-members-modal');

const { name: formName, fieldNames } = inviteTeamFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.IInviteTeamForm, ITranslateProps & IOwnProps>;

class InviteTeamMembersModal extends React.PureComponent<TProps, IState> {
  public state: IState = {
    members: [],
  };

  public render() {
    const { translate: t, communication } = this.props;
    return (
      <Modal
        isOpen
        disablePadding
        disableCard
        onClose={this.props.onClose}
      >
        <div className={b()}>
          <form onSubmit={this.handleSubmitTeamMembers}>
            <Card
              noShadow
              footer={this.renderFooter()}
              title={t('INVITE-TEAM-MEMBERS-MODAL:STATIC:TITLE')}
            >
                <div className={b('body')}>{t('INVITE-TEAM-MEMBERS-MODAL:STATIC:BODY')}</div>

                <div className={b('field')}>
                  <SelectFieldWrapper
                    isMulti
                    isCreatable
                    disabledDropdown
                    component={SelectField}
                    name={fieldNames.email}
                    placeholder={t('INVITE-TEAM-MEMBERS-MODAL:PLACEHOLDER:FIELD')}
                    onSelect={this.handleSelect}
                    validate={[required]}
                  />
                </div>

                {communication.error && (
                  <div className={b('error')}>
                    <Error>{communication.error}</Error>
                  </div>
                )}
            </Card>
          </form>
        </div>
      </Modal>
    );
  }

  @bind
  private renderFooter() {
    const { translate: t, communication } = this.props;
    return (
      <div className={b('footer')}>
        <div className={b('footer-info')}>
          {t('INVITE-TEAM-MEMBERS-MODAL:STATIC:FOOTER')}
        </div>
        <div className={b('footer-actions')}>
          <Button color="light-black" onClick={this.handleCloseClicked}>
            {t('SHARED:BUTTONS:CLOSE')}
          </Button>
          <Button color="blue" type="submit" isShowPreloader={communication.isRequesting}>
            {t('INVITE-TEAM-MEMBERS-MODAL:ACTION:ADD')}
          </Button>
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

    if (members.find(member => member === value)) {
      return t('INVITE-TEAM-MEMBERS-FORM:ERROR:EMAIL-EXISTS');
    }

    return;
  }

  @bind
  private handleSubmitTeamMembers(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit } = this.props;

    handleSubmit(async data => {
      this.props.onInvite(data.email);
    })(e);
  }

  @bind
  private handleCloseClicked(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClose();
  }
}

const withForm = reduxForm<NS.IInviteTeamForm, ITranslateProps & IOwnProps>({
  form: formName,
})(InviteTeamMembersModal);
export default i18nConnect<IOwnProps>(withForm);
