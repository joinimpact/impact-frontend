import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState, ISideBarRoute } from 'shared/types/app';
import { ErrorScreen } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Preloader } from 'shared/view/elements';
import { EditOpportunityForm, OpportunitySidebar } from '../../components';
import { selectors as userSelectors } from 'services/user';
import { ICommunication } from 'shared/types/redux';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import * as NS from '../../../namespace';
import { createOpportunityFormEntry } from '../../../redux/reduxFormEntries';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IOpportunityResponse } from 'shared/types/responses/npo';

import './EditOpportunityContainer.scss';

interface IOwnProps {
  editOpportunityId?: string;
  onOpportunitySaved?(opportunityId: string): void;
  onGoToViewAllOpportunities(): void;
}

interface IStateProps {
  tags: string[];
  newOpportunityId: string | null;
  uploadOpportunityProgress: number | null;
  requestNewOpportunityIdCommunication: ICommunication;
  loadSingleOpportunityCommunication: ICommunication;
  updateOpportunityCommunication: ICommunication;
  createOpportunityCommunication: ICommunication;
  uploadOpportunityLogoCommunication: ICommunication;
  currentOpportunity: IOpportunityResponse | null;
  publishOpportunityCommunication: ICommunication;
  unpublishOpportunityCommunication: ICommunication;
}

interface IActionProps {
  requestNewOpportunityId: typeof actions.requestNewOpportunityId;
  updateOpportunity: typeof actions.updateOpportunity;
  uploadOpportunityLogo: typeof actions.uploadOpportunityLogo;
  loadSingleOpportunity: typeof actions.loadSingleOpportunity;
  requestDeleteOpportunity: typeof actions.requestDeleteOpportunity;
  publishOpportunity: typeof actions.publishOpportunity;
  unpublishOpportunity: typeof actions.unpublishOpportunity;
}

interface IState {
  selectedRoute: string | null;
}

const b = block('create-new-opportunity-container');
const { name: formName } = createOpportunityFormEntry;

type TProps = IOwnProps &
  ITranslateProps &
  IStateProps &
  IActionProps &
  InjectedFormProps<NS.ICreateOpportunityForm, ITranslateProps & IOwnProps>;

class EditOpportunityContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      tags: userSelectors.selectTags(state),
      newOpportunityId: selectors.selectCurrentOpportunityId(state),
      currentOpportunity: selectors.selectCurrentOpportunity(state),
      requestNewOpportunityIdCommunication: selectors.selectCommunication(state, 'requestNewOpportunityId'),
      updateOpportunityCommunication: selectors.selectCommunication(state, 'updateOpportunity'),
      createOpportunityCommunication: selectors.selectCommunication(state, 'updateOpportunity'),
      uploadOpportunityLogoCommunication: selectors.selectCommunication(state, 'uploadOpportunityLogo'),
      uploadOpportunityProgress: selectors.selectUploadLogoProgress(state),
      loadSingleOpportunityCommunication: selectors.selectCommunication(state, 'loadSingleOpportunity'),
      publishOpportunityCommunication: selectors.selectCommunication(state, 'publicOpportunity'),
      unpublishOpportunityCommunication: selectors.selectCommunication(state, 'unpublishOpportunity'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        requestNewOpportunityId: actions.requestNewOpportunityId,
        updateOpportunity: actions.updateOpportunity,
        uploadOpportunityLogo: actions.uploadOpportunityLogo,
        loadSingleOpportunity: actions.loadSingleOpportunity,
        requestDeleteOpportunity: actions.requestDeleteOpportunity,
        publishOpportunity: actions.publishOpportunity,
        unpublishOpportunity: actions.unpublishOpportunity,
      },
      dispatch,
    );
  }

  public state: IState = {
    selectedRoute: null,
  };

  public componentDidMount() {
    const { editOpportunityId } = this.props;
    if (editOpportunityId) {
      if (this.props.currentOpportunity) {
        this.initForm(this.props.currentOpportunity);
      }
      this.props.loadSingleOpportunity(editOpportunityId);
    } else {
      this.props.requestNewOpportunityId();
    }
  }

  public componentDidUpdate(prevProps: TProps) {
    const { editOpportunityId, currentOpportunity, updateOpportunityCommunication } = this.props;
    if (editOpportunityId && !prevProps.currentOpportunity && currentOpportunity) {
      this.initForm(currentOpportunity);
    }

    if (!prevProps.updateOpportunityCommunication.isLoaded && updateOpportunityCommunication.isLoaded) {
      this.props.onOpportunitySaved && this.props.onOpportunitySaved(currentOpportunity!.id);
    }
  }

  public render() {
    const { editOpportunityId } = this.props;
    if (editOpportunityId) {
      return this.renderEditMode();
    }

    return this.renderCreateNewMode();
  }

  @bind
  private renderEditMode() {
    const { loadSingleOpportunityCommunication } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={loadSingleOpportunityCommunication.isRequesting} position="relative" size={14}>
          {this.renderContent()}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderCreateNewMode() {
    const { requestNewOpportunityIdCommunication } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={requestNewOpportunityIdCommunication.isRequesting} position="relative" size={14}>
          {this.renderContent()}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderContent() {
    const { newOpportunityId } = this.props;

    if (!newOpportunityId) {
      return <ErrorScreen title="Error" message="Can't create new opportunity" />;
    }

    return (
      <form onSubmit={this.handleCreateOpportunitySubmit} className={b('create-opportunity-form')}>
        {this.renderLeftSide()}
        {this.renderRightSide()}
      </form>
    );
  }

  @bind
  private renderLeftSide() {
    const { currentOpportunity, valid } = this.props;
    return (
      <div className={b('left-side')}>
        <OpportunitySidebar
          submitDisabled={!valid}
          currentOpportunity={currentOpportunity}
          onGoToViewAllOpportunities={this.props.onGoToViewAllOpportunities}
          updateOpportunityCommunication={this.props.updateOpportunityCommunication}
          selectedRoute={this.state.selectedRoute}
          onSelectRoute={this.handleSelectRoute}
        />
      </div>
    );
  }

  @bind
  private renderRightSide() {
    const {
      createOpportunityCommunication,
      uploadOpportunityLogoCommunication,
      uploadOpportunityProgress,
      currentOpportunity,
      publishOpportunityCommunication,
      unpublishOpportunityCommunication,
    } = this.props;

    return (
      <div className={b('right-side')}>
        <EditOpportunityForm
          communication={createOpportunityCommunication}
          uploadImageCommunication={uploadOpportunityLogoCommunication}
          changingOpportunityPublishState={
            publishOpportunityCommunication.isRequesting || unpublishOpportunityCommunication.isRequesting
          }
          changingOpportunityPublishStateError={
            publishOpportunityCommunication.error || unpublishOpportunityCommunication.error
          }
          tags={this.props.tags}
          isPublished={currentOpportunity ? currentOpportunity.public : false}
          uploadedImage={currentOpportunity ? currentOpportunity.profilePicture : undefined}
          uploadProgress={uploadOpportunityProgress || undefined}
          onChangePublishingState={this.handleChangePublishingState}
          onDelete={this.handleDeleteOpportunity}
          onUpload={this.handleLogoUpload}
          onChangeCardInView={this.handleSetCurrentCardInView}
        />
      </div>
    );
  }

  @bind
  private handleLogoUpload(logoFile: IImageFile) {
    this.props.uploadOpportunityLogo(logoFile);
  }

  @bind
  private handleSetCurrentCardInView(cardId: string) {
    this.setState({ selectedRoute: `#${cardId}` });
  }

  @bind
  private handleChangePublishingState() {
    const { currentOpportunity } = this.props;
    if (currentOpportunity) {

      if (currentOpportunity.public) {
        this.props.unpublishOpportunity(currentOpportunity.id);
      } else {
        this.props.publishOpportunity(currentOpportunity.id);
      }
    }
  }

  @bind
  private handleDeleteOpportunity() {
    const { currentOpportunity } = this.props;
    if (currentOpportunity) {
      this.props.requestDeleteOpportunity(currentOpportunity.id);
    }
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.route! });
  }

  @bind
  private handleCreateOpportunitySubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, updateOpportunity } = this.props;

    handleSubmit(async data => {
      // console.log('[handleCreateOpportunitySubmit] data: ', data);
      updateOpportunity({
        ...data,
      });
    })(e);
  }

  @bind
  private initForm(opportunity: IOpportunityResponse) {
    this.props.initialize({
      title: opportunity.title,
      description: opportunity.description,
      ageLimitEnabled: opportunity.requirements.ageLimit.active,
      minAge: opportunity.requirements.ageLimit.from,
      maxAge: opportunity.requirements.ageLimit.to,
      hoursPerWeekLimitEnabled: opportunity.requirements.expectedHours.active,
      hoursPerWeek: opportunity.requirements.expectedHours.hours,
      capLimitEnabled: opportunity.limits.volunteersCap.active,
      volunteersCap: opportunity.limits.volunteersCap.cap,
      published: opportunity.public,
      tags: opportunity.tags.map(tag => tag.name),
    });
  }
}

const withForm = reduxForm<NS.ICreateOpportunityForm, ITranslateProps & IOwnProps>({
  form: formName,
})(EditOpportunityContainer);
const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
  EditOpportunityContainer.mapStateToProps,
  EditOpportunityContainer.mapDispatch,
)(withForm);

export default i18nConnect<IOwnProps>(withRedux);
