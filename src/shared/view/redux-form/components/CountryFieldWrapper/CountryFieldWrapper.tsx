import React from 'react';
import { CountryField } from 'shared/view/redux-form/index';
import { InputBaseFieldWrapper } from 'shared/view/redux-form/FieldWrappers/FieldWrappers';
import { BaseFieldProps } from 'redux-form';
import { ICountryFieldProps } from 'shared/view/redux-form/CountryField/CountryField';

type TCountryFieldProps = BaseFieldProps & ICountryFieldProps;

class CountryFieldWrapper extends React.PureComponent<TCountryFieldProps> {
  public render() {
    return (
      <InputBaseFieldWrapper
        {...this.props}
        component={CountryField}
      />
    );
  }
}

export default CountryFieldWrapper;
