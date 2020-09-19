import React from 'react';
import block from 'bem-cn';
import { ICommunication } from 'shared/types/redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { preventDefaultStubHandler } from 'shared/helpers/stubs';
import { IUploadPhotoChildProps } from 'shared/view/components/UploadPhotoComponent/UploadPhotoComponent';
import { Button, Card, Image, Preloader } from 'shared/view/elements';
import { UploadPhotoComponent } from 'shared/view/components';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';

import './EditOrganizatioPictureForm.scss';

interface IOwnProps {
	uploadImageCommunication: ICommunication;
	uploadedImage?: string | null;
	uploadProgress?: number;
	onUpload(file: IImageFile): void;
	onGoToNext(): void;
}

const b = block('edit-organization-picture-form');

type TProps = IOwnProps & ITranslateProps;

class EditOrganizationPictureForm extends React.PureComponent<TProps> {
	public render() {
		const { translate: t } = this.props;
		return (
			<div className={b()}>
				<div className={b('content')}>
					<Card
						className={b('card')}
						title={t('EDIT-ORGANIZATION-FORM:TITLE:ORGANIZATION-PICTURE')}
						footer={
							<div className={b('card-footer')}>
								<div>{t('EDIT-ORGANIZATION-FORM:CARD:ORGANIZATION-PICTURE-FOOTER')}</div>
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
						<div className={b('card-body')}>{t('EDIT-ORGANIZATION-FORM:CARD:ORGANIZATION-PICTURE-BODY')}</div>

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
					<div className={b('actions')}>
						<Button
							color="blue"
							isShowPreloader={this.props.uploadImageCommunication.isRequesting}
							onClick={this.props.onGoToNext}
						>
							{t('SHARED:BUTTONS:CONTINUE')}
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default i18nConnect<IOwnProps>(EditOrganizationPictureForm);
