import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState, ISideBarRoute } from 'shared/types/app';
import { ErrorScreen, Sidebar } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Preloader } from 'shared/view/elements';
import { CreateOpportunityForm } from '../../components';
import { selectors as userSelectors } from 'services/user';
import { ICommunication } from 'shared/types/redux';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import * as NS from '../../../namespace';
import { createOpportunityFormEntry } from '../../../redux/reduxFormEntries';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IOpportunityResponse } from 'shared/types/responses/npo';

import './CreateNewOpportunityContainer.scss';

interface IStateProps {
  tags: string[];
  newOpportunityId: string | null;
  uploadOpportunityProgress: number | null;
  requestNewOpportunityIdCommunication: ICommunication;
  createOpportunityCommunication: ICommunication;
  uploadOpportunityLogoCommunication: ICommunication;
  currentOpportunity: IOpportunityResponse | null;
}

interface IActionProps {
  requestNewOpportunityId: typeof actions.requestNewOpportunityId;
  updateOpportunity: typeof actions.updateOpportunity;
  uploadOpportunityLogo: typeof actions.uploadOpportunityLogo;
}

interface IState {
  selectedRoute: string | null;
}

const b = block('create-new-opportunity-container');
const { name: formName } = createOpportunityFormEntry;

type TAnchor = 'title' | 'tags' | 'description' | 'requirements' | 'limits' | 'publish-settings';

type TProps = ITranslateProps &
  IStateProps &
  IActionProps &
  InjectedFormProps<NS.ICreateOpportunityForm, ITranslateProps>;

class CreateNewOpportunityContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      tags: userSelectors.selectTags(state),
      newOpportunityId: selectors.selectCurrentOpportunityId(state),
      currentOpportunity: selectors.selectCurrentOpportunity(state),
      requestNewOpportunityIdCommunication: selectors.selectCommunication(state, 'requestNewOpportunityId'),
      createOpportunityCommunication: selectors.selectCommunication(state, 'createNewOpportunity'),
      uploadOpportunityLogoCommunication: selectors.selectCommunication(state, 'uploadOpportunityLogo'),
      uploadOpportunityProgress: selectors.selectUploadLogoProgress(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        requestNewOpportunityId: actions.requestNewOpportunityId,
        updateOpportunity: actions.updateOpportunity,
        uploadOpportunityLogo: actions.uploadOpportunityLogo,
      },
      dispatch,
    );
  }

  public state: IState = {
    selectedRoute: null,
  };

  private sideBarItems: ISideBarRoute[] = [
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:TITLE',
      onClick: this.handleMenuItemClick.bind(this, 'title'),
      route: 'title',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:TAGS',
      onClick: this.handleMenuItemClick.bind(this, 'tags'),
      route: 'tags',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:DESCRIPTION',
      onClick: this.handleMenuItemClick.bind(this, 'description'),
      route: 'description',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:REQUIREMENTS',
      onClick: this.handleMenuItemClick.bind(this, 'requirements'),
      route: 'requirements',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:LIMITS',
      onClick: this.handleMenuItemClick.bind(this, 'limits'),
      route: 'limits',
    },
    {
      title: 'CREATE-NEW-OPPORTUNITY-CONTAINER:MENU-ITEM:PUBLISHING-SETTINGS-OR-DELETE',
      onClick: this.handleMenuItemClick.bind(this, 'publish-settings'),
      route: 'publish-settings',
    },
  ];

  public componentDidMount() {
    this.setState({ selectedRoute: this.sideBarItems[0].route! }, () => {
      this.props.requestNewOpportunityId();
    });
  }

  public render() {
    const { requestNewOpportunityIdCommunication } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={requestNewOpportunityIdCommunication.isRequesting}>{this.renderContent()}</Preloader>
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
    const { translate: t } = this.props;
    return (
      <div className={b('left-side')}>
        <div className={b('left-side-opportunity-name')}>Working with code to track the movements of birds.</div>
        <div className={b('left-side-menu-caption')}>
          {t('CREATE-NEW-OPPORTUNITY-CONTAINER:STATIC:LEFT-SIDE-CAPTION').toUpperCase()}
        </div>
        <Sidebar
          routes={this.sideBarItems}
          selectedRoute={this.state.selectedRoute}
          onSelectRoute={this.handleSelectRoute}
        />
        <div className={b('left-side-actions')}>
          <Button type="submit" color="blue">
            {t('CREATE-NEW-OPPORTUNITY-CONTAINER:ACTIONS:SAVE-ALL-CHANGES')}
          </Button>
        </div>
        <div className={b('left-side-hint')}>{t('CREATE-NEW-OPPORTUNITY-CONTAINER:HINT:UNSAVED-CHANGES')}</div>
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
    } = this.props;
    return (
      <div className={b('right-side')}>
        <CreateOpportunityForm
          communication={createOpportunityCommunication}
          uploadImageCommunication={uploadOpportunityLogoCommunication}
          tags={this.props.tags}
          isPublished={false}
          uploadedImage={currentOpportunity ? currentOpportunity.profilePicture : undefined}
          uploadProgress={uploadOpportunityProgress || undefined}
          onChangePublishingState={this.handleChangePublishingState}
          onDelete={this.handleDeleteOpportunity}
          onUpload={this.handleLogoUpload}
        />
      </div>
    );
  }

  @bind
  private handleLogoUpload(logoFile: IImageFile) {
    this.props.uploadOpportunityLogo(logoFile);
  }

  @bind
  private handleChangePublishingState() {
    console.log('[handleChangePublishingState]');
  }

  @bind
  private handleDeleteOpportunity() {
    console.log('[handleDeleteOpportunity]');
  }

  @bind
  private handleMenuItemClick(anchor: TAnchor) {
    // console.log('anchor');
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.route! });
  }

  @bind
  private handleCreateOpportunitySubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, updateOpportunity } = this.props;

    handleSubmit(async data => {
      console.log('[handleCreateOpportunitySubmit] data: ', data);
      if (false) {
        updateOpportunity({
          ...data,
        });
      }
    })(e);
  }
}

const withForm = reduxForm<NS.ICreateOpportunityForm, ITranslateProps>({
  form: formName,
})(CreateNewOpportunityContainer);
const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  CreateNewOpportunityContainer.mapStateToProps,
  CreateNewOpportunityContainer.mapDispatch,
)(withForm);
export default i18nConnect<{}>(withRedux);
