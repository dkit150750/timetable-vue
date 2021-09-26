<template>
	<div class="day-wrapper">
		<DayTime class="day-wrapper__time" :time="time" />
		<DayCard class="day-wrapper__day" :day="day" />
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Day from '~/types/Day';

defineProps({
	time: {
		type: Object,
		required: true,
	},
	day: {
		type: Object as PropType<Day>,
		required: true,
	},
	isChange: {
		type: Boolean,
		default: false,
		required: false,
	},
});
</script>

<style>
.day-wrapper {
	display: grid;
	grid-template-columns: 1fr;
}

@media screen and (min-width: 550px) {
	.day-wrapper {
		display: grid;
		grid-template-columns: max-content 320px;
		align-items: flex-end;

		column-gap: 1.4em;
	}
}

@media screen and (min-width: 900px) and (max-width: 1239px) {
	.day-wrapper:nth-of-type(2n) {
		grid-template-columns: 320px;
	}
}

@media screen and (min-width: 1240px) {
	.day-wrapper:nth-of-type(3n - 1),
	.day-wrapper:nth-of-type(3n) {
		grid-template-columns: 320px;
	}
}

@media screen and (max-width: 549px) {
	.day-wrapper__time {
		display: none;
	}
}

@media screen and (min-width: 900px) and (max-width: 1239px) {
	.day-wrapper:nth-of-type(2n) .day-wrapper__time {
		display: none;
	}
}

@media screen and (min-width: 1240px) {
	.day-wrapper:nth-of-type(3n - 1) .day-wrapper__time,
	.day-wrapper:nth-of-type(3n) .day-wrapper__time {
		display: none;
	}
}

@media screen and (max-width: 549px) {
	.day-wrapper__day {
		margin: 0 auto;
	}
}
</style>
