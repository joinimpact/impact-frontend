import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { Button } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { UploadPhotoComponent } from 'shared/view/components';

import './UploadOrganizationLogoForm.scss';

interface IOwnProps {
  communication: ICommunication;
  uploadedImage?: string | null;
  uploadProgress?: number;
  onUpload(file: IImageFile): void;
  onSkip(): void;
  onNext(): void;
}

const b = block('upload-organization-logo-form');

type TProps = IOwnProps & ITranslateProps;

class UploadOrganizationLogoForm extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, communication, uploadProgress, uploadedImage, onSkip, onUpload, onNext } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('UPLOAD-ORGANIZATION-LOGO-FORM:STATIC:CAPTION')}
        </div>
        <div className={b('subtitle')}>
          {t('UPLOAD-ORGANIZATION-LOGO-FORM:STATIC:TITLE')}
        </div>

        <div className={b('avatar')}>
          <UploadPhotoComponent
            onUpload={onUpload}
            uploadedImageUrl={uploadedImage}
            uploadProgress={uploadProgress}
          />
        </div>

        <div className={b('actions')}>
          <Button color="grey" onClick={onSkip}>
            {t('SHARED:BUTTONS:SKIP')}
          </Button>

          <Button color="blue" isShowPreloader={communication.isRequesting} onClick={onNext}>
            {t('SHARED:BUTTONS:NEXT')}
          </Button>
        </div>

      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(UploadOrganizationLogoForm);
