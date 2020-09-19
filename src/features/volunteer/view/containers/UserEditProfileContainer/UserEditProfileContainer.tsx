import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { FormWarnings, getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { INotifyProps, notifyConnect } from 'services/notify';
import { Button } from 'shared/view/elements';
import { UserEditProfileForm } from '../../components';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import * as NS from '../../../namespace';
import { editProfileForm } from '../../../redux/reduxFormEntries';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IUser } from 'shared/types/models/user';
import { selectors as userSelectors } from 'services/user';
import routes from 'modules/routes';

import './UserEditProfileContainer.scss';

interface IStateProps {
	tags: string[];
	formValues: NS.IEditProfileForm;
	currentUser: IUser | null;
	userTags: string[];
	editUserProfileCommunication: ICommunication;
	uploadLogoCommunication: ICommunication;
	uploadProgress: number | null;
}

interface IActionProps {
	editUserProfile: typeof actions.editUserProfile;
	uploadVolunteerLogo: typeof actions.uploadVolunteerLogo;
	requestDeleteAccount: typeof actions.requestDeleteAccount;
}

const b = block('user-edit-profile-container');
const { name: formName } = editProfileForm;

type TRouteProps = RouteComponentProps<{}>;
type TComponentProps = ITranslateProps & IStateProps & IActionProps & INotifyProps & TRouteProps;
type TProps = TComponentProps & InjectedFormProps<NS.IEditProfileForm, TComponentProps>;

const formWarnValidator = (values: NS.IEditProfileForm, props: TComponentProps): FormWarnings<NS.IEditProfileForm> => {
	const result: FormWarnings<NS.IEditProfileForm> = {};
	return result;
};

class UserEditProfileContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			tags: userSelectors.selectTags(state),
			formValues: getFormValues(formName)(state) as NS.IEditProfileForm,
			currentUser: userSelectors.selectCurrentUser(state),
			userTags: userSelectors.selectUserTags(state),
			editUserProfileCommunication: selectors.selectCommunication(state, 'editUserProfile'),
			uploadProgress: selectors.selectUploadProgress(state),
			uploadLogoCommunication: selectors.selectCommunication(state, 'uploadVolunteerLogo'),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				editUserProfile: actions.editUserProfile,
				uploadVolunteerLogo: actions.uploadVolunteerLogo,
				requestDeleteAccount: actions.requestDeleteAccount,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		const defaultValues = this.currentProfileValues;
		this.props.initialize({
			...defaultValues,
		});
	}

	public render() {
		const { translate: t, currentUser, initialized } = this.props;
		const currentProfileValues = this.currentProfileValues;
		return (
			<div className={b()}>
				<form onSubmit={this.handleSubmitUserProfile}>
					<div className={b('top')}>
						<div className={b('top-title')}>{t('USER-EDIT-PROFILE-CONTAINER:STATIC:EDIT-PROFILE')}</div>
						<div className={b('top-actions')}>
							<Button color="blue" type="submit" isShowPreloader={this.props.editUserProfileCommunication.isRequesting}>
								{t('SHARED:BUTTONS:SAVE')}
							</Button>
							<Button color="grey" onClick={this.handleViewProfileClicked}>
								{t('USER-EDIT-PROFILE-CONTAINER:ACTION:VIEW-PROFILE')}
							</Button>
						</div>
					</div>
					<div className={b('content')}>
						{currentProfileValues && initialized && (
							<UserEditProfileForm
								tags={this.props.tags}
								currentValues={currentProfileValues}
								saveCommunication={this.props.editUserProfileCommunication}
								uploadProgress={this.props.uploadProgress || undefined}
								uploadImageCommunication={this.props.uploadLogoCommunication}
								uploadedImage={currentUser ? currentUser.avatarUrl : undefined}
								onUpload={this.handleUploadUserAvatar}
								invalidFields={formWarnValidator(this.props.formValues, this.props)}
								onRequestDelete={this.handleRequestDeleteAccount}
							/>
						)}
					</div>
				</form>
			</div>
		);
	}

	private get currentProfileValues(): NS.IEditProfileForm | null {
		const { currentUser, userTags } = this.props;

		if (currentUser) {
			return {
				firstName: currentUser.firstName,
				lastName: currentUser.lastName,
				birthday: currentUser.dateOfBirth,
				email: currentUser.email,
				profilePicture: currentUser.avatarUrl as string,
				tags: userTags,
				school: currentUser.school || '',
				address: currentUser.location,
			};
		}

		return null;
	}

	@bind
	private handleUploadUserAvatar(logoFile: IImageFile) {
		this.props.uploadVolunteerLogo(logoFile);
	}

	@bind
	private handleSubmitUserProfile(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit } = this.props;

		handleSubmit(async (data) => {
			this.props.editUserProfile(data);
		})(e);
	}

	@bind
	private handleViewProfileClicked(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		this.props.history.push(routes.dashboard.user.profile.view.getPath());
	}

	@bind
	private handleRequestDeleteAccount(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		this.props.requestDeleteAccount();
	}
}

const withForm = reduxForm<NS.IEditProfileForm, TComponentProps>({
	form: formName,
})(UserEditProfileContainer);
const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
	UserEditProfileContainer.mapStateToProps,
	UserEditProfileContainer.mapDispatch,
)(withForm);
export default i18nConnect<{}>(notifyConnect(withRouter(withRedux)));
