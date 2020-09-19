import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import { IAppReduxState } from 'shared/types/app';
import { selectors as npoSelectors } from 'services/npo';

interface IFeatureProps {
	npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
	isNpoServiceReady: boolean;
}

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & ITranslateProps & TRouteProps;

class OrganizationVolunteersModule extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
		};
	}

	public render() {
		const { NpoVolunteersContainer } = this.props.npoFeatureEntry.containers;
		return <NpoVolunteersContainer />;
	}
}

const withFeatures = withAsyncFeatures({
	npoFeatureEntry: npoFeatureLoadEntry,
})(OrganizationVolunteersModule);
const withRedux = connect<IStateProps, null, TRouteProps>(OrganizationVolunteersModule.mapStateToProps)(withFeatures);
export default withRouter(i18nConnect<TRouteProps>(withRedux));
