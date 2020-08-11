import React from 'react';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { connect } from 'react-redux';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
}

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;


class OrganizationMessagesModule extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
    };
  }

  public render() {
    const { NpoMessagesContainer } = this.props.npoFeatureEntry.containers;
    return (
      <NpoMessagesContainer/>
    );
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(OrganizationMessagesModule);
const withRedux = connect<IStateProps, null, TRouteProps>(
  OrganizationMessagesModule.mapStateToProps,
)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
