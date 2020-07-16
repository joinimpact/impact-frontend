import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import {
  CreateNewOrganizationForm,
  FillOrganizationTags,
  UploadOrganizationLogoForm,
  InviteTeamMembersForm,
} from '../../components';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { selectors as npoSelectors } from 'services/npo';
import { selectors as userSelectors } from 'services/user';

import './CreateNewOrganizationContainer.scss';

interface IOwnProps {
  onCreateOrganizationDone(): void;
}

interface IStateProps {
  createOrganizationCommunication: ICommunication;
  uploadOrgLogoCommunication: ICommunication;
  saveOrganizationTagsCommunication: ICommunication;
  saveOrganizationMembersCommunication: ICommunication;
  currentOrganization: IOrganizationsResponseItem | null;
  uploadProgress: number | null;
  tags: string[];
}

interface IActionProps {
  createNewOrganization: typeof actions.createNewOrganization;
  uploadOrgLogo: typeof actions.uploadOrgLogo;
  saveOrganizationTags: typeof actions.saveOrganizationTags;
  saveOrganizationMembers: typeof actions.saveOrganizationMembers;
}

type TCreateOrganizationStep =
  | 'create-new-organization'
  | 'upload-logo'
  | 'tags'
  | 'invite-team-members';

interface IState {
  currentStep: TCreateOrganizationStep;
}

const b = block('create-new-organization');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class CreateNewOrganizationContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      createOrganizationCommunication: selectors.selectCommunication(state, 'createOrganization'),
      uploadOrgLogoCommunication: selectors.selectCommunication(state, 'uploadOrgLogo'),
      saveOrganizationTagsCommunication: selectors.selectCommunication(state, 'saveOrganizationTags'),
      saveOrganizationMembersCommunication: selectors.selectCommunication(state, 'saveOrganizationMembers'),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      uploadProgress: selectors.selectUploadLogoProgress(state),
      tags: userSelectors.selectTags(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch) {
    return bindActionCreators(
      {
        createNewOrganization: actions.createNewOrganization,
        uploadOrgLogo: actions.uploadOrgLogo,
        saveOrganizationTags: actions.saveOrganizationTags,
        saveOrganizationMembers: actions.saveOrganizationMembers,
      },
      dispatch,
    );
  }

  public state: IState = {
    currentStep: 'create-new-organization'
    // currentStep: 'invite-team-members', // TODO: REMOVE BEFORE COMMIT!
  };

  public componentDidUpdate({
    createOrganizationCommunication: prevCreateOrganizationCommunication,
    saveOrganizationTagsCommunication: prevSaveOrganizationTagsCommunication,
    saveOrganizationMembersCommunication: prevSaveOrganizationMembersCommunication
  }: TProps) {
    const { createOrganizationCommunication, saveOrganizationTagsCommunication,
      saveOrganizationMembersCommunication } = this.props;

    if (!prevCreateOrganizationCommunication.isLoaded && createOrganizationCommunication.isLoaded) {
      this.handleGoToNextStep();
    }

    if (!prevSaveOrganizationTagsCommunication.isLoaded && saveOrganizationTagsCommunication.isLoaded) {
      this.handleGoToNextStep();
    }

    if (!prevSaveOrganizationMembersCommunication.isLoaded && saveOrganizationMembersCommunication.isLoaded) {
      this.handleGoToNextStep();
    }
  }

  public render() {
    return <div className={b()}>{this.renderContent()}</div>;
  }

  @bind
  private renderContent() {
    const {
      createNewOrganization,
      createOrganizationCommunication,
      uploadOrgLogoCommunication,
      saveOrganizationTagsCommunication,
      saveOrganizationMembersCommunication,
      currentOrganization,
      uploadProgress,
    } = this.props;
    const { currentStep } = this.state;

    switch (currentStep) {
      case 'create-new-organization':
        return (
          <CreateNewOrganizationForm
            onCreateNewOrganization={createNewOrganization}
            communication={createOrganizationCommunication}
            onSkip={this.handleGoToNextStep}
          />
        );
      case 'upload-logo':
        return (
          <UploadOrganizationLogoForm
            uploadedImage={currentOrganization ? currentOrganization.profilePicture : null}
            uploadProgress={uploadProgress || undefined}
            onUpload={this.handleUploadOrgLogo}
            onSkip={this.handleGoToNextStep}
            onNext={this.handleGoToNextStep}
            communication={uploadOrgLogoCommunication}
          />
        );

      case 'tags':
        return (
          <FillOrganizationTags
            communication={saveOrganizationTagsCommunication}
            tags={this.props.tags}
            onSkip={this.handleGoToNextStep}
            onNext={this.handleSaveOrganizationTags}
          />
        );

      case 'invite-team-members':
        return (
          <InviteTeamMembersForm
            communication={saveOrganizationMembersCommunication}
            onSkip={this.handleGoToNextStep}
            onNext={this.handleSaveTeamMembers}
          />
        );
    }

    return null;
  }

  @bind
  private handleUploadOrgLogo(logoFile: IImageFile) {
    if (logoFile) {
      this.props.uploadOrgLogo(logoFile);
    } else {
      this.handleGoToNextStep();
    }
  }

  @bind
  private handleSaveOrganizationTags(tags: string[]) {
    if (tags.length) {
      this.props.saveOrganizationTags(tags);
    } else {
      this.handleGoToNextStep();
    }
  }

  @bind
  private handleSaveTeamMembers(members: string[]) {
    if (members.length) {
      this.props.saveOrganizationMembers(members);
    } else {
      this.handleGoToNextStep();
    }
  }

  @bind
  private handleGoToNextStep() {
    switch (this.state.currentStep) {
      case 'create-new-organization':
        this.setState({ currentStep: 'upload-logo' });
        break;
      case 'upload-logo':
        this.setState({ currentStep: 'tags' });
        break;
      case 'tags':
        this.setState({ currentStep: 'invite-team-members' }); // Need finish
        break;
      case 'invite-team-members':
        this.props.onCreateOrganizationDone();
        break;
    }
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  CreateNewOrganizationContainer.mapStateToProps,
  CreateNewOrganizationContainer.mapDispatch,
)(CreateNewOrganizationContainer);
export default i18nConnect<IOwnProps>(withRedux);
