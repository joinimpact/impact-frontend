import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import routes from 'modules/routes';

interface IFeatureProps {
	volunteerFeatureEntry: VolunteerFeatureEntry;
}

const b = block('user-calendar-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & TRouteProps & ITranslateProps;

class UserCalendarModule extends React.PureComponent<TProps> {
	public render() {
		const { UserCalendarContainer } = this.props.volunteerFeatureEntry.containers;
		return (
			<div className={b()}>
				<UserCalendarContainer onGoToViewOpportunity={this.handleGoToViewOpportunity} />
			</div>
		);
	}

	@bind
	private handleGoToViewOpportunity(opportunityId: string) {
		this.props.history.push(`${routes.dashboard.user.opportunities.view.getPath()}/${opportunityId}`);
	}
}

const withFeatures = withAsyncFeatures({
	volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(UserCalendarModule);
export default withRouter(i18nConnect<TRouteProps>(withFeatures));
