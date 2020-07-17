import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Preloader } from 'shared/view/elements';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { ErrorScreen, SingleOpportunityView } from 'shared/view/components';

import './ViewSingleOpportunityContainer.scss';

interface IOwnProps {
  opportunityId: string;
}

interface IStateProps {
  loadSingleOpportunityCommunication: ICommunication;
  currentOpportunity: IOpportunityResponse | null;
}

interface IActionProps {
  loadSingleOpportunity: typeof actions.loadSingleOpportunity;
  requestApplyOpportunity: typeof actions.requestApplyOpportunity;
}

const b = block('view-single-opportunity-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class ViewSingleOpportunityContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadSingleOpportunityCommunication: selectors.selectCommunication(state, 'loadSingleOpportunity'),
      currentOpportunity: selectors.selectCurrentOpportunity(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadSingleOpportunity: actions.loadSingleOpportunity,
      requestApplyOpportunity: actions.requestApplyOpportunity,
    }, dispatch);
  }

  public componentDidMount() {
    this.props.loadSingleOpportunity(this.props.opportunityId);
  }

  public render() {
    const { translate: t, loadSingleOpportunityCommunication, currentOpportunity } = this.props;

    if (loadSingleOpportunityCommunication.error) {
      return <ErrorScreen
        title={t('VIEW-SINGLE-OPPORTUNITY-CONTAINER:LOAD-OPPORTUNITY-ERROR:TITLE')}
        message={loadSingleOpportunityCommunication.error}
      />;
    }

    return (
      <div className={b()}>
        <Preloader isShow={loadSingleOpportunityCommunication.isRequesting} position="relative" size={14}>
          {currentOpportunity && (
            <SingleOpportunityView
              opportunity={currentOpportunity}
              onApply={this.handleApplyOpportunity}
            />
          )}
        </Preloader>
      </div>
    );
  }

  @bind
  private handleApplyOpportunity() {
    const { currentOpportunity } = this.props;
    this.props.requestApplyOpportunity(currentOpportunity!.id);
  }
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps & ITranslateProps>(
  ViewSingleOpportunityContainer.mapStateToProps,
  ViewSingleOpportunityContainer.mapDispatch,
)(ViewSingleOpportunityContainer);
export default i18nConnect<IOwnProps>(withRedux);
