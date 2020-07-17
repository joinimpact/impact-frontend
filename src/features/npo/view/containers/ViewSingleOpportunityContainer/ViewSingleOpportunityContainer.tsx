import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { IAppReduxState, ISideBarRoute } from 'shared/types/app';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { ErrorScreen, Sidebar, SingleOpportunityView } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Preloader } from 'shared/view/elements';

import './ViewSingleOpportunityContainer.scss';

interface IOwnProps {
  opportunityId: string;
  onGoToAllOpportunities(): void;
  onEditOpportunity(opportunity: IOpportunityResponse): void;
}

interface IStateProps {
  loadSingleOpportunityCommunication: ICommunication;
  currentOpportunity: IOpportunityResponse | null;
}

interface IActionProps {
  loadSingleOpportunity: typeof actions.loadSingleOpportunity;
}

interface IState {
  selectedRoute: string | null;
}

const b = block('view-single-opportunity-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class ViewSingleOpportunityContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadSingleOpportunityCommunication: selectors.selectCommunication(state, 'loadSingleOpportunity'),
      currentOpportunity: selectors.selectCurrentOpportunity(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadSingleOpportunity: actions.loadSingleOpportunity,
    }, dispatch);
  }

  public state: IState = {
    selectedRoute: null,
  };

  private sideBarItems: ISideBarRoute[] = [
    {
      title: 'VIEW-SINGLE-OPPORTUNITY-CONTAINER:MENU-ITEM:OVERVIEW',
      hashRoute: '#overview'
    },
    {
      title: 'VIEW-SINGLE-OPPORTUNITY-CONTAINER:MENU-ITEM:VOLUNTEERS',
      hashRoute: '#volunteers'
    },
    {
      title: 'VIEW-SINGLE-OPPORTUNITY-CONTAINER:MENU-ITEM:EVENTS',
      hashRoute: '#events'
    },
  ];

  public componentDidMount() {
    if (this.props.opportunityId) {
      this.props.loadSingleOpportunity(this.props.opportunityId);
    }
  }


  public render() {
    const { translate: t, loadSingleOpportunityCommunication, currentOpportunity } = this.props;
    if (!this.props.opportunityId) {
      return (
        <ErrorScreen
          title={t('SHARED:ERROR:PARAMETERS-NOT-ENOUGH')}
          message={t('SHARED:ERROR:NECESSARY-PARAMETER-NOT-FOUND', {
            name: 'opportunityId'
          })}
        />
      );
    }

    if (loadSingleOpportunityCommunication.error) {
      return (
        <ErrorScreen
          title={t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:ERROR:LOAD-OPPORTUNITY-ERROR')}
          message={loadSingleOpportunityCommunication.error}
        />
      );
    }

    return (
      <div className={b()}>
        <Preloader isShow={loadSingleOpportunityCommunication.isRequesting} position="relative" size={14}>
          {currentOpportunity ? (
            this.renderContent(currentOpportunity)
          ) : (
            <ErrorScreen
              title={t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:ERROR:OPPORTUNITY-NOT-EXISTS-TITLE')}
              message={t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:ERROR:OPPORTUNITY-NOE-EXISTS-MESSAGE')}
            />
          )}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderContent(opportunity: IOpportunityResponse) {
    const { translate: t } = this.props;
    return (
      <>
        <div className={b('left')}>
          <div className={b('back-link')} onClick={this.props.onGoToAllOpportunities}>
            <i className="zi zi-cheveron-left"/> {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:LINK:ALL-OPPORTUNITIES')}
          </div>
          {opportunity.title && (
            <div className={b('title')}>
              {opportunity.title}
            </div>
          )}
          <div className={b('manage')}>
            <div className={b('manage-title')}>
              {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:MENU:TITLE').toUpperCase()}
            </div>
            <Sidebar
              routes={this.sideBarItems}
              selectedRoute={this.state.selectedRoute}
              onSelectRoute={this.handleSelectRoute}
            />
          </div>
          <div className={b('actions')}>
            <Button color="grey" onClick={this.props.onEditOpportunity.bind(this, opportunity)}>
              {t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:BUTTON:EDIT-OPPORTUNITY')}
            </Button>
          </div>
        </div>

        <div className={b('right')}>
          <SingleOpportunityView
            opportunity={this.props.currentOpportunity!}
          />
        </div>
      </>
    );
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.route! });
  }
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps & ITranslateProps>(
  ViewSingleOpportunityContainer.mapStateToProps,
  ViewSingleOpportunityContainer.mapDispatch,
)(ViewSingleOpportunityContainer);
export default i18nConnect<IOwnProps>(withRedux);
