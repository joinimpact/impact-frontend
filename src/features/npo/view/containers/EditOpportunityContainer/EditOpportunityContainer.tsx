import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { FormWarnings, getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState, ISideBarRoute } from 'shared/types/app';
import { ErrorScreen, OpportunitySidebar } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Preloader } from 'shared/view/elements';
import { EditOpportunityForm } from '../../components';
import { selectors as userSelectors } from 'services/user';
import { actions as npoActions, selectors as npoSelectors } from 'services/npo';
import { ICommunication } from 'shared/types/redux';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import * as NS from '../../../namespace';
import { createOpportunityFormEntry } from '../../../redux/reduxFormEntries';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IOpportunityResponse } from 'shared/types/responses/npo';

import './EditOpportunityContainer.scss';

interface IOwnProps {
	editOpportunityId?: string;
	onOpportunitySaved?(opportunityId: string): void;
	onGoToViewAllOpportunities(): void;
}

interface IStateProps {
	tags: string[];
	formValues: NS.ICreateOpportunityForm;
	newOpportunityId: string | null;
	uploadOpportunityProgress: number | null;
	requestNewOpportunityIdCommunication: ICommunication;
	loadSingleOpportunityCommunication: ICommunication;
	updateOpportunityCommunication: ICommunication;
	createOpportunityCommunication: ICommunication;
	uploadOpportunityLogoCommunication: ICommunication;
	currentOpportunity: IOpportunityResponse | null;
	publishOpportunityCommunication: ICommunication;
	unpublishOpportunityCommunication: ICommunication;
}

interface IActionProps {
	requestNewOpportunityId: typeof npoActions.requestNewOpportunityId;
	updateOpportunity: typeof npoActions.updateOpportunity;
	uploadOpportunityLogo: typeof npoActions.uploadOpportunityLogo;
	loadSingleOpportunity: typeof npoActions.loadSingleOpportunity;
	requestDeleteOpportunity: typeof actions.requestDeleteOpportunity;
	publishOpportunity: typeof npoActions.publishOpportunity;
	unpublishOpportunity: typeof npoActions.unpublishOpportunity;
}

interface IState {
	selectedRoute: string | null;
}

const b = block('create-new-opportunity-container');
const { name: formName } = createOpportunityFormEntry;

const formWarnValidator = (
	values: NS.ICreateOpportunityForm,
	props: TComponentProps,
): FormWarnings<NS.ICreateOpportunityForm> => {
	const { translate: t } = props;

	const result: FormWarnings<NS.ICreateOpportunityForm> = {};
	if (!values) {
		return result;
	}

	if (values.title && values.title.length < 4) {
		result.title = t('EDIT-OPPORTUNITY-CONTAINER:WARN:NOT-READY-FOR-PUBLISH');
	}

	if (values.description && values.description.length < 64) {
		result.description = t('EDIT-OPPORTUNITY-CONTAINER:WARN:NOT-READY-FOR-PUBLISH');
	}

	return result;
};

type TComponentProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;
type TProps = TComponentProps & InjectedFormProps<NS.ICreateOpportunityForm, TComponentProps>;

class EditOpportunityContainer extends React.PureComponent<TProps, IState> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			tags: userSelectors.selectTags(state),
			formValues: getFormValues(formName)(state) as NS.ICreateOpportunityForm,
			newOpportunityId: npoSelectors.selectCurrentOpportunityId(state),
			currentOpportunity: npoSelectors.selectCurrentOpportunity(state),
			requestNewOpportunityIdCommunication: npoSelectors.selectCommunication(state, 'requestNewOpportunityId'),
			updateOpportunityCommunication: npoSelectors.selectCommunication(state, 'updateOpportunity'),
			createOpportunityCommunication: npoSelectors.selectCommunication(state, 'updateOpportunity'),
			uploadOpportunityLogoCommunication: npoSelectors.selectCommunication(state, 'uploadOpportunityLogo'),
			uploadOpportunityProgress: selectors.selectUploadLogoProgress(state),
			loadSingleOpportunityCommunication: npoSelectors.selectCommunication(state, 'loadSingleOpportunity'),
			publishOpportunityCommunication: npoSelectors.selectCommunication(state, 'publishOpportunity'),
			unpublishOpportunityCommunication: npoSelectors.selectCommunication(state, 'unpublishOpportunity'),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				requestNewOpportunityId: npoActions.requestNewOpportunityId,
				updateOpportunity: npoActions.updateOpportunity,
				uploadOpportunityLogo: npoActions.uploadOpportunityLogo,
				loadSingleOpportunity: npoActions.loadSingleOpportunity,
				requestDeleteOpportunity: actions.requestDeleteOpportunity,
				publishOpportunity: npoActions.publishOpportunity,
				unpublishOpportunity: npoActions.unpublishOpportunity,
			},
			dispatch,
		);
	}

	public state: IState = {
		selectedRoute: null,
	};

	public componentDidMount() {
		const { editOpportunityId } = this.props;
		if (editOpportunityId) {
			if (this.props.currentOpportunity) {
				this.initForm(this.props.currentOpportunity);
			}
			this.props.loadSingleOpportunity(editOpportunityId);
		} else {
			this.props.requestNewOpportunityId();
		}
	}

	public componentDidUpdate(prevProps: TProps) {
		const { editOpportunityId, currentOpportunity, updateOpportunityCommunication } = this.props;
		if (editOpportunityId && !prevProps.currentOpportunity && currentOpportunity) {
			this.initForm(currentOpportunity);
		}

		if (!prevProps.updateOpportunityCommunication.isLoaded && updateOpportunityCommunication.isLoaded) {
			this.props.onOpportunitySaved && this.props.onOpportunitySaved(currentOpportunity!.id);
		}
	}

	public render() {
		const { editOpportunityId } = this.props;

		if (editOpportunityId) {
			return this.renderEditMode();
		}

		return this.renderCreateNewMode();
	}

	@bind
	private renderEditMode() {
		const { loadSingleOpportunityCommunication } = this.props;
		return (
			<div className={b()}>
				<Preloader isShow={loadSingleOpportunityCommunication.isRequesting} position="relative" size={14}>
					{this.renderContent()}
				</Preloader>
			</div>
		);
	}

	@bind
	private renderCreateNewMode() {
		const { requestNewOpportunityIdCommunication } = this.props;
		return (
			<div className={b()}>
				<Preloader isShow={requestNewOpportunityIdCommunication.isRequesting} position="relative" size={14}>
					{this.renderContent()}
				</Preloader>
			</div>
		);
	}

	@bind
	private renderContent() {
		const { newOpportunityId } = this.props;

		if (!newOpportunityId) {
			return <ErrorScreen title="Error" message="Can't create new opportunity" />;
		}

		return (
			<form onSubmit={this.handleCreateOpportunitySubmit} className={b('create-opportunity-form')}>
				{this.renderLeftSide()}
				{this.renderRightSide()}
			</form>
		);
	}

	@bind
	private renderLeftSide() {
		const { currentOpportunity, valid } = this.props;
		return (
			<div className={b('left-side')}>
				<OpportunitySidebar
					submitDisabled={!valid}
					currentOpportunity={currentOpportunity}
					onGoToViewAllOpportunities={this.props.onGoToViewAllOpportunities}
					updateOpportunityCommunication={this.props.updateOpportunityCommunication}
					selectedRoute={this.state.selectedRoute}
					onSelectRoute={this.handleSelectRoute}
				/>
			</div>
		);
	}

	@bind
	private renderRightSide() {
		const {
			createOpportunityCommunication,
			uploadOpportunityLogoCommunication,
			uploadOpportunityProgress,
			currentOpportunity,
			publishOpportunityCommunication,
			unpublishOpportunityCommunication,
		} = this.props;

		return (
			<div className={b('right-side')}>
				<EditOpportunityForm
					communication={createOpportunityCommunication}
					invalidFields={formWarnValidator(this.props.formValues, this.props)}
					uploadImageCommunication={uploadOpportunityLogoCommunication}
					changingOpportunityPublishState={
						publishOpportunityCommunication.isRequesting || unpublishOpportunityCommunication.isRequesting
					}
					changingOpportunityPublishStateError={
						publishOpportunityCommunication.error || unpublishOpportunityCommunication.error
					}
					tags={this.props.tags}
					isPublished={currentOpportunity ? currentOpportunity.public : false}
					uploadedImage={currentOpportunity ? currentOpportunity.profilePicture : undefined}
					uploadProgress={uploadOpportunityProgress || undefined}
					onChangePublishingState={this.handleChangePublishingState}
					onDelete={this.handleDeleteOpportunity}
					onUpload={this.handleLogoUpload}
					onChangeCardInView={this.handleSetCurrentCardInView}
				/>
			</div>
		);
	}

	@bind
	private handleLogoUpload(logoFile: IImageFile) {
		this.props.uploadOpportunityLogo(logoFile);
	}

	@bind
	private handleSetCurrentCardInView(cardId: string) {
		this.setState({ selectedRoute: `#${cardId}` });
	}

	@bind
	private handleChangePublishingState() {
		const { currentOpportunity } = this.props;
		if (currentOpportunity) {
			if (currentOpportunity.public) {
				this.props.unpublishOpportunity(currentOpportunity.id);
			} else {
				this.props.publishOpportunity(currentOpportunity.id);
			}
		}
	}

	@bind
	private handleDeleteOpportunity() {
		const { currentOpportunity } = this.props;
		if (currentOpportunity) {
			this.props.requestDeleteOpportunity(currentOpportunity.id);
		}
	}

	@bind
	private handleSelectRoute(route: ISideBarRoute) {
		this.setState({ selectedRoute: route.route! });
	}

	@bind
	private handleCreateOpportunitySubmit(e: React.FormEvent<HTMLFormElement>) {
		const { handleSubmit, updateOpportunity } = this.props;

		handleSubmit(async (data) => {
			// console.log('[handleCreateOpportunitySubmit] data: ', data);
			updateOpportunity({
				...data,
			});
		})(e);
	}

	@bind
	private initForm(opportunity: IOpportunityResponse) {
		this.props.initialize({
			title: opportunity.title,
			description: opportunity.description,
			ageLimitEnabled: opportunity.requirements.ageLimit.active,
			minAge: opportunity.requirements.ageLimit.from,
			maxAge: opportunity.requirements.ageLimit.to,
			hoursPerWeekLimitEnabled: opportunity.requirements.expectedHours.active,
			hoursPerWeek: opportunity.requirements.expectedHours.hours,
			capLimitEnabled: opportunity.limits.volunteersCap.active,
			volunteersCap: opportunity.limits.volunteersCap.cap,
			published: opportunity.public,
			tags: opportunity.tags.map((tag) => tag.name),
		});
	}
}

const withForm = reduxForm<NS.ICreateOpportunityForm, TComponentProps>({
	form: formName,
	warn: formWarnValidator,
})(EditOpportunityContainer);
const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
	EditOpportunityContainer.mapStateToProps,
	EditOpportunityContainer.mapDispatch,
)(withForm);

export default i18nConnect<IOwnProps>(withRedux);
