import { IDependencies } from 'shared/types/app';

import Api from 'services/api/Api';
import { i18nInstance } from 'services/i18n';
import { WebSocketService } from 'services/sockets';
import NotifyManager from 'services/notify/NotifyManager';

export default function configureDeps(): Omit<IDependencies, 'dispatch'> {
  const api = Api.instance;
  const translate = i18nInstance.translate;
  const websocket = WebSocketService.instance;
  const notify = NotifyManager.instance;

  return { api, translate, websocket, notify };
}
