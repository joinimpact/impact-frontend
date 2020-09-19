import BaseApi from 'services/api/modules/Base';
import { bind } from 'decko';

class EventsApi extends BaseApi {
	@bind
	public async loadEvents(): Promise<void> {
		await this.actions.get('/api/v1/events');
	}
}

export default EventsApi;
