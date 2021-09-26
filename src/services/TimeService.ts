import * as Api from '~/services/Api';
import Time from '~/types/Time';
import TimeService from '~/types/TimeService';

export default {
	async getItem() {
		return (await Api.apiClient.get('/times')) as unknown as Time;
	},
} as unknown as TimeService;
