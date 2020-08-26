import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Modal } from 'services/modal';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { requestHoursForm } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import { Button, Error, Label } from 'shared/view/elements';
import { required } from 'shared/helpers/validators';
import { InputBaseField } from 'shared/view/redux-form';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { normalizeNumber } from 'shared/helpers/normalizers';

import './RequestHoursModal.scss';

interface IOwnProps {
  communication: ICommunication;
  onRequest(values: NS.IRequestHoursForm): void;
  onClose(): void;
}

const { name: formName, fieldNames } = requestHoursForm;

const b = block('request-hours-modal');

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.IRequestHoursForm, IOwnProps & ITranslateProps>;

class RequestHoursModal extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, communication, error } = this.props;
    return (
      <Modal
        isOpen
        title={t('REQUEST-HOURS-MODAL:TITLE:TEXT')}
        onClose={this.props.onClose}
        actions={this.renderActions()}
        contentWrap={this.wrapModalContent}
      >
        <div className={b()}>

          <div className={b('hint')}>
            {t('REQUEST-HOURS-MODAL:STATIC:TEXT')}
          </div>
          <div className={b('row')}>
            <Label htmlFor={fieldNames.hours}>
              {t('REQUEST-HOURS-MODAL:LABEL:HOURS')}
            </Label>
            <div className={b('field')}>
              <InputBaseFieldWrapper
                component={InputBaseField}
                name={fieldNames.hours}
                className={b('field-hours')}
                // placeholder={t('REQUEST-HOURS-MODAL:LABEL:HOURS')}
                type="number"
                min={1}
                max={99}
                validate={[required]}
                normalize={normalizeNumber}
              />
            </div>
          </div>

          <div className={b('row')}>
            <Label htmlFor={fieldNames.description}>
              {t('REQUEST-HOURS-MODAL:LABEL:DESCRIPTION')}
            </Label>
            <div className={b('field')}>
              <InputBaseFieldWrapper
                component={InputBaseField}
                name={fieldNames.description}
                // placeholder={t('REQUEST-HOURS-MODAL:LABEL:DESCRIPTION')}
                validate={[required]}
              />
            </div>
          </div>

          {error && (
            <div className={b('error')}>
              <Error>{error}</Error>
            </div>
          )}

          {communication.error && (
            <div className={b('error')}>
              <Error>{communication.error}</Error>
            </div>
          )}

        </div>
      </Modal>
    );
  }

  @bind
  private handleRequestHoursSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit, onRequest } = this.props;

    handleSubmit(async data => {
      onRequest(data);
    })(e);
  }

  @bind
  private wrapModalContent(modalContent: React.ReactNode) {
    return (
      <form onSubmit={this.handleRequestHoursSubmit}>
        {modalContent}
      </form>
    );
  }

  @bind
  private renderActions() {
    const { translate: t } = this.props;
    return (
      <div className={b('actions')}>
        <Button color="grey" onClick={this.handleCloseClicked}>
          {t('SHARED:BUTTONS:CLOSE')}
        </Button>
        <Button
          type="submit"
          color="blue"
          isShowPreloader={this.props.communication.isRequesting}>
          {t('REQUEST-HOURS-MODAL:ACTION:SEND-REQUEST')}
        </Button>
      </div>
    );
  }

  @bind
  private handleCloseClicked(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClose();
  }
}

const withForm = reduxForm<NS.IRequestHoursForm, ITranslateProps & IOwnProps>({
  form: formName,
})(RequestHoursModal);
export default i18nConnect<IOwnProps>(withForm);
