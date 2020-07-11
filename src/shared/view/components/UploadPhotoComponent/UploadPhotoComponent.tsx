import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
// import { Icon } from 'shared/view/elements';
import { AvatarUploadDropzone } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { Image } from 'shared/view/elements';

import './UploadPhotoComponent.scss';

type TSize = 'medium' | 'large';

export interface IUploadPhotoChildProps {
  hasError?: boolean;
  isUploading: boolean;
  uploadProgress?: number;
}

interface IOwnProps {
  size?: TSize;
  uploadedImageUrl?: string | null;
  uploadProgress?: number;
  hasError?: boolean;
  children?: (props: IUploadPhotoChildProps) => JSX.Element;
  onUpload(file: IImageFile): void;
}

const b = block('upload-photo-component');

type TProps = IOwnProps & ITranslateProps;

class UploadPhotoComponent extends React.PureComponent<TProps> {
  public render() {
    const { size = 'medium', hasError, children, onUpload, uploadProgress } = this.props;
    return (
      <AvatarUploadDropzone onAvatarImageDrop={onUpload}>
        {children ? children({
          hasError,
          uploadProgress,
          isUploading: uploadProgress ? uploadProgress > 0 : false,
        }) : (
          <div className={b({ [size]: true })}>
            <div className={b('upload-zone', { error: !!hasError })}>
              {this.renderContent()}
            </div>
          </div>
        )}
      </AvatarUploadDropzone>
    );
  }

  @bind
  private renderContent() {
    const { uploadProgress, uploadedImageUrl, hasError } = this.props;

    if (hasError) {
      return (
        <div className={b('upload-zone-error-content')}>
          <i className="zi zi-exclamation-outline"/>
        </div>
      );
    }

    if (uploadProgress && uploadProgress > 0) {
      return (
        <div className={b('upload-progress')}>
          {uploadProgress} %
        </div>
      );
    }

    if (uploadedImageUrl) {
      return (
        <Image className={b('uploaded-image')} src={uploadedImageUrl}/>
      );
    }

    return (
      <>
        <div className={b('upload-zone-content')}>
          <i className="zi zi-user"/>
        </div>
        <div className={b('icon')}>
          <i className="zi zi-upload"/>
        </div>
      </>
    );
  }
}

export default i18nConnect<IOwnProps>(UploadPhotoComponent);
