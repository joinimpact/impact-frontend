import React from 'react';
import block from 'bem-cn';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as AuthFeatureEntry } from 'features/auth/entry';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as authFeatureLoadEntry } from 'features/auth/loader';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import { AuthLayout } from 'modules/Auth/view/components';
import { bind } from 'decko';
import { TUserType } from 'shared/types/app';
import routes from 'modules/routes';

interface IFeatureProps {
  authFeatureEntry: AuthFeatureEntry;
  npoFeatureEntry: NPOFeatureEntry;
  volunteerFeatureEntry: VolunteerFeatureEntry;
}

type TCurrentStep = 'sign-up' | 'create-npo' | 'create-volunteer';

interface IState {
  currentStep: TCurrentStep;
}

const b = block('sign-up-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class SignUpModule extends React.PureComponent<TProps, IState> {
  public state: IState = {
    currentStep: 'sign-up',
  };

  public render() {
    return (
      <div className={b()}>
        <AuthLayout withoutLogo>{this.renderCurrentStep()}</AuthLayout>
      </div>
    );
  }

  @bind
  private renderCurrentStep() {
    const { SignUpFormContainer } = this.props.authFeatureEntry.containers;
    const { CreateNewOrganizationContainer } = this.props.npoFeatureEntry.containers;
    const { CreateNewVolunteerContainer } = this.props.volunteerFeatureEntry.containers;
    const { currentStep } = this.state;

    switch (currentStep) {
      case 'sign-up':
        return <SignUpFormContainer onFinish={this.handleSignUpFinish} />;
      case 'create-npo':
        return (
          <CreateNewOrganizationContainer
            onCreateOrganizationDone={this.handleCreateAccountFinished.bind(this, 'npo')}
          />
        );
      case 'create-volunteer':
        return (
          <CreateNewVolunteerContainer onCreateVolunteer={this.handleCreateAccountFinished.bind(this, 'volunteer')} />
        );
    }
  }

  @bind
  private handleSignUpFinish(userType: TUserType) {
    this.setState({ currentStep: userType === 'npo' ? 'create-npo' : 'create-volunteer' });
  }

  @bind
  private handleCreateAccountFinished(userType: TUserType) {
    switch (userType) {
      case 'npo':
        this.props.history.push(routes.dashboard.organization['registration-done'].getPath());
        break;
      case 'volunteer':
        this.props.history.push(routes.dashboard.user['registration-done'].getPath());
    }
  }
}

const withFeatures = withAsyncFeatures({
  authFeatureEntry: authFeatureLoadEntry,
  npoFeatureEntry: npoFeatureLoadEntry,
  volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(SignUpModule);

const i18nConnected = i18nConnect(withFeatures);

export default withRouter(i18nConnected);
