import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { forgotPasswordFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { InputBaseField } from 'shared/view/redux-form';
import { required, validateEmail } from 'shared/helpers/validators';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { Button, Error, Label, Link } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import routes from 'modules/routes';

import './ForgotPasswordContainer.scss';

interface IStateProps {
  recoveryPasswordCommunication: ICommunication;
}

interface IActionProps {
  recoveryPassword: typeof actions.recoveryPassword;
}

const b = block('forgot-password-container');

const { name: formName, fieldNames } = forgotPasswordFormEntry;

type TProps = IStateProps & IActionProps & ITranslateProps & InjectedFormProps<NS.IForgotPasswordForm, ITranslateProps>;

class ForgotPasswordContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      recoveryPasswordCommunication: selectors.selectCommunication(state, 'recoveryPassword'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      recoveryPassword: actions.recoveryPassword,
    }, dispatch);
  }

  public render() {
    const { translate: t, error, recoveryPasswordCommunication } = this.props;
    return (
      <div className={b()}>
        <form onSubmit={this.handleForgotPasswordSubmit}>
          <Label className={b('label')} htmlFor={fieldNames.email}>
            {t('FORGOT-PASSWORD-CONTAINER:STATIC:RECOVER-TEXT')}
          </Label>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.email}
              placeholder={t('FORGOT-PASSWORD-CONTAINER:STATIC:EMAIL-PLACEHOLDER')}
              type="email"
              validate={[required, validateEmail]}
              // validateOnChange
              autoFocus
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

          {recoveryPasswordCommunication.error && (
            <div className={b('error')}>
              <Error>{recoveryPasswordCommunication.error}</Error>
            </div>
          )}

          {recoveryPasswordCommunication.isLoaded ? (
            <div className={b('info')}>
              {t('FORGOT-PASSWORD-CONTAINER:STATIC:PASSWORD-RESTORED')}
            </div>
          ) : (
            <div className={b('actions')}>
              <Button color="blue" isShowPreloader={recoveryPasswordCommunication.isRequesting}>
                {t('SHARED:BUTTONS:SUBMIT')}
              </Button>
            </div>
          )}

          <div className={b('links')}>
            <Link href={routes.auth['login-with-email'].getPath()}>
              {t('FORGOT-PASSWORD-CONTAINER:LINK:LOGIN-WITH-EMAIL')}
            </Link>
          </div>

        </form>
      </div>
    );
  }

  @bind
  private handleForgotPasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, recoveryPassword } = this.props;

    handleSubmit(async data => {
      recoveryPassword({
        email: data.email,
      });
    })(e);
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  ForgotPasswordContainer.mapStateToProps,
  ForgotPasswordContainer.mapDispatch,
)(ForgotPasswordContainer);
const withForm = reduxForm<NS.IForgotPasswordForm, ITranslateProps>({
  form: formName,
})(withRedux);

export default i18nConnect<{}>(withForm);
