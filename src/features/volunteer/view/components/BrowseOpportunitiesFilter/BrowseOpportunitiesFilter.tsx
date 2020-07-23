import React from 'react';
import block from 'bem-cn';
import { Dispatch } from 'redux';
import { browseOpportunitiesForm } from '../../../redux/reduxFormEntries';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import * as NS from '../../../namespace';
import { Label } from 'shared/view/elements';
import { CountryFieldWrapper } from 'shared/view/redux-form/components';
import SelectField from 'shared/view/redux-form/SelectField/SelectField';
import { InputBaseFieldWrapper, SelectFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { InputBaseField } from 'shared/view/redux-form';

import './BrowseOpportunitiesFilter.scss';
import MultiSlider from 'shared/view/components/MultiSlider/MultiSlider';

interface IOwnProps {
  onFilter(values: NS.IBrowseOpportunitiesForm): void;
}

const b = block('browse-opportunities-filter');

const { name: formName, fieldNames } = browseOpportunitiesForm;

type TComponentProps = IOwnProps & ITranslateProps;
type TProps = TComponentProps & InjectedFormProps<NS.IBrowseOpportunitiesForm, TComponentProps>;

class BrowseOpportunitiesFilter extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <form onSubmit={this.props.handleSubmit}>
          <div className={b('field')}>
            <div className={b('field')}>
              <Label htmlFor={fieldNames.location}>{t('BROWSE-OPPORTUNITIES-FILTER:LABEL:NEAR')}</Label>
              <CountryFieldWrapper
                name={fieldNames.location}
              />
            </div>
          </div>
          <div className={b('field')}>
            <Label htmlFor={fieldNames.ageRange}>{t('BROWSE-OPPORTUNITIES-FILTER:LABEL:AGE-RANGE')}</Label>
            <InputBaseFieldWrapper
              component={InputBaseField}
              type="number"
              name={fieldNames.ageRange}
              size={2}
            />
          </div>
          <div className={b('field')}>
            <Label htmlFor={fieldNames.commitment}>{t('BROWSE-OPPORTUNITIES-FILTER:LABEL:COMMITMENT')}</Label>
            <SelectFieldWrapper
              component={SelectField}
              name={fieldNames.commitment}
              // options={this.props.tags}
            />
          </div>
          <MultiSlider
            from={0}
            to={40}
            step={1}
            tickerStep={10}
          />
        </form>
      </div>
    );
  }
}

const withForm = reduxForm<NS.IBrowseOpportunitiesForm, TComponentProps>({
  form: formName,
  onChange: (
    values: NS.IBrowseOpportunitiesForm,
    dispatch: Dispatch,
    props: TComponentProps,
    prevValues: NS.IBrowseOpportunitiesForm,
  ) => {
    console.log('values: ', values);
    console.log('props: ', props);
    console.log('prevValues: ', prevValues);

  },
})(BrowseOpportunitiesFilter);
export default i18nConnect<IOwnProps>(withForm);
