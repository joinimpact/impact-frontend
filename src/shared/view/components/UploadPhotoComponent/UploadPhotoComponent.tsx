import React from 'react';
import block from 'bem-cn';
// import { Icon } from 'shared/view/elements';
import { AvatarUploadDropzone } from 'shared/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';

import './UploadPhotoComponent.scss';

type TSize = 'medium' | 'large';

interface IOwnProps {
  size?: TSize;
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
            <div className={b('upload-zone-content')}>
              <i className="zi zi-upload"/>
            </div>
            {/*<Icon
              className={b('icon', { [size]: true })}
              src={require('shared/view/images/camera-inline.svg')}
            />*/}
          </AvatarUploadDropzone>
        </div>
      </div>
    );
  }
}

export default i18nConnect<IOwnProps>(UploadPhotoComponent);
