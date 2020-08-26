import React from 'react';
import block from 'bem-cn';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { RouteComponentProps } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';

interface IFeatureProps {
  npoFeatureEntry: NPOFeatureEntry;
}

const b = block('npo-team-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & ITranslateProps & TRouteProps;

class NpoTeamModule extends React.PureComponent<TProps> {
  public render() {
    const { NpoTeamContainer } = this.props.npoFeatureEntry.containers;
    return (
      <div className={b()}>
        <NpoTeamContainer/>
      </div>
    );
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
})(NpoTeamModule);
export default i18nConnect<{}>(withFeatures);
