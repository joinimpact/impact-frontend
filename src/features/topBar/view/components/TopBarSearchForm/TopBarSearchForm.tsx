import React from 'react';
import block from 'bem-cn';
import { searchFormEntry } from '../../../redux/reduxFormEntries';
import * as NS from '../../../namespace';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { InputBaseField } from 'shared/view/redux-form';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';

import './TopBarSearchForm.scss';

interface IOwnProps {
  onSearch(value: string): void;
}

const b = block('top-bar-search-form');

const { name: formName, fieldNames } = searchFormEntry;

type TProps = IOwnProps & ITranslateProps & InjectedFormProps<NS.ISearchBarForm, ITranslateProps>;

class TopBarSearchForm extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <form>
          <div className={b('field')}>
            <InputBaseFieldWrapper
              component={InputBaseField}
              name={fieldNames.search}
              placeholder={t('TOP-BAR-SEARCH-FORM:PLACEHOLDER:SEARCH')}
            />
          </div>
        </form>
      </div>
    );
  }
}

const withForm = reduxForm<NS.ISearchBarForm, ITranslateProps>({
  form: formName,
})(TopBarSearchForm);
export default i18nConnect<{}>(withForm);
