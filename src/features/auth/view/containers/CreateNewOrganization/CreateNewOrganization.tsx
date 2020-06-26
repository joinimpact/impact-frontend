import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { CreateNewOrganizationForm, UploadOrganizationLogoForm } from '../../component';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';

import './CreateNewOrganization.scss';

interface IStateProps {
  createOrganizationCommunication: ICommunication;
  uploadOrgLogoCommunication: ICommunication;
}

interface IActionProps {
  createNewOrganization: typeof actions.createNewOrganization;
  uploadOrgLogo: typeof actions.uploadOrgLogo;
}

type TCreateOrganizationStep = 'create-new-organization' | 'upload-logo' | 'tags';

interface IState {
  currentStep: TCreateOrganizationStep;
}

const b = block('create-new-organization');

type TProps = IStateProps & IActionProps & ITranslateProps;

class CreateNewOrganization extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      createOrganizationCommunication: selectors.selectCommunication(state, 'createOrganization'),
      uploadOrgLogoCommunication: selectors.selectCommunication(state, 'uploadOrgLogo'),
    };
  }

  public static mapDispatch(dispatch: Dispatch) {
    return bindActionCreators({
      createNewOrganization: actions.createNewOrganization,
      uploadOrgLogo: actions.uploadOrgLogo,
    }, dispatch);
  }

  public state: IState = {
    currentStep: 'create-new-organization'
    // currentStep: 'tags'
  };

  public componentDidUpdate({
    createOrganizationCommunication: prevCreateOrganizationCommunication
  }: TProps) {
    const { createOrganizationCommunication } = this.props;

    if (!prevCreateOrganizationCommunication.isLoaded && createOrganizationCommunication.isLoaded) {
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
    const { createNewOrganization, createOrganizationCommunication, uploadOrgLogoCommunication } = this.props;
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
            onUpload={this.handleUploadOrgLogo}
            onSkip={this.handleGoToNextStep}
            onNext={this.handleGoToNextStep}
            communication={uploadOrgLogoCommunication}
          />
        );

      case 'tags':
        return (
          <div>FILL TAGS</div>
        );
    }

    return null;
  }

  @bind
  private handleUploadOrgLogo(logoFile: IImageFile) {
    this.props.uploadOrgLogo(logoFile);
  }

  @bind
  private handleGoToNextStep() {
    switch (this.state.currentStep) {
      case 'create-new-organization':
        this.setState({ currentStep: 'upload-logo' });
        break;
      case 'upload-logo':
        this.setState( { currentStep: 'tags' });
        break;
      case 'tags':
        this.setState({ currentStep: 'create-new-organization' }); // Need finish
        break;
    }
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  CreateNewOrganization.mapStateToProps,
  CreateNewOrganization.mapDispatch,
)(CreateNewOrganization);
export default i18nConnect<{}>(withRedux);
