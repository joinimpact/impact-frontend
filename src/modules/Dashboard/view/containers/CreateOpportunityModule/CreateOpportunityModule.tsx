import React from 'react';
import block from 'bem-cn';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { RouteComponentProps, withRouter } from 'react-router';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

const b = block('create-opportunity-module');

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class CreateOpportunityModule extends React.PureComponent<TProps> {
  public render() {
    const { CreateNewOpportunityContainer } = this.props.npoFeatureEntry.containers;
    return (
      <div className={b()}>
        <CreateNewOpportunityContainer/>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(CreateOpportunityModule);
const i18nConnected = i18nConnect(withFeatures);
export default withRouter(i18nConnected);
