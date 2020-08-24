import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { OpportunitiesGrid, SearchInput } from 'shared/view/components';
import { Button, Preloader } from 'shared/view/elements';
import { IOpportunityResponse, IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { selectors as npoSelectors, actions as npoActions } from 'services/npo';

import './ViewOpportunitiesContainer.scss';

interface IOwnProps {
  onCreateNewOpportunity(): void;

  onViewOpportunity(opportunity: IOpportunityResponse): void;
}

interface IStateProps {
  loadOpportunitiesCommunication: ICommunication;
  organizationOpportunities: IOpportunityResponse[];
  publishOpportunityCommunication: ICommunication;
  unpublishOpportunityCommunication: ICommunication;
  currentOrganization: IOrganizationsResponseItem | null;
}

interface IActionProps {
  loadOpportunities: typeof npoActions.loadOpportunities;
  publishOpportunity: typeof npoActions.publishOpportunity;
  unpublishOpportunity: typeof npoActions.unpublishOpportunity;
}

interface IState {
  updatingOpportunityId: string | null;
}

const b = block('view-opportunities-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class ViewOpportunitiesContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadOpportunitiesCommunication: npoSelectors.selectCommunication(state, 'loadOpportunities'),
      organizationOpportunities: npoSelectors.selectOrganizationOpportunities(state),
      publishOpportunityCommunication: npoSelectors.selectCommunication(state, 'publishOpportunity'),
      unpublishOpportunityCommunication: npoSelectors.selectCommunication(state, 'unpublishOpportunity'),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadOpportunities: npoActions.loadOpportunities,
        publishOpportunity: npoActions.publishOpportunity,
        unpublishOpportunity: npoActions.unpublishOpportunity,
      },
      dispatch,
    );
  }

  public state: IState = {
    updatingOpportunityId: null,
  };

  public componentDidUpdate(prevProps: TProps) {
    const { currentOrganization } = this.props;
    if (
      currentOrganization &&
      prevProps.currentOrganization &&
      currentOrganization.id !== prevProps.currentOrganization.id
    ) {
      this.loadOpportunities();
    }
  }

  public componentDidMount() {
    this.loadOpportunities();
  }

  public render() {
    return <div className={b()}>{this.renderContent()}</div>;
  }

  @bind
  private renderContent() {
    const {
      translate: t,
      organizationOpportunities,
      loadOpportunitiesCommunication,
      publishOpportunityCommunication,
      unpublishOpportunityCommunication,
    } = this.props;

    return (
      <>
        <div className={b('top')}>
          <div className={b('top-title')}>{t('VIEW-OPPORTUNITIES-CONTAINER:STATIC:TITLE')}</div>
          <div className={b('top-actions')}>
            <Button color="blue" onClick={this.props.onCreateNewOpportunity}>
              {t('VIEW-OPPORTUNITIES-CONTAINER:BUTTON:NEW-OPPORTUNITY')}
            </Button>
          </div>
        </div>
        <div className={b('search-bar')}>
          <SearchInput
            withSearchIcon
            placeholder={t('VIEW-OPPORTUNITIES-CONTAINER:PLACEHOLDER:SEARCH')}
            onSearchRequested={this.handleSearchRequested}
          />
        </div>
        <Preloader isShow={loadOpportunitiesCommunication.isRequesting} position="relative" size={14}>
          <OpportunitiesGrid
            opportunities={organizationOpportunities}
            updateOpportunityId={this.state.updatingOpportunityId}
            isUpdating={publishOpportunityCommunication.isRequesting || unpublishOpportunityCommunication.isRequesting}
            onCloseApplications={this.handleCloseApplication}
            onOpenApplications={this.handleOpenApplication}
            onViewOpportunity={this.handleViewOpportunity}
          />
        </Preloader>
      </>
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
  private handleSearchRequested(value: string) {
    // const { organizationOpportunities } = this.props;
    this.props.loadOpportunities({
      page: 0,
      limit: 30,
      query: value,
    });

    /*if (value) {
      const valueLower = value.toLowerCase();
      this.setState({
        currentOpportunities: organizationOpportunities.filter(opportunity => {
          return opportunity.title.toLowerCase().indexOf(valueLower) >= 0;
        }),
      });
    } else {
      this.setState({
        currentOpportunities: organizationOpportunities,
      });
    }*/
  }

  @bind
  private loadOpportunities() {
    this.props.loadOpportunities({
      limit: 20,
      page: 0,
    });
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  ViewOpportunitiesContainer.mapStateToProps,
  ViewOpportunitiesContainer.mapDispatch,
)(ViewOpportunitiesContainer);
export default i18nConnect<IOwnProps>(withRedux);
