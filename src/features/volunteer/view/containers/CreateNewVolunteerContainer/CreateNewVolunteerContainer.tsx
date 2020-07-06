import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { AddPersonalInformationForm, AddVolunteerAreasOfInterest } from '../../components';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import * as NS from '../../../namespace';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { ICreateAccountRequest } from 'shared/types/requests/auth';
import { selectors as userSelectors } from 'services/user';

interface IOwnProps {
  userAccount: ICreateAccountRequest;
  onCreateVolunteer(): void;
}

interface IStateProps {
  saveVolunteerPersonalInfoCommunication: ICommunication;
  saveVolunteerAreasOfInterestCommunication: ICommunication;
  userTags: string[];
  tags: string[];
}

interface IActionProps {
  saveVolunteerPersonalInfo: typeof actions.saveVolunteerPersonalInfo;
  uploadVolunteerLogo: typeof actions.uploadVolunteerLogo;
  saveVolunteerAreasOfInterest: typeof actions.saveVolunteerAreasOfInterest;
}

type TCreateVolunteerStep =
  | 'add-personal-info'
  | 'add-area-of-interest';

interface IState {
  currentStep: TCreateVolunteerStep;
}

const b = block('create-new-volunteer-container');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class CreateNewVolunteerContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      saveVolunteerPersonalInfoCommunication: selectors.selectCommunication(state, 'saveVolunteerPersonalInformation'),
      saveVolunteerAreasOfInterestCommunication: selectors.selectCommunication(state, 'saveVolunteerAreasOfInterest'),
      userTags: userSelectors.selectUserTags(state),
      tags: userSelectors.selectTags(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      saveVolunteerPersonalInfo: actions.saveVolunteerPersonalInfo,
      uploadVolunteerLogo: actions.uploadVolunteerLogo,
      saveVolunteerAreasOfInterest: actions.saveVolunteerAreasOfInterest,
    }, dispatch);
  }

  public state: IState = {
    currentStep: 'add-personal-info',
    // currentStep: 'add-area-of-interest', // TODO: REMOVE BEFORE COMMIT
  };

  public componentDidUpdate({
    saveVolunteerPersonalInfoCommunication: prevSaveVolunteerPersonalInfoCommunication,
    saveVolunteerAreasOfInterestCommunication: prevSaveVolunteerAreasOfInterestCommunication,
  }: TProps) {
    const { saveVolunteerPersonalInfoCommunication, saveVolunteerAreasOfInterestCommunication } = this.props;

    if (!prevSaveVolunteerPersonalInfoCommunication.isLoaded && saveVolunteerPersonalInfoCommunication.isLoaded) {
      this.handleGoToNextStep();
    }

    if (!prevSaveVolunteerAreasOfInterestCommunication.isLoaded && saveVolunteerAreasOfInterestCommunication.isLoaded) {
      this.handleGoToNextStep();
    }
  }

  public render() {
    return (
      <div className={b()}>
        {this.renderContent()}
      </div>
    );
  }

  @bind
  private renderContent() {
    const { saveVolunteerPersonalInfoCommunication, saveVolunteerAreasOfInterestCommunication } = this.props;
    const { currentStep } = this.state;

    switch (currentStep) {
      case 'add-personal-info':
        return (
          <AddPersonalInformationForm
            communication={saveVolunteerPersonalInfoCommunication}
            userAccount={this.props.userAccount}
            onSkip={this.handleGoToNextStep}
            onSave={this.handleSavePersonalInfo}
            onUpload={this.handleLogoUpload}
          />
        );
      case 'add-area-of-interest':
        return (
          <AddVolunteerAreasOfInterest
            userTags={this.props.userTags}
            tags={this.props.tags}
            onSkip={this.handleGoToNextStep}
            onNext={this.handleSaveAreasOfInterest}
            communication={saveVolunteerAreasOfInterestCommunication}
          />
        );
    }

    return null;
  }

  @bind
  private handleSavePersonalInfo(values: NS.IVolunteerPersonalInfoForm) {
    this.props.saveVolunteerPersonalInfo(values);
  }

  @bind
  private handleSaveAreasOfInterest(areas: string[]) {
    if (areas.length) {
      this.props.saveVolunteerAreasOfInterest(areas);
    } else {
      this.handleGoToNextStep();
    }
  }

  @bind
  private handleGoToNextStep() {
    switch (this.state.currentStep) {
      case 'add-personal-info':
        this.setState({ currentStep: 'add-area-of-interest' });
        break;
      case 'add-area-of-interest':
        this.props.onCreateVolunteer();
        break;
    }
  }

  @bind
  private handleLogoUpload(logoFile: IImageFile) {
    if (logoFile) {
      this.props.uploadVolunteerLogo(logoFile);
    } else {
      this.handleGoToNextStep();
    }
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  CreateNewVolunteerContainer.mapStateToProps,
  CreateNewVolunteerContainer.mapDispatch,
)(CreateNewVolunteerContainer);
export default i18nConnect<IOwnProps>(withRedux);
