import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as userSelectors } from 'services/user';
import * as NS from '../../../namespace';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState, TUserType } from 'shared/types/app';
import { CreateNewAccountForm, CreatePasswordForm, SelectUserType } from '../../components';
import { ICreateAccountRequest } from 'shared/types/requests/auth';
import { IUser } from 'shared/types/models/user';
// import { mockCreateAccountForm } from 'shared/defaults/mocks';

import './SignUpFormContainer.scss';

interface IOwnProps {
  onFinish(userType: TUserType, userAccount: ICreateAccountRequest, isUserCreatedBySocialNetwork?: boolean): void;
}

interface IStateProps {
  loginCommunication: ICommunication;
  createAccountCommunication: ICommunication;
  currentUser: IUser | null;
  checkEmailFreeCommunication: ICommunication;
}

interface IActionProps {
  login: typeof actions.login;
  createAccount: typeof actions.createAccount;
  createPassword: typeof actions.createPassword;
  checkEmailFree: typeof actions.checkEmailFree;
}

type TSignUpStep =
  | 'select-user-type'
  | 'create-account'
  | 'create-password';

interface IState {
  currentStep: TSignUpStep;
  userType: TUserType | null;
  userAccount: ICreateAccountRequest | null;
  accountForm: NS.ICreateAccountValues | null;
  password: string | null;
}

const b = block('sign-up-form');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class SignUpFormContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loginCommunication: selectors.selectCommunication(state, 'login'),
      createAccountCommunication: selectors.selectCommunication(state, 'createAccount'),
      currentUser: userSelectors.selectCurrentUser(state),
      checkEmailFreeCommunication: selectors.selectCommunication(state, 'checkEmailFree'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      login: actions.login,
      createAccount: actions.createAccount,
      createPassword: actions.createPassword,
      checkEmailFree: actions.checkEmailFree,
    }, dispatch);
  }

  public state: IState = {
    currentStep: 'select-user-type',
    userType: null,
    accountForm: null,
    userAccount: null,
    password: null,

    // currentStep: 'create-account', // TODO: REMOVE BEFORE COMMIT!
    // userType: 'volunteer', // TODO: REMOVE BEFORE COMMIT!
    // accountForm: mockCreateAccountForm, // TODO: REMOVE BEFORE COMMIT!
  };

  public componentDidUpdate({
    createAccountCommunication: prevCreateAccountCommunication,
    checkEmailFreeCommunication: prevCheckEmailFreeCommunication,
  }: TProps) {
    const { createAccountCommunication, checkEmailFreeCommunication } = this.props;

    if (!prevCreateAccountCommunication.isLoaded && createAccountCommunication.isLoaded) {
      this.handleGoToNextStep();
    }

    if (!prevCheckEmailFreeCommunication.isLoaded && checkEmailFreeCommunication.isLoaded) {
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
    const { createAccountCommunication, checkEmailFreeCommunication } = this.props;
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
            communication={checkEmailFreeCommunication}
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
    const { currentUser } = this.props;
    this.setState({ userType }, () => {
      if (currentUser && currentUser.email) {
        this.props.onFinish(userType, {
          email: currentUser.email,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          dateOfBirth: currentUser.dateOfBirth,
          location: null as any,
          password: '',
        }, true);
      } else {
        this.handleGoToNextStep();
      }
    });
  }

  @bind
  private handleCreateAccount(values: NS.ICreateAccountValues) {
    this.setState({ accountForm: values }, () => {
      this.props.checkEmailFree(values.email);
    });
  }

  @bind
  private handleCreatePassword(password: string) {
    this.setState({ password }, () => {
      const { accountForm } = this.state;
      const account: ICreateAccountRequest = {
        password,
        location: accountForm!.address,
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
