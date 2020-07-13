import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { RouteComponentProps, withRouter } from 'react-router';
import { IAppReduxState } from 'shared/types/app';
import { selectors as npoSelectors } from 'services/npo';
import { Preloader } from 'shared/view/elements';

import './CreateOpportunityModule.scss';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
}

const b = block('create-opportunity-module');

type TProps = IFeatureProps & IStateProps & ITranslateProps & RouteComponentProps<{}>;

class CreateOpportunityModule extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
    };
  }

  public render() {
    const { CreateNewOpportunityContainer } = this.props.npoFeatureEntry.containers;
    const { isNpoServiceReady } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={!isNpoServiceReady} position="relative" size={14}>
          <CreateNewOpportunityContainer/>
        </Preloader>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(CreateOpportunityModule);
const withRedux = connect<IStateProps>(
  CreateOpportunityModule.mapStateToProps,
)(withFeatures);
const i18nConnected = i18nConnect(withRedux);
export default withRouter(i18nConnected);
