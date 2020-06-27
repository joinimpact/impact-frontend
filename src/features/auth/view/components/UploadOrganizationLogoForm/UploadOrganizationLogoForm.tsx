import React from 'react';
import block from 'bem-cn';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { Button, Icon } from 'shared/view/elements';
import { ICommunication } from 'shared/types/redux';
import { AvatarUploadDropzone } from 'shared/view/components';

import './UploadOrganizationLogoForm.scss';

interface IOwnProps {
  communication: ICommunication;
  onUpload(file: IImageFile): void;
  onSkip(): void;
  onNext(): void;
}

const b = block('upload-organization-logo-form');

type TProps = IOwnProps & ITranslateProps;

class UploadOrganizationLogoForm extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, communication, onSkip, onUpload, onNext } = this.props;
    return (
      <div className={b()}>
        <div className={b('caption')}>
          {t('UPLOAD-ORGANIZATION-LOGO-FORM:STATIC:CAPTION')}
        </div>
        <div className={b('subtitle')}>
          {t('UPLOAD-ORGANIZATION-LOGO-FORM:STATIC:TITLE')}
        </div>

        <div className={b('upload-zone-row')}>
          <div className={b('upload-zone')}>
            <AvatarUploadDropzone onAvatarImageDrop={onUpload}>
              <div className={b('upload-zone-content')}>
                {t('UPLOAD-ORGANIZATION-LOGO-FORM:STATIC:PHOTO-PLACEHOLDER')}
              </div>
            </AvatarUploadDropzone>
            <Icon className={b('upload-zone-icon')} src={require('shared/view/images/camera-inline.svg')}/>
          </div>
        </div>

        <div className={b('actions')}>
          <Button color="blue" onClick={onSkip}>
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
