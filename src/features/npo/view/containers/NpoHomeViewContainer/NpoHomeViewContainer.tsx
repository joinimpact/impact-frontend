import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IUser } from 'shared/types/models/user';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';
import { OpportunitiesGrid, OrganizationMembersGrid } from 'shared/view/components';
import { ICommunication } from 'shared/types/redux';
import { selectors as npoSelectors, actions as npoActions } from 'services/npo';
import { IOpportunityResponse, IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { Button, Preloader } from 'shared/view/elements';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { IOrganizationMembersResponse } from 'shared/types/responses/volunteer';
import routes from 'modules/routes';

import './NpoHomeViewContainer.scss';

interface IOwnProps {
  onCreateNewOpportunity(): void;

  onViewOpportunity(opportunity: IOpportunityResponse): void;
}

interface IStateProps {
  currentUser: IUser | null;
  organizationOpportunities: IOpportunityResponse[];
  loadOpportunitiesCommunication: ICommunication;
  publishOpportunityCommunication: ICommunication;
  unpublishOpportunityCommunication: ICommunication;
  currentOrganization: IOrganizationsResponseItem | null;
  loadOrganizationMembersCommunication: ICommunication;
  organizationMembers: IOrganizationMembersResponse | null;
}

interface IActionProps {
  loadOpportunities: typeof npoActions.loadOpportunities;
  publishOpportunity: typeof npoActions.publishOpportunity;
  unpublishOpportunity: typeof npoActions.unpublishOpportunity;
  loadOrganizationMembers: typeof actions.loadOrganizationMembers;
}

interface IState {
  updatingOpportunityId: string | null;
}

const b = block('npo-home-view-container');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps & TRouteProps;

class NpoHomeViewContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      organizationOpportunities: npoSelectors.selectOrganizationOpportunities(state),
      loadOpportunitiesCommunication: npoSelectors.selectCommunication(state, 'loadOpportunities'),
      publishOpportunityCommunication: npoSelectors.selectCommunication(state, 'publishOpportunity'),
      unpublishOpportunityCommunication: npoSelectors.selectCommunication(state, 'unpublishOpportunity'),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      loadOrganizationMembersCommunication: selectors.selectCommunication(state, 'loadOrganizationMembers'),
      organizationMembers: selectors.selectOrganizationMembers(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadOpportunities: npoActions.loadOpportunities,
        publishOpportunity: npoActions.publishOpportunity,
        unpublishOpportunity: npoActions.unpublishOpportunity,
        loadOrganizationMembers: actions.loadOrganizationMembers,
      },
      dispatch,
    );
  }

  public state: IState = {
    updatingOpportunityId: null,
  };

  public componentDidMount() {
    this.loadOpportunities();
    this.props.loadOrganizationMembers();
  }

  public render() {
    const {
      translate: t,
      currentUser,
      organizationOpportunities,
      publishOpportunityCommunication,
      unpublishOpportunityCommunication,
      loadOpportunitiesCommunication,
      organizationMembers,
    } = this.props;
    return (
      <div className={b()}>
        <div className={b('top-info-bar')}>
          <div className={b('top-info-bar-content')}>
            {t('NPO-HOME-VIEW-CONTAINER:STATIC:TOP-INFO')}
          </div>
        </div>
        <div className={b('top-pane')}>
          {t('NPO-HOME-VIEW-CONTAINER:STATIC:GREETING', {
            username: <span key="name" className={b('top-pane-user-name')}>{currentUser!.firstName}</span>,
          })}
        </div>
        <div className={b('opportunities')}>
          <div className={b('opportunities-top-pane')}>
            <div className={b('opportunities-top-pane-title')}>
              {t('NPO-HOME-VIEW-CONTAINER:STATIC:YOUR-OPPORTUNITIES')}
            </div>
            <div className={b('opportunities-top-pane-actions')}>
              <Button color="blue" onClick={this.props.onCreateNewOpportunity}>
                {t('NPO-HOME-VIEW-CONTAINER:BUTTON:NEW-OPPORTUNITY')}
              </Button>
            </div>
          </div>
          <Preloader isShow={loadOpportunitiesCommunication.isRequesting} position="relative" size={14}>
            <OpportunitiesGrid
              opportunities={organizationOpportunities}
              updateOpportunityId={this.state.updatingOpportunityId}
              isUpdating={
                publishOpportunityCommunication.isRequesting || unpublishOpportunityCommunication.isRequesting
              }
              onCloseApplications={this.handleCloseApplication}
              onOpenApplications={this.handleOpenApplication}
              onViewOpportunity={this.handleViewOpportunity}
            />
          </Preloader>
        </div>
        <div className={b('team')}>
          <div className={b('team-top-pane')}>
            <div className={b('team-top-pane-title')}>{t('NPO-HOME-VIEW-CONTAINER:STATIC:ORGANIZATION-TEAM')}</div>
            <div className={b('team-top-pane-actions')}>
              <Button color="blue">{t('NPO-HOME-VIEW-CONTAINER:BUTTON:VIEW-MORE')}</Button>
            </div>
          </div>
          <div className={b('team-cpntent')}>
            {Boolean(organizationMembers) && (
              <OrganizationMembersGrid
                members={organizationMembers!.members}
                onViewUser={this.handleGoToViewUser}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleCloseApplication(opportunity: IOpportunityResponse) {
    this.setState({ updatingOpportunityId: opportunity.id }, () => {
      this.props.unpublishOpportunity(opportunity.id);
    });
  }

  @bind
  private handleOpenApplication(opportunity: IOpportunityResponse) {
    this.setState({ updatingOpportunityId: opportunity.id }, () => {
      this.props.publishOpportunity(opportunity.id);
    });
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.onViewOpportunity(opportunity);
  }

  @bind
  private loadOpportunities() {
    this.props.loadOpportunities({
      limit: 20,
      page: 0,
    });
  }

  @bind
  private handleGoToViewUser(userId: string) {
    this.props.history.push(`${routes.dashboard.user.profile.view.getPath()}/${userId}`);
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
  NpoHomeViewContainer.mapStateToProps,
  NpoHomeViewContainer.mapDispatch,
)(NpoHomeViewContainer);
export default i18nConnect<IOwnProps>(withRouter(withRedux));
