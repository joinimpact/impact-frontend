import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';
import { Button, Card, Image, Link, Preloader, Error, Toggle } from 'shared/view/elements';
import {
  CheckboxFieldWrapper,
  InputBaseFieldWrapper,
  MarkdownEditorFieldWrapper,
  SelectFieldWrapper,
} from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { createOpportunityFormEntry } from '../../../redux/reduxFormEntries';
import { CheckboxField, InputBaseField, MarkdownEditorField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { UploadPhotoComponent } from 'shared/view/components';
import { IImageFile } from 'shared/view/components/AvatarUploadDropzone/AvatarUploadDropzone';
import { IUploadPhotoChildProps } from 'shared/view/components/UploadPhotoComponent/UploadPhotoComponent';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { normalizeNumber } from 'shared/helpers/normalizers';
import VisibilitySensor from 'react-visibility-sensor';
import { preventDefaultStubHandler } from 'shared/helpers/stubs';
import * as NS from 'features/npo/namespace';
import { FormWarnings } from 'redux-form';

import './EditOpportunityForm.scss';

interface IOwnProps {
  communication: ICommunication;
  uploadImageCommunication: ICommunication;
  tags: string[];
  isPublished?: boolean;

  uploadedImage?: string | null;
  uploadProgress?: number;

  changingOpportunityPublishState: boolean;
  changingOpportunityPublishStateError?: string | null;

  invalidFields: FormWarnings<NS.ICreateOpportunityForm>;

  onChangePublishingState(): void;
  onDelete(): void;
  onUpload(file: IImageFile): void;

  onChangeCardInView(id: string): void;
}

const b = block('edit-opportunity-form');

const { fieldNames } = createOpportunityFormEntry;

type TCardId =
  | 'title-card'
  | 'banner-image'
  | 'tags-card'
  | 'description-card'
  | 'requirements-card'
  | 'limits-card'
  | 'publish-settings-card';

const fields: TCardId[] = [
  'title-card',
  'banner-image',
  'tags-card',
  'description-card',
  'requirements-card',
  'limits-card',
  'publish-settings-card',
];

type TVisibilityStateHash = { [key in TCardId]: boolean };

const fieldsVisilityStateHash = fields.reduce((acc: TVisibilityStateHash, field: TCardId) => {
  acc[field] = false;
  return acc;
}, {} as TVisibilityStateHash);

type TProps = IOwnProps & ITranslateProps;

class EditOpportunityForm extends React.PureComponent<TProps> {
  private interceptorRef: React.RefObject<HTMLDivElement> = React.createRef();
  private visibilityState: TVisibilityStateHash = { ...fieldsVisilityStateHash };

  public render() {
    return <div className={b()}>{this.renderContent()}</div>;
  }

  @bind
  private renderContent() {
    return (
      <div className={b('content')} ref={this.interceptorRef}>
        {fields.map(this.renderCardInView)}
      </div>
    );
  }

  @bind
  private renderCardInView(id: TCardId, index: number) {
    return (
      <VisibilitySensor onChange={this.updateCardInView.bind(this, id)} key={`card-${index}`}>
        {this.renderCard(id)}
      </VisibilitySensor>
    );
  }

  @bind
  private renderCard(id: TCardId, ref?: React.RefObject<any> | ((node?: Element | null) => void)) {
    const { translate: t, invalidFields = {} } = this.props;
    const haveInvalidFields = Object.keys(invalidFields).length > 0;
    switch (id) {
      case 'title-card':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            showRequiredAsterisk
            className={b('card', {
              warn: Boolean(invalidFields.title),
              valid: haveInvalidFields && !Boolean(invalidFields.title),
            })}
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:TITLE')}
            footer={t('EDIT-OPPORTUNITY-FORM:CARD:TITLE-FOOTER')}
          >
            <div className={b('card-body')}>{t('EDIT-OPPORTUNITY-FORM:CARD:TITLE-BODY')}</div>
            <InputBaseFieldWrapper component={InputBaseField} name={fieldNames.title} validate={[required]} />
          </Card>
        );
      case 'banner-image':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:BANNER-IMAGE')}
            className={b('card', { valid: haveInvalidFields })}
            footer={
              <div className={b('card-footer')}>
                <div>{t('EDIT-OPPORTUNITY-FORM:CARD:BANNER-FOOTER')}</div>
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
            <div className={b('card-body')}>{t('EDIT-OPPORTUNITY-FORM:CARD:BANNER-BODY')}</div>

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
      case 'tags-card':
        return (
          <Card
            id={id}
            showRequiredAsterisk
            forwarderRef={ref}
            className={b('card', { valid: haveInvalidFields })}
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:TAGS')}
            footer={t('EDIT-OPPORTUNITY-FORM:CARD:TAGS-FOOTER')}
          >
            <div className={b('card-body')}>{t('EDIT-OPPORTUNITY-FORM:CARD:TAGS-BODY')}</div>
            <div className={b('field')}>
              <SelectFieldWrapper
                isMulti
                component={SelectField}
                name={fieldNames.tags}
                placeholder={t('EDIT-OPPORTUNITY-FORM:CARD:SELECT-PLACEHOLDER')}
                options={this.props.tags}
                validate={[required]}
              />
            </div>
          </Card>
        );
      case 'description-card':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            className={b('card', {
              warn: Boolean(invalidFields.description),
              valid: haveInvalidFields && !Boolean(invalidFields.description),
            })}
            showRequiredAsterisk
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:DESCRIPTION')}
            footer={t('EDIT-OPPORTUNITY-FORM:CARD:DESCRIPTION-FOOTER')}
          >
            <div className={b('card-body')}>{t('EDIT-OPPORTUNITY-FORM:CARD:DESCRIPTION-BODY')}</div>
            <div className={b('field')}>
              <MarkdownEditorFieldWrapper
                component={MarkdownEditorField}
                name={fieldNames.description}
                placeholder={t('EDIT-ORGANIZATION:PLACEHOLDER:DESCRIPTION')}
                validate={[required]}
              />
            </div>
          </Card>
        );
      case 'requirements-card':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            className={b('card', { valid: haveInvalidFields })}
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:REQUIREMENTS')}
            footer={
              <Link href="#" className={b('link')}>
                <i className="zi zi-link" />
                {t('EDIT-OPPORTUNITY-FORM:CARD:REQUIREMENTS-FOOTER')}
              </Link>
            }
          >
            <div>{t('EDIT-OPPORTUNITY-FORM:CARD:REQUIREMENTS-BODY')}</div>
            <div className={b('row')}>
              <div className={b('field')}>
                <CheckboxFieldWrapper
                  component={CheckboxField}
                  name={fieldNames.ageLimitEnabled}
                  label={t('EDIT-OPPORTUNITY-FORM:CARD:REQUIREMENTS-AGE-LIMIT')}
                />
              </div>
            </div>
            <div className={b('row')}>
              <InputBaseFieldWrapper
                component={InputBaseField}
                type="number"
                name={fieldNames.minAge}
                className={b('min-age')}
                normalize={normalizeNumber}
              />
              <div>{t('EDIT-OPPORTUNITY-FORM:CARD:REQUIREMENTS-AGE-LIMIT-TO')}</div>
              <InputBaseFieldWrapper
                component={InputBaseField}
                type="number"
                name={fieldNames.maxAge}
                className={b('max-age')}
                normalize={normalizeNumber}
              />
            </div>

            <div className={b('row')}>
              <div className={b('field')}>
                <CheckboxFieldWrapper
                  component={CheckboxField}
                  name={fieldNames.hoursPerWeekLimitEnabled}
                  label={t('EDIT-OPPORTUNITY-FORM:CARD:REQUIREMENTS-EXPECTED-HOURS-PER-WEEK')}
                />
              </div>
            </div>

            <div className={b('row')}>
              <InputBaseFieldWrapper
                component={InputBaseField}
                type="number"
                name={fieldNames.hoursPerWeek}
                className={b('hours-per-week')}
                normalize={normalizeNumber}
              />
              <div>{t('EDIT-OPPORTUNITY-FORM:CARD:REQUIREMENTS-EXPECTED-HOURS-WEEK')}</div>
            </div>
          </Card>
        );
      case 'limits-card':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            className={b('card', { valid: haveInvalidFields })}
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:LIMITS')}
            footer={
              <Link href="#" className={b('link')}>
                <i className="zi zi-link" />
                {t('EDIT-OPPORTUNITY-FORM:CARD:LIMITS-FOOTER')}
              </Link>
            }
          >
            <div className={b('card-body')}>{t('EDIT-OPPORTUNITY-FORM:CARD:LIMITS-BODY')}</div>

            <div className={b('row')}>
              <div className={b('field')}>
                <CheckboxFieldWrapper
                  component={CheckboxField}
                  name={fieldNames.capLimitEnabled}
                  label={t('EDIT-OPPORTUNITY-FORM:CARD:LIMITS-CAP-LABEL')}
                />
              </div>
            </div>

            <div className={b('row')}>
              <InputBaseFieldWrapper
                component={InputBaseField}
                type="number"
                name={fieldNames.volunteersCap}
                className={b('volunteers-cap')}
                normalize={normalizeNumber}
              />
              <div>{t('EDIT-OPPORTUNITY-FORM:CARD:LIMITS-VOLUNTEERS')}</div>
            </div>
          </Card>
        );
      case 'publish-settings-card':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            className={b('card', { valid: haveInvalidFields })}
            title={t('EDIT-OPPORTUNITY-FORM:TITLE:PUBLISH-SETTINGS')}
          >
            <div className={b('card-body')}>{t('EDIT-OPPORTUNITY-FORM:CARD:PUBLISHING-BODY')}</div>

            <div className={b('settings-card-actions')}>
              <Toggle
                isShowPreloader={this.props.changingOpportunityPublishState}
                leftLabel={t('EDIT-OPPORTUNITY-FORM:CARD:PUBLISHING-STATUS-HIDDEN')}
                rightLabel={t('EDIT-OPPORTUNITY-FORM:CARD:PUBLISHING-STATUS-PUBLISHED')}
                checked={this.props.isPublished}
                onChange={this.props.onChangePublishingState}
              />
              <Button color="light-red" onClick={this.handleDelete}>
                {t('EDIT-OPPORTUNITY-FORM:CARD:PUBLISHING-DELETE-OPPORTUNITY')}
              </Button>
            </div>

            {this.props.changingOpportunityPublishStateError && (
              <div className={b('error')}>
                <Error>{this.props.changingOpportunityPublishStateError}</Error>
              </div>
            )}
          </Card>
        );
    }
  }

  @bind
  private handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete();
  }

  /*@bind
  private handleSelect(value: string[] | null) {
    this.setState({ tags: value ? value : [] });
  }*/

  @bind
  private updateCardInView(id: TCardId, isVisible: boolean) {
    this.visibilityState[id] = isVisible;

    const topVisibleId = this.topVisibleId;
    if (topVisibleId) {
      this.props.onChangeCardInView(topVisibleId);
    }
  }

  private get topVisibleId(): TCardId | null {
    for (const id of fields) {
      if (this.visibilityState[id]) return id;
    }

    return null;
  }
}

export default i18nConnect<IOwnProps>(EditOpportunityForm);
