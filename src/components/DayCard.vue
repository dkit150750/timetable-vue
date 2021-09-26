<template>
	<div class="day-card">
		<div class="day-card__header">
			<h3 class="day-card__day">{{ day.name }}</h3>
		</div>
		<div class="day-card__lessons">
			<DayCardLessonItem
				v-for="(lesson, index) in day.lessons"
				:key="lesson.id"
				:number="index + 1"
				:odd-discipline="lesson.oddDiscipline"
				:even-discipline="lesson.evenDiscipline"
				:first-odd-cabinet="lesson.firstOddCabinet"
				:second-odd-cabinet="lesson.secondOddCabinet"
				:first-even-cabinet="lesson.firstEvenCabinet"
				:second-even-cabinet="lesson.secondEvenCabinet"
				:firsr-odd-teacher="lesson.firstOddTeacher"
				:second-odd-teacher="lesson.secondOddTeacher"
				:firsr-even-teacher="lesson.firstEvenTeacher"
				:second-even-teacher="lesson.secondEvenTeacher"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Day from '~/types/Day';

defineProps({
	day: {
		type: Object as PropType<Day>,
		required: true,
	},
});
</script>

<style>
.day-card {
	display: grid;

	width: 100%;
	max-width: 320px;
	padding-bottom: 0.4em;

	border-radius: 0.8em;

	background-color: var(--day-card-background);
}

.day-card__header {
	display: flex;
	justify-content: center;
	align-items: center;

	min-height: 3em;
}

.day-card__day {
	margin: 0;
	padding: 0;

	color: var(--day-card-day-color);
	font-weight: 900;
	font-size: 1.2em;
	line-height: 1;

	user-select: none;
}
</style>
