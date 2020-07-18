import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IUser } from 'shared/types/models/user';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';
import { OpportunitiesGrid } from 'shared/view/components';
import { ICommunication } from 'shared/types/redux';
import * as actions from 'features/npo/redux/actions';
import * as selectors from 'features/npo/redux/selectors';
import { selectors as npoSelectors } from 'services/npo';
import { IOpportunityResponse, IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { Button, Preloader } from 'shared/view/elements';

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
}

interface IActionProps {
  loadOpportunities: typeof actions.loadOpportunities;
  publishOpportunity: typeof actions.publishOpportunity;
  unpublishOpportunity: typeof actions.unpublishOpportunity;
}

interface IState {
  updatingOpportunityId: string | null;
}

const b = block('npo-home-view-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class NpoHomeViewContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      organizationOpportunities: selectors.selectOrganizationOpportunities(state),
      loadOpportunitiesCommunication: selectors.selectCommunication(state, 'loadOpportunities'),
      publishOpportunityCommunication: selectors.selectCommunication(state, 'publicOpportunity'),
      unpublishOpportunityCommunication: selectors.selectCommunication(state, 'unpublishOpportunity'),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadOpportunities: actions.loadOpportunities,
        publishOpportunity: actions.publishOpportunity,
        unpublishOpportunity: actions.unpublishOpportunity,
      },
      dispatch,
    );
  }

  public state: IState = {
    updatingOpportunityId: null,
  };

  public componentDidMount() {
    this.loadOpportunities();
  }

  public render() {
    const {
      translate: t,
      currentUser,
      organizationOpportunities,
      publishOpportunityCommunication,
      unpublishOpportunityCommunication,
      loadOpportunitiesCommunication,
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
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
  NpoHomeViewContainer.mapStateToProps,
  NpoHomeViewContainer.mapDispatch,
)(NpoHomeViewContainer);
export default i18nConnect<IOwnProps>(withRedux);
