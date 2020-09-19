import React from 'react';
import block from 'bem-cn';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';

interface IFeatureProps {
	volunteerFeatureEntry: VolunteerFeatureEntry;
}

const b = block('user-edit-profile-module');

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & TRouteProps & ITranslateProps;

class UserEditProfileModule extends React.PureComponent<TProps> {
	public render() {
		const { UserEditProfileContainer } = this.props.volunteerFeatureEntry.containers;
		return (
			<div className={b()}>
				<UserEditProfileContainer />
			</div>
		);
	}
}

const withFeatures = withAsyncFeatures({
	volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(UserEditProfileModule);
export default withRouter(i18nConnect<TRouteProps>(withFeatures));
