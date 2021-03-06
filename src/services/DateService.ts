import * as Api from '~/services/Api';

type ItemResponse = { data: { data: { id: number; name: string } } };

export default {
	async getItem(): Promise<ItemResponse> {
		return (await Api.apiClient.get('/dates')) as unknown as ItemResponse;
	},
};
