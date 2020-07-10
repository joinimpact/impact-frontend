import React from 'react';
import block from 'bem-cn';
// import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';
import { Button, Card, Image, Link, Preloader, /*Select, */Toggle } from 'shared/view/elements';
import {
  CheckboxFieldWrapper,
  InputBaseFieldWrapper,
  MarkdownEditorFieldWrapper, SelectFieldWrapper,
} from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createOpportunityFormEntry } from '../../../redux/reduxFormEntries';
import { CheckboxField, InputBaseField, MarkdownEditorField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { UploadPhotoComponent } from 'shared/view/components';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IUploadPhotoChildProps } from 'shared/view/components/UploadPhotoComponent/UploadPhotoComponent';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';

import './CreateOpportunityForm.scss';

interface IOwnProps {
  communication: ICommunication;
  uploadImageCommunication: ICommunication;
  tags: string[];
  isPublished?: boolean;

  uploadedImage?: string | null;
  uploadProgress?: number;

  onChangePublishingState(): void;
  onDelete(): void;
  onUpload(file: IImageFile): void;
}

interface IState {
  tags: string[];
}

const b = block('create-opportunity-form');

const { fieldNames } = createOpportunityFormEntry;

type TProps = IOwnProps & ITranslateProps;

class CreateOpportunityForm extends React.PureComponent<TProps> {
  public state: IState = {
    tags: [],
  };

  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <Card
          showRequiredAsterisk
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:TITLE')}
          footer={t('CREATE-OPPORTUNITY-FORM:CARD:TITLE-FOOTER')}
        >
          <div className={b('card-body')}>{t('CREATE-OPPORTUNITY-FORM:CARD:TITLE-BODY')}</div>
          <InputBaseFieldWrapper
            component={InputBaseField}
            name={fieldNames.title}
            validate={[required]}
          />
        </Card>
        <Card
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:BANNER-IMAGE')}
          footer={
            <div className={b('card-footer')}>
              <div>
                {t('CREATE-OPPORTUNITY-FORM:CARD:BANNER-FOOTER')}
              </div>
              <UploadPhotoComponent
                onUpload={this.props.onUpload}
                uploadedImageUrl={this.props.uploadedImage}
                uploadProgress={this.props.uploadProgress}
                hasError={Boolean(this.props.uploadImageCommunication.error)}
              >
                {(props: IUploadPhotoChildProps) => {
                  return (
                    <div className={b('card-title-file-upload')}>
                      {t('CREATE-OPPORTUNITY-FORM:CARD:TITLE-NO-FILE-SELECTED')}
                      <Button color="blue" size="small">
                        {t('CREATE-OPPORTUNITY-FORM:CARD:TITLE-SELECT-FILE')}
                      </Button>
                    </div>
                  );
                }}
              </UploadPhotoComponent>
            </div>
          }
        >
          <div className={b('card-body')}>
            {t('CREATE-OPPORTUNITY-FORM:CARD:BANNER-BODY')}
          </div>

          {(this.props.uploadedImage) && (
            <div className={b('banner-image')}>
              <Preloader isShow={this.props.uploadImageCommunication.isRequesting} position="relative">
                <Image src={this.props.uploadedImage}/>
              </Preloader>
            </div>
          )}
        </Card>
        <Card
          showRequiredAsterisk
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:TAGS')}
          footer={t('CREATE-OPPORTUNITY-FORM:CARD:TAGS-FOOTER')}
        >
          <div className={b('card-body')}>{t('CREATE-OPPORTUNITY-FORM:CARD:TAGS-BODY')}</div>
          <div className={b('field')}>
            <SelectFieldWrapper
              component={SelectField}
              name={fieldNames.published}
              isMulti
              placeholder={t('CREATE-OPPORTUNITY-FORM:CARD:SELECT-PLACEHOLDER')}
              options={this.props.tags}
              validate={[required]}
              // onSelect={this.handleSelect}
            />
            {/*<Select
              isMulti
              placeholder={t('CREATE-OPPORTUNITY-FORM:CARD:SELECT-PLACEHOLDER')}
              options={this.props.tags}
              onSelect={this.handleSelect}
            />*/}
          </div>
        </Card>
        <Card
          showRequiredAsterisk
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:DESCRIPTION')}
          footer={t('CREATE-OPPORTUNITY-FORM:CARD:DESCRIPTION-FOOTER')}
        >
          <div className={b('card-body')}>{t('CREATE-OPPORTUNITY-FORM:CARD:DESCRIPTION-BODY')}</div>
          <div className={b('field')}>
            <MarkdownEditorFieldWrapper
              component={MarkdownEditorField}
              name={fieldNames.description}
              placeholder={t('CREATE-NEW-ORGANIZATION:PLACEHOLDER:DESCRIPTION')}
              validate={[required]}
            />
          </div>
        </Card>
        <Card
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:REQUIREMENTS')}
          footer={
            <Link href="#" className={b('link')}>
              <i className="zi zi-link"/>
              {t('CREATE-OPPORTUNITY-FORM:CARD:REQUIREMENTS-FOOTER')}
            </Link>
          }
        >
          <div>{t('CREATE-OPPORTUNITY-FORM:CARD:REQUIREMENTS-BODY')}</div>
          <div className={b('row')}>
            <div className={b('field')}>
              <CheckboxFieldWrapper
                component={CheckboxField}
                name={fieldNames.ageLimitEnabled}
                label={t('CREATE-OPPORTUNITY-FORM:CARD:REQUIREMENTS-AGE-LIMIT')}
              />
            </div>
          </div>
          <div className={b('row')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              type="number"
              name={fieldNames.minAge}
              className={b('min-age')}
            />
            <div>
              {t('CREATE-OPPORTUNITY-FORM:CARD:REQUIREMENTS-AGE-LIMIT-TO')}
            </div>
            <InputBaseFieldWrapper
              component={InputBaseField}
              type="number"
              name={fieldNames.maxAge}
              className={b('max-age')}
            />
          </div>

          <div className={b('row')}>
            <div className={b('field')}>
              <CheckboxFieldWrapper
                component={CheckboxField}
                name={fieldNames.hoursPerWeekLimitEnabled}
                label={t('CREATE-OPPORTUNITY-FORM:CARD:REQUIREMENTS-EXPECTED-HOURS-PER-WEEK')}
              />
            </div>
          </div>

          <div className={b('row')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              type="number"
              name={fieldNames.hoursPerWeek}
              className={b('hours-per-week')}
            />
            <div>
              {t('CREATE-OPPORTUNITY-FORM:CARD:REQUIREMENTS-EXPECTED-HOURS-WEEK')}
            </div>
          </div>
        </Card>
        <Card
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:LIMITS')}
          footer={
            <Link href="#" className={b('link')}>
              <i className="zi zi-link"/>
              {t('CREATE-OPPORTUNITY-FORM:CARD:LIMITS-FOOTER')}
            </Link>
          }
        >
          <div className={b('card-body')}>{t('CREATE-OPPORTUNITY-FORM:CARD:LIMITS-BODY')}</div>

          <div className={b('row')}>
            <div className={b('field')}>
              <CheckboxFieldWrapper
                component={CheckboxField}
                name={fieldNames.capLimitEnabled}
                label={t('CREATE-OPPORTUNITY-FORM:CARD:LIMITS-CAP-LABEL')}
              />
            </div>
          </div>

          <div className={b('row')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              type="number"
              name={fieldNames.volunteersCap}
              className={b('volunteers-cap')}
            />
            <div>{t('CREATE-OPPORTUNITY-FORM:CARD:LIMITS-VOLUNTEERS')}</div>
          </div>

        </Card>
        <Card
          title={t('CREATE-OPPORTUNITY-FORM:TITLE:PUBLISH-SETTINGS')}
        >
          <div className={b('card-body')}>{t('CREATE-OPPORTUNITY-FORM:CARD:PUBLISHING-BODY')}</div>

          <div className={b('settings-card-actions')}>
            <Toggle
              rightLabel={t('CREATE-OPPORTUNITY-FORM:CARD:PUBLISHING-STATUS-PUBLISHED')}
              checked={this.props.isPublished}
              onChange={this.props.onChangePublishingState}
            />
            <Button color="light-red" onClick={this.props.onDelete}>
              {t('CREATE-OPPORTUNITY-FORM:CARD:PUBLISHING-DELETE-OPPORTUNITY')}
            </Button>
          </div>

          <div>{t('CREATE-OPPORTUNITY-FORM:CARD:PUBLISHING-STATUS-HIDDEN')}</div>
        </Card>
      </div>
    );
  }

  /*@bind
  private handleSelect(value: string[] | null) {
    this.setState({ tags: value ? value : [] });
  }*/
}

export default i18nConnect<IOwnProps>(CreateOpportunityForm);
