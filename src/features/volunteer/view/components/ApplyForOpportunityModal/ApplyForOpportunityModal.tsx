import React from 'react';
import block from 'bem-cn';
import { Modal } from 'services/modal';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { InjectedFormProps, reduxForm } from 'redux-form';
import * as NS from '../../../namespace';
import { applyForOpportunityForm } from 'features/volunteer/redux/reduxFormEntries';
import { MarkdownEditorFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { MarkdownEditorField } from 'shared/view/redux-form';
import { required } from 'shared/helpers/validators';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';
import { Button, Error } from 'shared/view/elements';

import './ApplyForOpportunityModal.scss';

interface IOwnProps {
  communication: ICommunication;
  onApply(message: string): void;
  onClose(): void;
}

const b = block('apply-opportunity-modal');
const { name: formName, fieldNames } = applyForOpportunityForm;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.IApplyForOpportunityForm, IOwnProps & ITranslateProps>;

class ApplyForOpportunityModal extends React.PureComponent<TProps> {
  public render() {
    const { translate: t, communication } = this.props;
    return (
      <Modal
        isOpen
        disablePadding
        title={t('APPLY-FOR-OPPORTUNITY-MODAL:STATIC:TITLE')}
        onClose={this.props.onClose}
      >
        <div className={b()}>
          <form onSubmit={this.handleSubmit}>
            <div className={b('content')}>
              <div className={b('subtitle')}>
                {t('APPLY-FOR-OPPORTUNITY-MODAL:STATIC:SUBTITLE')}
              </div>
              <div className={b('field')}>
                <MarkdownEditorFieldWrapper
                  noToolbar
                  minHeight={'50px'}
                  component={MarkdownEditorField}
                  name={fieldNames.message}
                  placeholder={t('APPLY-FOR-OPPORTUNITY-MODAL:PLACEHOLDER:MESSAGE')}
                  validate={[required]}
                />
              </div>
            </div>

            {communication.error && (
              <div className={b('error')}>
                <Error>{communication.error}</Error>
              </div>
            )}

            <div className={b('actions')}>
              <Button color="grey" onClick={this.handleCloseClicked}>
                {t('SHARED:BUTTONS:CLOSE')}
              </Button>
              <Button color="blue" type="submit" isShowPreloader={communication.isRequesting}>
                {t('APPLY-FOR-OPPORTUNITY-MODAL:BUTTON:MESSAGE')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  @bind
  private handleCloseClicked(e: React.MouseEvent) {
    this.props.onClose();
  }

  @bind
  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { handleSubmit } = this.props;

    console.log('[handleSubmit]');

    handleSubmit(async data => {
      this.props.onApply(data.message);
    })(e);
  }
}

const withForm = reduxForm<NS.IApplyForOpportunityForm, ITranslateProps & IOwnProps>({
  form: formName,
})(ApplyForOpportunityModal);
export default i18nConnect<IOwnProps>(withForm);
