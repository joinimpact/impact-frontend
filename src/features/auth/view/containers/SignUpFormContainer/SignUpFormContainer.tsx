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
import { CreateNewOrganizationContainer, CreateNewVolunteerContainer } from '..';

import './SignUpFormContainer.scss';

interface IOwnProps {
  onFinish(userType: TUserType): void;
}

interface IStateProps {
  loginCommunication: ICommunication;
  createAccountCommunication: ICommunication;
  createPasswordCommunication: ICommunication;
}

interface IActionProps {
  login: typeof actions.login;
  createAccount: typeof actions.createAccount;
  createPassword: typeof actions.createPassword;
}

interface IState {
  userType: TUserType | null;
  accountCreated: boolean;
  passwordCreated: boolean;
}

const b = block('sign-up-form');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class SignUpFormContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loginCommunication: selectors.selectCommunication(state, 'login'),
      createAccountCommunication: selectors.selectCommunication(state, 'createAccount'),
      createPasswordCommunication: selectors.selectCommunication(state, 'createPassword')
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
    // userType: null,
    userType: 'volunteer', // TODO: REMOVE BEFORE COMMIT!
    accountCreated: false,
    passwordCreated: false,
  };

  public componentDidUpdate({
    createAccountCommunication: prevCreateAccountCommunication,
    createPasswordCommunication: prevCreatePasswordCommunication,
  }: TProps) {
    const { createAccountCommunication, createPasswordCommunication } = this.props;

    if (!prevCreateAccountCommunication.isLoaded && createAccountCommunication.isLoaded) {
      this.setState({ accountCreated: true });
    }

    if (!prevCreatePasswordCommunication.isLoaded && createPasswordCommunication.isLoaded) {
      this.setState({ passwordCreated: true } );
    }
  }

  public render() {
    const { createAccountCommunication, createPasswordCommunication } = this.props;
    const { userType, accountCreated, passwordCreated } = this.state;

    if (!userType) {
      // When no user type selected, first we need to make user choose his type
      return (<SelectUserType onUserTypeSelected={this.handleSelectUserType} />);
    }

    /*if (true) {
      return (
        <CreateNewOrganizationContainer onCreateOrganizationDone={this.handleCreateAccountFinish}/>
      );
    }*/

    if (true) {
      return (
        <CreateNewVolunteerContainer onCreateVolunteer={this.handleCreateAccountFinish}/>
      );
    }

    if (!accountCreated) {
      return (
        <CreateNewAccountForm
          onCreateAccount={this.handleCreateAccount}
          communication={createAccountCommunication}
        />
      );
    }

    if (!passwordCreated) {
      return (
        <CreatePasswordForm
          onCreatePassword={this.handleCreatePassword}
          communication={createPasswordCommunication}
        />
      );
    }

    return (
      <div className={b()}>
        {(userType === 'nonprofit') && (
          <CreateNewOrganizationContainer onCreateOrganizationDone={this.handleCreateAccountFinish}/>
        )}

        {(userType === 'volunteer') && (
          <CreateNewVolunteerContainer onCreateVolunteer={this.handleCreateAccountFinish}/>
        )}
      </div>
    );
  }

  @bind
  private handleCreateAccountFinish() {
    this.props.onFinish(this.state.userType!);
  }

  @bind
  private handleSelectUserType(userType: TUserType) {
    this.setState({ userType });
  }

  @bind
  private handleCreateAccount(values: NS.ICreateAccountForm) {
    this.props.createAccount(values);
  }

  @bind
  private handleCreatePassword(password: string) {
    this.props.createPassword({
      password,
    });
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  SignUpFormContainer.mapStateToProps,
  SignUpFormContainer.mapDispatch
)(SignUpFormContainer);
export default i18nConnect<IOwnProps>(withRedux);
