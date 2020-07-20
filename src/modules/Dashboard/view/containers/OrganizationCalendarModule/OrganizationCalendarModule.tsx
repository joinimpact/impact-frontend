import React from 'react';
import block from 'bem-cn';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as npoSelectors } from 'services/npo';
import { IAppReduxState } from 'shared/types/app';

import './OrganizationCalendarModule.scss';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
}

const b = block('organization-calendar-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class OrganizationCalendarModule extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
    };
  }

  public render() {
    const { NpoOrganizationCalendarContainer } = this.props.npoFeatureEntry.containers;
    return (
      <div className={b()}>
        <NpoOrganizationCalendarContainer/>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(OrganizationCalendarModule);
const withRedux = connect<IStateProps, null, TRouteProps>(
  OrganizationCalendarModule.mapStateToProps,
)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
