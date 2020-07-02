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
  // -------------- debug secion ----------
  // TODO: REMOVE BEFORE COMMIT!
  /*public componentDidMount() {
    this.props.initialize({
      password: 'Qweqwe_1!',
      passwordRepeat: 'Qweqwe_1!'
    });
  }*/
  // --------------------------------------

  public render() {
    const { translate: t, error, communication, invalid } = this.props;
    return (
      <div className={b()}>
        <form onSubmit={this.handleCreatePassword} className={b('form')}>
          <div className={b('content')}>

            <div className={b('row')}>
              <div className={b('asterisk')}>*</div>
              <div className={b('field-caption')}>
                {t('CREATE-NEW-PASSWORD-FORM:LABEL:CREATE-PASSWORD')}
              </div>
              <div className={b('field-hint')}>
                {t('CREATE-NEW-PASSWORD-FORM:HINT:PASSWORD-COMPLEXITY')}
              </div>
              <div className={b('field')}>
                <InputBaseFieldWrapper
                  component={InputBaseField}
                  name={fieldNames.password}
                  type="password"
                  placeholder={t('CREATE-NEW-PASSWORD-FORM:PLACEHOLDER:PASSWORD')}
                  validate={[required, this.validatePasswordComplexity]}
                />
              </div>
            </div>
            <div className={b('row')}>
              <div className={b('asterisk')}>*</div>
              <div className={b('field-caption')}>
                {t('CREATE-NEW-PASSWORD-FORM:LABEL:CONFIRM-YOUR-PASSWORD')}
              </div>
              <div className={b('field-hint')}>
                {t('CREATE-NEW-PASSWORD-FORM:HINT:PASSWORD-REPEAT')}
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

            <div className={b('footer')}>
              {t('CREATE-NEW-PASSWORD-FORM:LABEL:PASSWORD-LENGTH-HINT', {
                num: 512
              })}
            </div>
          </div>

          <div className={b('actions')}>
            <Button
              color="blue"
              disabled={invalid}
              isShowPreloader={communication.isRequesting}
            >
              {t('SHARED:BUTTONS:CONTINUE')}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  @bind
  private validatePasswordComplexity(
    value: string,
    allValues?: NS.ICreatePasswordForm,
    props?: TProps,
    name?: string,
  ) {
    const { translate: t } = this.props;

     // Test for min length
    if (value.length < 8) {
      return t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-TOO-SHORT');
    }

    // Test for max length
    if (value.length > 512) {
      return t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-TOO-LONG');
    }

    // Test for capital letter
    if (!/[A-Z]/.test(value)) {
      return t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-CAPITAL-LETTER');
    }

    // Test for letters
    if (!/[a-z]/.test(value)) {
      return t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-LETTER');
    }

    // Test for numbers
    if (!/[0-9]/.test(value)) {
      return t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-NUMBER-NOT-FOUND');
    }

    // Test for symbols
    if (!/\W/.test(value)) {
      return t('CREATE-NEW-PASSWORD-FORM:ERROR:PASSWORD-SYMBOL-NOT-FOUND');
    }
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
