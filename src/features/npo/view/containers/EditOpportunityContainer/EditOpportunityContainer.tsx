import React from 'react';
import block from 'bem-cn';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { ICommunication } from 'shared/types/redux';
import * as actions from 'features/npo/redux/actions';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as selectors from 'features/npo/redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';

import './EditOpportunityContainer.scss';

interface IOwnProps {
  opportunityId: string;
  onGoToAllOpportunities(): void;
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

const b = block('edit-opportunity-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class EditOpportunityContainer extends React.PureComponent<TProps> {
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

  public render() {
    return (
      <div className={b()}>
        Edit opportunity
      </div>
    );
  }
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps & ITranslateProps>(
  EditOpportunityContainer.mapStateToProps,
  EditOpportunityContainer.mapDispatch,
)(EditOpportunityContainer);
export default i18nConnect<IOwnProps>(withRedux);
