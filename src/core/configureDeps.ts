import { IDependencies } from 'shared/types/app';

import Api from 'services/api/Api';
import { i18nInstance } from 'services/i18n';
import { WebSocketService } from 'services/sockets';

export default function configureDeps(): Omit<IDependencies, 'dispatch'> {
  const api = Api.instance;
  const translate = i18nInstance.translate;
  const websocket = WebSocketService.instance;

  return { api, translate, websocket };
}
