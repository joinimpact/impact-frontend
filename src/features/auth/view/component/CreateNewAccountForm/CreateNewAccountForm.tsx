import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import { createNewAccountFormEntry } from '../../../redux/reduxFormEntries';
import { Button, Error } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { DatePickerFieldWrapper } from 'shared/view/redux-form/components';

import './CreateNewAccountForm.scss';

interface IOwnProps {
  communication: ICommunication;
  onCreateAccount(values: NS.ICreateAccountForm): void;
}

const b = block('create-new-account-form');
const { name: formName, fieldNames } = createNewAccountFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.ICreateAccountForm, ITranslateProps & IOwnProps>;

class CreateNewAccountForm extends React.PureComponent<TProps> {
  public componentDidMount() {
    const dt = moment().subtract(5, 'days');
    this.props.initialize({
      [fieldNames.birthday]: dt.toDate(),
    });
  }

  public render() {
    const { translate: t, communication, error } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('CREATE-NEW-ACCOUNT-FORM:STATIC:CAPTION')}
        </div>
        <form className={b('form')} onSubmit={this.handleCreateAccount}>
          <div className={b('form-content')}>
            {this.renderLeftPart()}
            {this.renderRightPart()}
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

          <div className={b('form-actions')}>
            <Button color="blue" isShowPreloader={communication.isRequesting}>
              {t('SHARED:BUTTONS:CONTINUE')}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  @bind
  private renderLeftPart() {
    const { translate: t } = this.props;
    return (
      <div className={b('left')}>
        <div className={b('field')}>
          <InputBaseFieldWrapper
            component={InputBaseField}
            name={fieldNames.firstName}
            placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:FIRST-NAME')}
            validate={[required]}
          />
        </div>
        <div className={b('field')}>
          <InputBaseFieldWrapper
            component={InputBaseField}
            name={fieldNames.lastName}
            placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:LAST-NAME')}
            validate={[required]}
          />
        </div>
        <div className={b('field')}>
          <InputBaseFieldWrapper
            component={InputBaseField}
            name={fieldNames.email}
            placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:EMAIL')}
            type="email"
            validate={[required, validateEmail]}
          />
        </div>
      </div>
    );
  }

  @bind
  private renderRightPart() {
    const { translate: t } = this.props;
    return (
      <div className={b('right')}>
        <div className={b('field')}>
          <DatePickerFieldWrapper
            name={fieldNames.birthday}
            placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:BIRTHDAY')}
            validate={[required]}
          />
        </div>
        <div className={b('field')}>
          <InputBaseFieldWrapper
            component={InputBaseField}
            name={fieldNames.address}
            placeholder={t('CREATE-NEW-ACCOUNT-FORM:PLACEHOLDER:ADDRESS')}
            validate={[required]}
          />
        </div>
      </div>
    );
  }

  @bind
  private handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onCreateAccount } = this.props;

    handleSubmit(async data => {
      onCreateAccount(data);
    })(e);
  }
}

const withForm = reduxForm<NS.ICreateAccountForm, ITranslateProps & IOwnProps>({
  form: formName,
})(CreateNewAccountForm);
export default i18nConnect<IOwnProps>(withForm);
