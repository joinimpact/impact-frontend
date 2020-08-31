import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import VisibilitySensor from 'react-visibility-sensor';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Card, Error } from 'shared/view/elements';
import { FormWarnings } from 'redux-form';
import * as NS from '../../../namespace';
import { required } from 'shared/helpers/validators';
import { InputBaseField, MarkdownEditorField } from 'shared/view/redux-form';
import { createNewOrganizationEntry } from 'features/npo/redux/reduxFormEntries';
import { InputBaseFieldWrapper, MarkdownEditorFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { ICommunication } from 'shared/types/redux';
import { CountryFieldWrapper } from 'shared/view/redux-form/components';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

import './EditOrganizationForm.scss';

interface IOwnProps {
  communication: ICommunication;
  invalidFields: FormWarnings<NS.ICreateNewOrganizationForm>;
  editableOrganization: IOrganizationsResponseItem | null
  onChangeCardInView(id: string): void;
}

const b = block('edit-organization-form');

const { fieldNames } = createNewOrganizationEntry;

type TCardId =
  | 'org-name'
  | 'location'
  | 'website'
  | 'description';

const fields: TCardId[] = [
  'org-name',
  'location',
  'website',
  'description',
];

type TVisibilityStateHash = { [key in TCardId]: boolean };

const fieldsVisibilityStateHash = fields.reduce((acc: TVisibilityStateHash, field: TCardId) => {
  acc[field] = false;
  return acc;
}, {} as TVisibilityStateHash);

type TProps = IOwnProps & ITranslateProps;

class EditOrganizationForm extends React.PureComponent<TProps> {
  private interceptorRef: React.RefObject<HTMLDivElement> = React.createRef();
  private visibilityState: TVisibilityStateHash = { ...fieldsVisibilityStateHash };

  public render() {
    return (
      <div className={b()}>
        {this.renderContent()}
      </div>
    );
  }

  @bind
  private renderContent() {
    const { translate: t, communication } = this.props;
    return (
      <div className={b('content')} ref={this.interceptorRef}>
        {fields.map(this.renderCardInView)}
        {communication.error && (
          <div className={b('error')}>
            <Error>{communication.error}</Error>
          </div>
        )}
        <div className={b('actions')}>
          <Button color="blue" isShowPreloader={this.props.communication.isRequesting}>
            {t('SHARED:BUTTONS:CONTINUE')}
          </Button>
        </div>
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
    const { translate: t, invalidFields = {}, editableOrganization } = this.props;
    const haveInvalidFields = Object.keys(invalidFields).length > 0;

    switch (id) {
      case 'org-name':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            showRequiredAsterisk
            className={b('card', {
              warn: Boolean(invalidFields.organizationName),
              valid: haveInvalidFields && !Boolean(invalidFields.organizationName),
            })}
            title={t('EDIT-ORGANIZATION-FORM:TITLE:ORGANIZATION-NAME')}
            footer={t('EDIT-ORGANIZATION-FORM:CARD:ORGANIZATION-NAME-FOOTER')}
          >
            <div className={b('card-body')}>
              {t('EDIT-ORGANIZATION-FORM:CARD:ORGANIZATION-NAME-BODY')}
            </div>
            <InputBaseFieldWrapper component={InputBaseField} name={fieldNames.organizationName} validate={[required]} />
          </Card>
        );
      case 'location':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            showRequiredAsterisk
            className={b('card', {
              warn: Boolean(invalidFields.address),
              valid: haveInvalidFields && !Boolean(invalidFields.address),
            })}
            title={t('EDIT-ORGANIZATION-FORM:TITLE:ADDRESS')}
            footer={t('EDIT-ORGANIZATION-FORM:CARD:ADDRESS-FOOTER')}
          >
            <div className={b('card-body')}>
              {t('EDIT-ORGANIZATION-FORM:CARD:ADDRESS-BODY')}
            </div>
            <CountryFieldWrapper
              name={fieldNames.address}
              placeholder={t('EDIT-ORGANIZATION-FORM:PLACEHOLDER:ADDRESS')}
              initialValue={editableOrganization ? editableOrganization.location : ''}
              validate={[required]}
            />
          </Card>
        );
      case 'website':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            showRequiredAsterisk
            className={b('card', {
              warn: Boolean(invalidFields.website),
              valid: haveInvalidFields && !Boolean(invalidFields.website),
            })}
            title={t('EDIT-ORGANIZATION-FORM:TITLE:WEBSITE')}
            footer={t('EDIT-ORGANIZATION-FORM:CARD:WEBSITE-FOOTER')}
          >
            <div className={b('card-body')}>
              {t('EDIT-ORGANIZATION-FORM:CARD:WEBSITE-BODY')}
            </div>
            <InputBaseFieldWrapper component={InputBaseField} name={fieldNames.website} validate={[required]} />
          </Card>
        );
      case 'description':
        return (
          <Card
            id={id}
            forwarderRef={ref}
            showRequiredAsterisk
            className={b('card', {
              warn: Boolean(invalidFields.description),
              valid: haveInvalidFields && !Boolean(invalidFields.description),
            })}
            title={t('EDIT-ORGANIZATION-FORM:TITLE:DESCRIPTION')}
            footer={t('EDIT-ORGANIZATION-FORM:CARD:DESCRIPTION-FOOTER')}
          >
            <div className={b('card-body')}>
              {t('EDIT-ORGANIZATION-FORM:CARD:DESCRIPTION-BODY')}
            </div>
            <div className={b('field')}>
              <MarkdownEditorFieldWrapper
                component={MarkdownEditorField}
                name={fieldNames.description}
                placeholder={t('EDIT-ORGANIZATION-FORM:PLACEHOLDER:DESCRIPTION')}
                validate={[required]}
              />
            </div>
          </Card>
        );
    }

    return null;
  }

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

export default i18nConnect<IOwnProps>(EditOrganizationForm);
