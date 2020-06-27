import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import * as NS from '../../../namespace';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createPasswordFormEntry } from '../../../redux/reduxFormEntries';
import { InputBaseField } from 'shared/view/redux-form';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';

import './CreatePasswordForm.scss';

interface IOwnProps {
  communication: ICommunication;
  onCreatePassword(password: string): void;
}

const b = block('create-password-form');
const { name: formName, fieldNames } = createPasswordFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.ICreatePasswordForm, ITranslateProps & IOwnProps>;

class CreatePasswordForm extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, error, communication } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('CREATE-NEW-PASSWORD-FORM:STATIC:CAPTION')}
        </div>
        <form onSubmit={this.handleCreatePassword}>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.password}
              type="password"
              placeholder={t('CREATE-NEW-PASSWORD-FORM:PLACEHOLDER:PASSWORD')}
              validate={[required]}
            />
          </div>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.passwordRepeat}
              type="password"
              placeholder={t('CREATE-NEW-PASSWORD-FORM:PLACEHOLDER:PASSWORD-REPEAT')}
              validate={[required, this.validatePasswordRepeat]}
            />
          </div>

          <div className={b('spacer')}>
            <hr />
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
            <Button color="blue" isShowPreloader={communication.isRequesting}>
              {t('SHARED:BUTTONS:CONTINUE')}
            </Button>
          </div>

        </form>
      </div>
    );
  }

  @bind
  private validatePasswordRepeat(
    value: string,
    allValues?: NS.ICreatePasswordForm,
    props?: TProps,
    name?: string,
  ): string | undefined {
    const { translate: t } = this.props;
    const { password, passwordRepeat } = allValues || {};
    return password && passwordRepeat && password !== passwordRepeat ?
      t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-NOT-EQUALS')
      : undefined;
  }

  @bind
  private handleCreatePassword(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onCreatePassword } = this.props;

    handleSubmit(async data => {
      onCreatePassword(data.password);
    })(e);
  }
}

const withForm = reduxForm<NS.ICreatePasswordForm, ITranslateProps & IOwnProps>({
  form: formName,
})(CreatePasswordForm);
export default i18nConnect(withForm);
