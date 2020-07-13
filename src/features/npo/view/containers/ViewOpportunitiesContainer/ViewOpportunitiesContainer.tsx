import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { SearchInput } from 'shared/view/components';
import { Button, Preloader } from 'shared/view/elements';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { OpportunitiesGrid } from 'features/npo/view/components';

import './ViewOpportunitiesContainer.scss';

interface IOwnProps {
  onCreateNewOpportunity(): void;
  onViewOpportunity(opportunity: IOpportunityResponse): void;
}

interface IStateProps {
  loadOpportunitiesCommunication: ICommunication;
  organizationOpportunities: IOpportunityResponse[];
}

interface IActionProps {
  loadOpportunities: typeof actions.loadOpportunities;
}

interface IState {
  currentOpportunities: IOpportunityResponse[];
}

const b = block('view-opportunities-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class ViewOpportunitiesContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadOpportunitiesCommunication: selectors.selectCommunication(state, 'loadOpportunities'),
      organizationOpportunities: selectors.selectOrganizationOpportunities(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadOpportunities: actions.loadOpportunities,
      },
      dispatch,
    );
  }

  public state: IState = {
    currentOpportunities: this.props.organizationOpportunities,
  };

  public componentDidMount() {
    this.props.loadOpportunities();
  }

  public componentDidUpdate(prevProps: TProps) {
    const { organizationOpportunities } = this.props;

    if (
      (!prevProps.organizationOpportunities || !prevProps.organizationOpportunities.length) &&
      organizationOpportunities.length
    ) {
      this.setState({ currentOpportunities: organizationOpportunities });
    }
  }

  public render() {
    const { loadOpportunitiesCommunication } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={loadOpportunitiesCommunication.isRequesting} position="relative" size={14}>
          {this.renderContent()}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderContent() {
    const { translate: t } = this.props;
    const { currentOpportunities } = this.state;

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
        <OpportunitiesGrid
          opportunities={currentOpportunities}
          onCloseApplications={this.handleCloseApplication}
          onOpenApplications={this.handleOpenApplication}
          onViewOpportunity={this.handleViewOpportunity}
        />
      </>
    );
  }

  @bind
  private handleCloseApplication(opportunity: IOpportunityResponse) {
    console.log('[handleCloseApplication]', opportunity);
  }

  @bind
  private handleOpenApplication(opportunity: IOpportunityResponse) {
    console.log('[handleOpenApplication]', opportunity);
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.onViewOpportunity(opportunity);
  }

  @bind
  private handleSearchRequested(value: string) {
    const { organizationOpportunities } = this.props;
    if (value) {
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
    }
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  ViewOpportunitiesContainer.mapStateToProps,
  ViewOpportunitiesContainer.mapDispatch,
)(ViewOpportunitiesContainer);
export default i18nConnect<IOwnProps>(withRedux);
