import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState, TUserType } from 'shared/types/app';
import { CreateNewAccountForm, CreatePasswordForm, SelectUserType } from '../../components';
import { ICreateAccountRequest } from 'shared/types/requests/auth';

import './SignUpFormContainer.scss';

interface IOwnProps {
  onFinish(userType: TUserType, userAccount: ICreateAccountRequest): void;
}

interface IStateProps {
  loginCommunication: ICommunication;
  createAccountCommunication: ICommunication;
}

interface IActionProps {
  login: typeof actions.login;
  createAccount: typeof actions.createAccount;
  createPassword: typeof actions.createPassword;
}

type TSignUpStep =
  | 'select-user-type'
  | 'create-account'
  | 'create-password';

interface IState {
  currentStep: TSignUpStep;
  userType: TUserType | null;
  userAccount: ICreateAccountRequest | null;
  accountForm: NS.ICreateAccountForm | null;
  password: string | null;
}

const b = block('sign-up-form');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class SignUpFormContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loginCommunication: selectors.selectCommunication(state, 'login'),
      createAccountCommunication: selectors.selectCommunication(state, 'createAccount'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      login: actions.login,
      createAccount: actions.createAccount,
      createPassword: actions.createPassword,
    }, dispatch);
  }

  public state: IState = {
    currentStep: 'select-user-type',
    // currentStep: 'create-password', // TODO: REMOVE BEFORE COMMIT!
    userAccount: null,
    accountForm: null,
    userType: null,
    // userType: 'volunteer', // TODO: REMOVE BEFORE COMMIT!
    password: null,
  };

  public componentDidUpdate({
    createAccountCommunication: prevCreateAccountCommunication,
  }: TProps) {
    const { createAccountCommunication } = this.props;

    if (!prevCreateAccountCommunication.isLoaded && createAccountCommunication.isLoaded) {
      this.handleGoToNextStep();
    }
  }

  public render() {
    return (
      <div className={b()}>{this.renderCurrentStep()}</div>
    );
  }

  @bind
  private renderCurrentStep() {
    const { createAccountCommunication } = this.props;
    const { currentStep } = this.state;

    switch (currentStep) {
      case 'select-user-type':
        return (
          <SelectUserType onUserTypeSelected={this.handleSelectUserType} />
        );
      case 'create-account':
        return (
          <CreateNewAccountForm
            onCreateAccount={this.handleCreateAccount}
          />
        );
      case 'create-password':
        return (
          <CreatePasswordForm
            onCreatePassword={this.handleCreatePassword}
            communication={createAccountCommunication}
          />
        );
    }

    return null;
  }

  @bind
  private handleGoToNextStep() {
    switch (this.state.currentStep) {
      case 'select-user-type':
        this.setState({ currentStep: 'create-account' });
        break;
      case 'create-account':
        this.setState({currentStep: 'create-password'});
        break;
      case 'create-password':
        this.props.onFinish(this.state.userType!, this.state.userAccount!);
        break;
    }
  }

  @bind
  private handleSelectUserType(userType: TUserType) {
    this.setState({ userType }, this.handleGoToNextStep);
  }

  @bind
  private handleCreateAccount(values: NS.ICreateAccountForm) {
    this.setState({ accountForm: values }, this.handleGoToNextStep);
  }

  @bind
  private handleCreatePassword(password: string) {
    this.setState({ password }, () => {
      const { accountForm } = this.state;
      const account = {
        password,
        zipCode: accountForm!.address,
        email: accountForm!.email,
        lastName: accountForm!.lastName,
        dateOfBirth: accountForm!.birthday,
        firstName: accountForm!.firstName,
      };
      this.setState({ userAccount: account }, () => {
        this.props.createAccount(account);
      });
    });
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  SignUpFormContainer.mapStateToProps,
  SignUpFormContainer.mapDispatch
)(SignUpFormContainer);
export default i18nConnect<IOwnProps>(withRedux);
