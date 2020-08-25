import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { FormWarnings, getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { IAppReduxState, ISideBarRoute } from 'shared/types/app';
import {
  EditOrganizationForm,
  EditOrganizationMembersForm,
  EditOrganizationPictureForm,
  EditOrganizationTagsForm,
  NpoCreateOrganizationSidebar,
} from '../../components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import { createNewOrganizationEntry } from '../../../redux/reduxFormEntries';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { ICommunication } from 'shared/types/redux';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { IAddressLocation } from 'shared/types/requests/auth';
import { countryToAddressLocation } from 'shared/helpers/reactPlaceHelper';
import { selectors as userSelectors } from 'services/user';

import './NpoCreateOrganizationContainer.scss';

interface IOwnProps {
  onGoToNPODashboard(): void;
}

interface IStateProps {
  createOrganizationCommunication: ICommunication;
  uploadEditableOrgLogoCommunication: ICommunication;
  saveEditableOrganizationTagsCommunication: ICommunication;
  saveEditableOrganizationMembersCommunication: ICommunication;
  saveOrganizationMembersCommunication: ICommunication;
  formValues: NS.ICreateNewOrganizationForm;
  uploadProgress: number | null;
  editableOrganization: IOrganizationsResponseItem | null;
  tags: string[];
}

interface IActionProps {
  createNewOrganization: typeof actions.createNewOrganization;
  uploadEditableOrgLogo: typeof actions.uploadEditableOrgLogo;
  resetCreateNewOrganizationResponse: typeof actions.resetCreateNewOrganizationResponse;
  resetCurrentEditableOrganization: typeof actions.resetCurrentEditableOrganization;
  saveEditableOrganizationTags: typeof actions.saveEditableOrganizationTags;
  saveEditableOrganizationMembers: typeof actions.saveEditableOrganizationMembers;
}

interface IState {
  selectedRoute: string | null;
  topVisibleId: string | null;
  sideBarItems: ISideBarRoute[];
}

const b = block('npo-create-organization-container');
const { name: formName } = createNewOrganizationEntry;

type TComponentProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;
type TProps = TComponentProps & InjectedFormProps<NS.ICreateNewOrganizationForm, TComponentProps>;

const formWarnValidator = (
  values: NS.ICreateNewOrganizationForm,
  props: TComponentProps,
): FormWarnings<NS.ICreateNewOrganizationForm> => {
  const result: FormWarnings<NS.ICreateNewOrganizationForm> = {};
  return result;
};

class NpoCreateOrganizationContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      formValues: getFormValues(formName)(state) as NS.ICreateNewOrganizationForm,
      createOrganizationCommunication: selectors.selectCommunication(state, 'createOrganization'),
      saveEditableOrganizationTagsCommunication: selectors.selectCommunication(state, 'saveEditableOrganizationTags'),
      saveEditableOrganizationMembersCommunication: selectors.selectCommunication(
        state,
        'saveEditableOrganizationMembers',
      ),
      saveOrganizationMembersCommunication: selectors.selectCommunication(state, 'saveOrganizationMembers'),
      uploadProgress: selectors.selectUploadLogoProgress(state),
      uploadEditableOrgLogoCommunication: selectors.selectCommunication(state, 'uploadEditableOrgLogo'),
      editableOrganization: selectors.selectCurrentEditableOrganization(state),
      tags: userSelectors.selectTags(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        uploadEditableOrgLogo: actions.uploadEditableOrgLogo,
        createNewOrganization: actions.createNewOrganization,
        resetCreateNewOrganizationResponse: actions.resetCreateNewOrganizationResponse,
        resetCurrentEditableOrganization: actions.resetCurrentEditableOrganization,
        saveEditableOrganizationTags: actions.saveEditableOrganizationTags,
        saveEditableOrganizationMembers: actions.saveEditableOrganizationMembers,
      },
      dispatch,
    );
  }

  public state: IState = {
    selectedRoute: null,
    topVisibleId: null,
    sideBarItems: [
      {
        title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:DETAILS',
        hashRoute: '#details',
      },
      {
        title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:ORGANIZATION-PICTURE',
        hashRoute: '#picture',
        disabled: !Boolean(this.props.editableOrganization),
      },
      {
        title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:TAGS',
        hashRoute: '#tags',
        disabled: !Boolean(this.props.editableOrganization),
      },
      {
        title: 'NPO-CREATE-ORGANIZATION-SIDEBAR:MENU-ITEM:TEAM',
        hashRoute: '#team',
        disabled: !Boolean(this.props.editableOrganization),
      },
    ],
  };

  public componentDidMount() {
    if (this.props.editableOrganization) {
      const { description, websiteURL, name } = this.props.editableOrganization;
      this.props.initialize({
        description,
        // address: '',
        website: websiteURL,
        organizationName: name,
      });
    }
  }

  public componentWillUnmount() {
    this.props.resetCreateNewOrganizationResponse();
    this.props.resetCurrentEditableOrganization();
  }

  public componentDidUpdate(prevProps: TProps) {
    const { createOrganizationCommunication, saveEditableOrganizationTagsCommunication } = this.props;
    if (prevProps.createOrganizationCommunication.isRequesting && createOrganizationCommunication.isLoaded) {
      this.setState({
        sideBarItems: this.state.sideBarItems.map(item => ({
          ...item,
          disabled: false,
        })),
        selectedRoute: this.state.sideBarItems[1].hashRoute!,
      });
    }

    if (
      prevProps.saveEditableOrganizationTagsCommunication.isRequesting &&
      saveEditableOrganizationTagsCommunication.isLoaded
    ) {
      this.setState({
        selectedRoute: this.state.sideBarItems[3].hashRoute!,
      });
    }
  }

  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('sidebar')}>
          <NpoCreateOrganizationSidebar
            onSelectRoute={this.handleSelectRoute}
            selectedRoute={this.state.selectedRoute}
            sideBarItems={this.state.sideBarItems}
          />
        </div>
        <div className={b('content')}>
          {Boolean(this.props.editableOrganization) && (
            <div className={b('content-hint')}>{t('NPO-CREATE-ORGANIZATION-CONTAINER:HINT:ORGANIZATION-CREATED')}</div>
          )}
          {this.renderContent()}
        </div>
      </div>
    );
  }

  @bind
  private renderContent() {
    const { editableOrganization } = this.props;
    const { selectedRoute } = this.state;

    switch (selectedRoute) {
      case '#details':
        return (
          <form onSubmit={this.handleSaveOrganizationForm}>
            <EditOrganizationForm
              communication={this.props.createOrganizationCommunication}
              editableOrganization={editableOrganization}
              invalidFields={formWarnValidator(this.props.formValues, this.props)}
              onChangeCardInView={this.handleChangeCardInView}
            />
          </form>
        );
      case '#picture':
        return (
          <EditOrganizationPictureForm
            uploadImageCommunication={this.props.uploadEditableOrgLogoCommunication}
            uploadProgress={this.props.uploadProgress || undefined}
            uploadedImage={editableOrganization ? editableOrganization.profilePicture : null}
            onUpload={this.handleLogoUpload}
            onGoToNext={this.handleGoToRoute.bind(this, this.state.sideBarItems[2])}
          />
        );
      case '#tags':
        return (
          <EditOrganizationTagsForm
            communication={this.props.saveEditableOrganizationTagsCommunication}
            tags={this.props.tags}
            defaultValues={this.props.editableOrganization ? this.props.editableOrganization.tags : null}
            onSave={this.handleSaveOrganizationTags}
            onGoToNext={this.handleGoToRoute.bind(this, this.state.sideBarItems[3])}
          />
        );
      case '#team':
        return (
          <EditOrganizationMembersForm
            communication={this.props.saveEditableOrganizationMembersCommunication}
            onSave={this.handleSaveOrganizationMembers}
            onGoToNext={this.props.onGoToNPODashboard}
          />
        );
    }
  }

  @bind
  private handleGoToRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.hashRoute! });
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.hashRoute! });
  }

  @bind
  private handleChangeCardInView(cardId: string) {
    this.setState({ topVisibleId: cardId });
  }

  @bind
  private handleSaveOrganizationForm(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, createNewOrganization } = this.props;

    handleSubmit(async data => {
      if (data.address) {
        const location: IAddressLocation = await countryToAddressLocation(data.address);
        createNewOrganization({
          ...data,
          address: location,
        });
      } else {
        createNewOrganization({
          ...data,
          address: null,
        });
      }
    })(e);
  }

  @bind
  private handleLogoUpload(logoFile: IImageFile) {
    this.props.uploadEditableOrgLogo(logoFile);
  }

  @bind
  private handleSaveOrganizationTags(tags: string[]) {
    this.props.saveEditableOrganizationTags(tags);
  }

  @bind
  private handleSaveOrganizationMembers(emails: string[]) {
    this.props.saveEditableOrganizationMembers(emails);
  }
}

const withForm = reduxForm<NS.ICreateNewOrganizationForm, ITranslateProps>({
  form: formName,
  warn: formWarnValidator,
})(NpoCreateOrganizationContainer);
const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
  NpoCreateOrganizationContainer.mapStateToProps,
  NpoCreateOrganizationContainer.mapDispatch,
)(withForm);
export default i18nConnect<IOwnProps>(withRedux);
