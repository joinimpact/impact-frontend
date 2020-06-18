import React from 'react';
import { connect } from 'react-redux';
import { IAppReduxState } from 'shared/types/app';
import { selectCurrentLocale, selectLocaleStrings } from '../redux/selectors';

interface IOwnProps {
  tKey: string;
}

interface IStateProps {
  strings: {[key: string]: string};
}

function mapState(state: IAppReduxState): IStateProps {
  const locale = selectCurrentLocale(state);
  const strings = selectLocaleStrings(state, locale);

  return { strings };
}

type TProps = IStateProps & IOwnProps;

/* tslint:disable:function-name */
function Translate({ tKey, strings }: TProps) {
  return <span>{strings[tKey] || tKey}</span>;
}

export { Translate };
export default connect<IStateProps, {}, IOwnProps>(mapState)(Translate);
