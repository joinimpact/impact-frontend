import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Button, Card, Image, Preloader } from 'shared/view/elements';
import { editProfileForm } from 'features/volunteer/redux/reduxFormEntries';
import { FormWarnings } from 'redux-form';
import * as NS from '../../../namespace';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { ICommunication } from 'shared/types/redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { preventDefaultStubHandler } from 'shared/helpers/stubs';
import { IUploadPhotoChildProps } from 'shared/view/components/UploadPhotoComponent/UploadPhotoComponent';
import { UploadPhotoComponent } from 'shared/view/components';
import { required } from 'shared/helpers/validators';
import { InputBaseField } from 'shared/view/redux-form';
import { InputBaseFieldWrapper, SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { UserProfileDetailsCardForm } from 'features/volunteer/view/components/index';

import './UserEditProfileForm.scss';

interface IOwnProps {
	currentValues: NS.IEditProfileForm;
	saveCommunication: ICommunication;
	invalidFields: FormWarnings<NS.IEditProfileForm>;
	uploadImageCommunication: ICommunication;
	uploadedImage?: string | null;
	uploadProgress?: number;
	tags: string[];
	onUpload(file: IImageFile): void;
	onRequestDelete(e: React.MouseEvent): void;
}

interface IState {
	editMode: boolean;
}

const b = block('user-edit-profile-form');

const { fieldNames } = editProfileForm;

type TCardId = 'profile-picture' | 'profile-details' | 'school-name' | 'interest' | 'delete-account';

const fields: TCardId[] = ['profile-picture', 'profile-details', 'school-name', 'interest', 'delete-account'];

type TProps = IOwnProps & ITranslateProps;

class UserEditProfileForm extends React.PureComponent<TProps, IState> {
	public state: IState = {
		editMode: false,
	};

	public componentDidUpdate(prevProps: TProps) {
		const { saveCommunication } = this.props;

		if (prevProps.saveCommunication.isRequesting && saveCommunication.isLoaded) {
			this.setState({ editMode: false });
		}
	}

	public render() {
		return <div className={b()}>{this.renderContent()}</div>;
	}

	@bind
	private renderContent() {
		return <div className={b('content')}>{fields.map(this.renderCard)}</div>;
	}

	@bind
	private renderCard(id: TCardId, index: number) {
		const { translate: t /* , invalidFields = {}*/ } = this.props;
		// const haveInvalidFields = Object.keys(invalidFields).length > 0;
		switch (id) {
			case 'profile-picture':
				return (
					<Card
						className={b('card')}
						title={t('USER-EDIT-PROFILE-FORM:TITLE:PROFILE-PICTURE')}
						key={`card-${index}`}
						footer={
							<div className={b('card-footer')}>
								<div>{t('USER-EDIT-PROFILE-FORM:CARD:PROFILE-PICTURE-FOOTER')}</div>
								<UploadPhotoComponent
									onUpload={this.props.onUpload}
									uploadedImageUrl={this.props.uploadedImage}
									uploadProgress={this.props.uploadProgress}
									hasError={Boolean(this.props.uploadImageCommunication.error)}
								>
									{(props: IUploadPhotoChildProps) => {
										return (
											<div className={b('card-title-file-upload')}>
												{t('EDIT-OPPORTUNITY-FORM:CARD:TITLE-NO-FILE-SELECTED')}
												<Button color="blue" size="small" onClick={preventDefaultStubHandler}>
													{t('EDIT-OPPORTUNITY-FORM:CARD:TITLE-SELECT-FILE')}
												</Button>
											</div>
										);
									}}
								</UploadPhotoComponent>
							</div>
						}
					>
						<div className={b('card-body')}>{t('USER-EDIT-PROFILE-FORM:CARD:PROFILE-PICTURE-BODY')}</div>

						<Preloader isShow={this.props.uploadImageCommunication.isRequesting} position="relative" size={14}>
							{this.props.uploadedImage && (
								<div className={b('banner-image')}>
									<Preloader isShow={this.props.uploadImageCommunication.isRequesting} position="relative">
										<Image src={this.props.uploadedImage} />
									</Preloader>
								</div>
							)}
						</Preloader>
					</Card>
				);
			case 'profile-details':
				return (
					<Card
						className={b('card')}
						key={`card-${index}`}
						header={
							<div className={b('profile-details-top')}>
								<div className={b('profile-details-top-title')}>
									{t('USER-EDIT-PROFILE-FORM:TITLE:PROFILE-DETAILS')}
								</div>
								<div className={b('profile-details-top-actions')}>
									<div className={b('pencil-btn')} onClick={this.handleChangeEditMode}>
										<i className="zi zi-edit-pencil" />
									</div>
								</div>
							</div>
						}
					>
						<UserProfileDetailsCardForm values={this.props.currentValues} editMode={this.state.editMode} />
					</Card>
				);
			case 'school-name':
				return (
					<Card
						className={b('card')}
						key={`card-${index}`}
						title={t('USER-EDIT-PROFILE-FORM:TITLE:SCHOOL-NAME')}
						footer={t('USER-EDIT-PROFILE-FORM:CARD:SCHOOL-NAME-FOOTER')}
					>
						<div className={b('card-body')}>{t('USER-EDIT-PROFILE-FORM:CARD:SCHOOL-NAME-BODY')}</div>
						<InputBaseFieldWrapper component={InputBaseField} name={fieldNames.school} validate={[required]} />
					</Card>
				);
			case 'interest':
				return (
					<Card
						className={b('card')}
						key={`card-${index}`}
						title={t('USER-EDIT-PROFILE-FORM:TITLE:INTEREST-TAGS')}
						footer={t('USER-EDIT-PROFILE-FORM:CARD:INTEREST-TAGS-FOOTER')}
					>
						<div className={b('card-body')}>{t('USER-EDIT-PROFILE-FORM:CARD:INTEREST-TAGS-BODY')}</div>

						<div className={b('field')}>
							<SelectFieldWrapper
								isMulti
								component={SelectField}
								name={fieldNames.tags}
								placeholder={t('USER-EDIT-PROFILE-FORM:PLACEHOLDER:TAGS')}
								options={this.props.tags}
								validate={[required]}
							/>
						</div>
					</Card>
				);
			case 'delete-account':
				return (
					<Card
						className={b('card')}
						key={`card-${index}`}
						title={t('USER-EDIT-PROFILE-FORM:TITLE:DELETE-ACCOUNT')}
						footer={t('USER-EDIT-PROFILE-FORM:CARD:DELETE-ACCOUNT-FOOTER')}
					>
						<div className={b('card-body')}>{t('USER-EDIT-PROFILE-FORM:CARD:DELETE-ACCOUNT-BODY')}</div>

						<div className={b('delete-action')}>
							<Button color="light-red" onClick={this.props.onRequestDelete}>
								{t('USER-EDIT-PROFILE-FORM:ACTIONS:DELETE-ACCOUNT')}
							</Button>
						</div>
					</Card>
				);
		}
	}

	@bind
	private handleChangeEditMode() {
		this.setState({ editMode: !this.state.editMode });
	}
}

export default i18nConnect<IOwnProps>(UserEditProfileForm);
