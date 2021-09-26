import * as Api from '~/services/Api';
import Group from '~/types/Group';
import GroupInfo from '~/types/GroupInfo';

type ListResponse = { data: { data: GroupInfo[]; meta: { last_page: number } } };
type ItemResponse = { data: { data: Group } };

export default {
	async getCourseItems(course: number): Promise<ListResponse> {
		return (await Api.apiClient.get(`/courses/${course}/groups`)) as unknown as ListResponse;
	},
	async getItem(slug: string): Promise<ItemResponse> {
		return (await Api.apiClient.get(`/groups/${slug}`)) as unknown as ItemResponse;
	},
	async getCourseFirstItem(course: number): Promise<ItemResponse> {
		return (await Api.apiClient.get(`/courses/${course}/groups/first`)) as unknown as ItemResponse;
	},
};
