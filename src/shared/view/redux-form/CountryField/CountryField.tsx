import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { EventOrValueHandler, WrappedFieldProps } from 'redux-form';
import GooglePlacesAutocomplete /*, { getLatLng, geocodeByPlaceId }*/, {
  geocodeByAddress,
} from 'react-google-places-autocomplete';
import { IInputBaseFieldProps, InputBaseField } from 'shared/view/redux-form';
import config from 'config';
import { Preloader } from 'shared/view/elements';

// import 'react-google-places-autocomplete/dist/index.min.css';
import './CountryField.scss';

export interface ICountryFieldProps extends IInputBaseFieldProps {
  initialValue?: string;
}

export interface IGoogleAddressSuggestion {
  description: string;
  place_id: string;
  // And other unnecessary properties
}

const b = block('country-field');

type TProps = ICountryFieldProps;

class CountryField extends React.PureComponent<TProps & WrappedFieldProps> {
  public componentDidMount() {
    if (this.props.initialValue) {
      geocodeByAddress(this.props.initialValue)
        .then(results => {
          if (results.length) {
            // Putting default value as Field value
            this.props.input.onChange({
              place_id: results[0].place_id,
              description: results[0].formatted_address,
            });
          }
        })
        .catch(error => console.error(error));
    }
  }

  public render() {
    const { disabled, placeholder, initialValue } = this.props;
    const customProps: any = {
      // Unsupported types walk around
      displayFromSuggestionSelected: this.selectedSuggestionDisplay,
    };
    return (
      <div className={b()}>
        <GooglePlacesAutocomplete
          apiKey={config.googlePlaceAutoCompleteKey}
          renderInput={this.renderInput}
          renderSuggestions={this.renderSuggestion}
          disabled={Boolean(disabled)}
          placeholder={placeholder}
          onSelect={this.handleSelect}
          initialValue={initialValue}
          loader={<Preloader position="absolute" size={2} />}
          {...customProps}
        />
      </div>
    );
  }

  @bind
  private selectedSuggestionDisplay(suggestion: any) {
    return suggestion;
  }

  @bind
  private renderInput(props: any) {
    const inputBaseProps = {
      ...this.props,
      input: {
        ...this.props.input,
        onBlur: (event: EventOrValueHandler<FocusEvent>) => {
          // If there is no react-google-place-autocomplete value, passing as undefined
          if (!props.value) {
            this.props.input.onBlur(event);
          }

          // If there is non object value (string) resetting to undefined (user changed input value and now
          // we waiting for user select next value from dropdown)
          if (typeof props.value !== 'object') {
            this.props.input.onChange(undefined);
          }
        },
      },
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent default UP and DOWN key handle, no need to allow movement via up and down buttons in input
      if (event.keyCode === 40 || event.keyCode === 38) {
        event.preventDefault();
        event.stopPropagation();
      }
      props.onKeyDown(event);
    };
    const val = typeof props.value === 'object' ? props.value.description : props.value;
    return <InputBaseField {...inputBaseProps} {...props} value={val} onKeyDown={onKeyDown} />;
  }

  @bind
  private renderSuggestion(
    activeSuggestion: number,
    suggestions: any[],
    onSelectSuggestion: (selection: any, event: any) => void,
  ) {
    return (
      <div className={b('suggestions')}>
        {suggestions.map((suggestion, index) => {
          const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => onSelectSuggestion(suggestion, event);
          return (
            <div
              key={`suggestion-${index}`}
              className={b('suggestion', { selected: index === activeSuggestion })}
              onClick={clickHandler}
            >
              {suggestion.description}
            </div>
          );
        })}
      </div>
    );
  }

  @bind
  private async handleSelect(selection: IGoogleAddressSuggestion) {
    /*try {
      const geocode = await geocodeByPlaceId(selection.place_id);
      const result = await getLatLng(geocode[0]);
      const props = {
        description: selection.description,
        placeId: selection.place_id,
        lat: result.lat,
        lng: result.lng,
      };
      this.props.input.onChange(props);
      console.log('[handleSelect]', props);
    } catch (error) {
      console.error(error);
    }*/
    this.props.input.onChange(selection);
  }
}

export default CountryField;
