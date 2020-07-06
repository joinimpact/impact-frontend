import React from 'react';
import block from 'bem-cn';
// import { Icon } from 'shared/view/elements';
import { AvatarUploadDropzone } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';

import './UploadPhotoComponent.scss';
import { bind } from 'decko';

type TSize = 'medium' | 'large';

interface IOwnProps {
  size?: TSize;
  uploadedImageUrl?: string;
  uploadProgress?: number;
  onUpload(file: IImageFile): void;
}

const b = block('upload-photo-component');

type TProps = IOwnProps & ITranslateProps;

class UploadPhotoComponent extends React.PureComponent<TProps> {
  public render() {
    const { size = 'medium', onUpload } = this.props;
    return (
      <div className={b({ [size]: true })}>
        <div className={b('upload-zone')}>
          <AvatarUploadDropzone onAvatarImageDrop={onUpload}>
            {this.renderContent()}
            {/*<Icon
              className={b('icon', { [size]: true })}
              src={require('shared/view/images/camera-inline.svg')}
            />*/}
          </AvatarUploadDropzone>
        </div>
      </div>
    );
  }

  @bind
  private renderContent() {
    const { uploadProgress, uploadedImageUrl } = this.props;

    if (uploadProgress && uploadProgress > 0) {
      return (
        <div className={b('upload-progress')}>
          {uploadProgress} %
        </div>
      );
    }

    if (uploadedImageUrl) {
      return (
        <img className={b('uploaded-image')} src={uploadedImageUrl}/>
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
