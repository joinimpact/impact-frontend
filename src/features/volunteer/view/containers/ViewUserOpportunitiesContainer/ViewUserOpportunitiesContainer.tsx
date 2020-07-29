import React from 'react';
import block from 'bem-cn';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { ICommunication } from 'shared/types/redux';
import * as actions from 'features/volunteer/redux/actions';
import { IAppReduxState } from 'shared/types/app';
import * as selectors from 'features/volunteer/redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Preloader } from 'shared/view/elements';
import { OpportunitiesGrid } from 'shared/view/components';
import { bind } from 'decko';

import './ViewUserOpportunitiesContainer.scss';

interface IOwnProps {
  onViewOpportunityClicked(opportunityId: string): void;
  onGoToBrowse(): void;
}

interface IStateProps {
  loadEnrolledOpportunitiesCommunication: ICommunication;
  currentEnrolledOpportunities: IOpportunityResponse[];
}

interface IActionProps {
  loadEnrolledOpportunities: typeof actions.loadEnrolledOpportunities;
}

const b = block('view-user-opportunities-container');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class ViewUserOpportunitiesContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadEnrolledOpportunitiesCommunication: selectors.selectCommunication(state, 'loadUserEnrolledOpportunities'),
      currentEnrolledOpportunities: selectors.selectCurrentEnrolledOpportunities(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadEnrolledOpportunities: actions.loadEnrolledOpportunities,
      },
      dispatch,
    );
  }

  public componentDidMount() {
    this.props.loadEnrolledOpportunities();
  }

  public render() {
    const { translate: t, loadEnrolledOpportunitiesCommunication, currentEnrolledOpportunities } = this.props;
    return (
      <div className={b()}>
        <div className={b('top')}>
          <div className={b('top-title')}>
            {t('VIEW-USER-OPPORTUNITIES-CONTAINER:STATIC:TITLE')}
          </div>
          <div className={b('top-actions')}>
            <Button color="blue" onClick={this.props.onGoToBrowse}>
              {t('VIEW-USER-OPPORTUNITIES-CONTAINER:ACTION:VIEW-MORE')}
            </Button>
          </div>
        </div>
        <div className={b('content')}>
          <Preloader isShow={loadEnrolledOpportunitiesCommunication.isRequesting} position="relative" size={14}>
            <OpportunitiesGrid
              viewOnClick
              opportunities={currentEnrolledOpportunities}
              onViewOpportunity={this.handleViewOpportunity}
            />
          </Preloader>
        </div>
      </div>
    );
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.onViewOpportunityClicked(opportunity.id);
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  ViewUserOpportunitiesContainer.mapStateToProps,
  ViewUserOpportunitiesContainer.mapDispatch,
)(ViewUserOpportunitiesContainer);
export default i18nConnect<IOwnProps>(withRedux);
