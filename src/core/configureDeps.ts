import { IDependencies } from 'shared/types/app';

import Api from 'services/api/Api';
import { i18nInstance } from 'services/i18n';

export default function configureDeps(): IDependencies {
  const api = new Api();
  const translate = i18nInstance.translate;

  return { api, translate };
}
