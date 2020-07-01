import React from 'react';
import { i18nConnect, ITranslateProps } from 'services/i18n';

type TProps = ITranslateProps;

class NPOService extends React.PureComponent<TProps> {
  public render() {
    return null;
  }
}

const i18nConnected = i18nConnect<{}>(NPOService);
export default i18nConnected;
