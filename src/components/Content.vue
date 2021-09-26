<template>
	<div class="content">
		<div class="content__header">
			<GroupSelection :groups="groupsData.list" :slug="group" />
			<ChangesSwith v-model="isOpenChanges" />
		</div>

		<div v-if="!isOpenChanges" class="timetable content__timetable">
			<h2 class="sr-only">Дни недели</h2>
			<DayTime class="timetable__time" :time="timeData.data" :is-total="true" />
			<div class="timetable__list">
				<DayWrapper v-for="day in groupData.data.days" :key="day.id" :time="timeData.data" :day="day" />
			</div>
		</div>

		<div v-else class="timetable content__timetable">
			<h2 class="sr-only">Изменения</h2>
			<DayTime class="timetable__time" :time="timeChangeData.data" :is-total="true" />
			<div class="timetable__list">
				<DayWrapper :time="timeData.data" :day="{ id: 0, name: dateData.data.name, lessons: groupData.data.changes }" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate } from 'vue-router';
import TimeService from '~/services/TimeService';
import ChangeTimeService from '~/services/ChangeTimeService';
import DateService from '~/services/DateService';
import GroupService from '~/services/GroupService';
import GroupInfo from '~/types/GroupInfo';
import Group from '~/types/Group';
import { groupStore } from '~/stores/group';
import { timeStore } from '~/stores/time';

const properties = defineProps({
	course: {
		type: String,
		required: false,
		default: '1',
	},
	group: {
		type: String,
		required: false,
		default: '',
	},
});

const router = useRouter();
const isOpenChanges = ref(false);

const dateData = reactive({ data: { id: 1, name: '' } });

const groupsData: { list: GroupInfo[] } = reactive({ list: [{ id: 0, name: '', slug: '', course: 0 }] });
const groupData: { data: Group } = reactive({ data: groupStore });

const timeData = reactive({ data: timeStore });
const timeChangeData = reactive({ data: timeStore });

const getGroup = async (course: string, groupSlug = '') => {
	try {
		if (groupSlug === '') {
			const response = await GroupService.getCourseFirstItem(Number.parseFloat(course));
			groupData.data = response.data.data;
		} else {
			const response = await GroupService.getItem(groupSlug);
			groupData.data = response.data.data;
		}
	} catch {
		router.push('/error');
	}
};

const getGroups = async (course: string) => {
	try {
		const respone = await GroupService.getCourseItems(Number.parseFloat(course));
		groupsData.list = respone.data.data.length > 0 ? respone.data.data : [{ id: 0, name: '', slug: '', course: 0 }];
	} catch {
		router.push('/error');
	}
};

const getChangeTime = async () => {
	try {
		const response = await ChangeTimeService.getItem();
		timeChangeData.data = response.data.data;
	} catch {
		router.push('/error');
	}
};

const getTime = async () => {
	try {
		const response = await TimeService.getItem();
		timeData.data = response.data.data;
	} catch {
		router.push('/error');
	}
};

const getDate = async () => {
	try {
		const response = await DateService.getItem();
		dateData.data = response.data.data;
	} catch {
		router.push('/error');
	}
};

onBeforeMount(async () => {
	getGroup(properties.course, properties.group);
	getGroups(properties.course);
	getTime();
	getChangeTime();
	getDate();
});

onBeforeRouteUpdate(async (to, from) => {
	let courseString = Array.isArray(from.params.course) ? from.params.course[0] : from.params.course;
	if (to.params.course && to.params.course !== from.params.course) {
		courseString = Array.isArray(to.params.course) ? to.params.course[0] : to.params.course;
		getGroups(courseString);
		getGroup(courseString);
	} else if (to.params.group !== undefined && to.params.group !== from.params.group) {
		const groupString = Array.isArray(to.params.group) ? to.params.group[0] : to.params.group;
		getGroup(courseString, groupString);
	}
});
</script>

<style>
.content {
	display: grid;
	grid-template-columns: 1fr;
	gap: 2em 0;
}

.content__header {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;
}

@media screen and (min-width: 340px) {
	.content__header {
		padding: 0 1.5em;
	}
}

@media screen and (min-width: 440px) {
	.content__header {
		padding: 0 2em;
	}
}

.content__timetable {
	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;
}

@media screen and (min-width: 340px) {
	.content__timetable {
		padding: 0 1.5em;
	}
}

@media screen and (min-width: 440px) {
	.content__timetable {
		padding: 0 2em;
	}
}

.timetable {
	display: grid;
	gap: 2em 0;
}

@media screen and (min-width: 500px) {
	.timetable {
		gap: 2em 0;
	}
}

@media screen and (min-width: 900px) {
	.timetable {
		justify-content: stretch;
	}
}

.timetable__time {
	margin: 0 auto;
}

@media screen and (min-width: 550px) {
	.timetable__time {
		display: none;
	}
}

.timetable__list {
	display: grid;
	gap: 2em 0;
}

@media screen and (min-width: 560px) {
	.timetable__list {
		column-gap: 1.4em;
	}
}

@media screen and (min-width: 900px) {
	.timetable__list {
		display: grid;
		grid-template-columns: min-content min-content;
	}
}

@media screen and (min-width: 1240px) {
	.timetable__list {
		display: grid;
		grid-template-columns: min-content min-content min-content;
	}
}
</style>
