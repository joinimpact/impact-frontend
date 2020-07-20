import React from 'react';
import block from 'bem-cn';
import { browseOpportunitiesForm } from '../../../redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import { Label } from 'shared/view/elements';
import { required } from 'shared/helpers/validators';
import { CountryFieldWrapper } from 'shared/view/redux-form/components';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';

import './BrowseOpportunitiesFilter.scss';

const b = block('browse-opportunities-filter');

const { name: formName, fieldNames } = browseOpportunitiesForm;

type TProps = ITranslateProps & InjectedFormProps<NS.IBrowseOpportunitiesForm, ITranslateProps>;

class BrowseOpportunitiesFilter extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('field')}>
          <div className={b('field')}>
            <Label htmlFor={fieldNames.location}>
              {t('BROWSE-OPPORTUNITIES-FILTER:LABEL:NEAR')}
            </Label>
            <CountryFieldWrapper
              name={fieldNames.location}
              validate={[required]}
            />
          </div>
        </div>
        <div className={b('field')}>
          <Label htmlFor={fieldNames.ageRange}>
            {t('BROWSE-OPPORTUNITIES-FILTER:LABEL:AGE-RANGE')}
          </Label>
          <SelectFieldWrapper
            component={SelectField}
            name={fieldNames.ageRange}
            placeholder={''}
            // options={this.props.tags}
            validate={[required]}
          />
        </div>
        <div className={b('field')}>
          <Label htmlFor={fieldNames.commitment}>
            {t('BROWSE-OPPORTUNITIES-FILTER:LABEL:COMMITMENT')}
          </Label>
          <SelectFieldWrapper
            component={SelectField}
            name={fieldNames.commitment}
            placeholder={''}
            // options={this.props.tags}
            validate={[required]}
          />
        </div>
      </div>
    );
  }
}

const withForm = reduxForm<NS.IBrowseOpportunitiesForm, ITranslateProps>({
  form: formName,
})(BrowseOpportunitiesFilter);
export default i18nConnect<{}>(withForm);
