<template>
	<div class="lesson-wrapper">
		<button ref="button" class="lesson" type="button" @click="isOpenTeachers = !isOpenTeachers" @blur="blurHandler()">
			<span class="lesson__number">{{ number }}</span>
			<DayCardLessonItemDiscipline :odd-discipline="oddDiscipline" :even-discipline="evenDiscipline" />
			<DayCardLessonItemCabinet
				:second-odd-cabinet="secondOddCabinet"
				:first-odd-cabinet="firstOddCabinet"
				:first-even-cabinet="firstEvenCabinet"
				:second-even-cabinet="secondEvenCabinet"
			/>
		</button>

		<transition name="teachers-tooltip">
			<DayCardLessonItemTeachers
				v-if="isOpenTeachers && !isEmptyTeachers"
				v-model="isOpenTeachers"
				:firsr-even-teacher="firsrEvenTeacher"
				:second-even-teacher="secondEvenTeacher"
				:firsr-odd-teacher="firsrOddTeacher"
				:second-odd-teacher="secondOddTeacher"
			/>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Item from '~/types/Item';

const properties = defineProps({
	number: {
		type: Number,
		required: true,
	},
	oddDiscipline: {
		type: Object as PropType<Item>,
		required: true,
	},
	evenDiscipline: {
		type: Object as PropType<Item>,
		required: true,
	},
	secondOddCabinet: {
		type: Object as PropType<Item>,
		required: true,
	},
	firstOddCabinet: {
		type: Object as PropType<Item>,
		required: true,
	},
	firstEvenCabinet: {
		type: Object as PropType<Item>,
		required: true,
	},
	secondEvenCabinet: {
		type: Object as PropType<Item>,
		required: true,
	},
	firsrOddTeacher: {
		type: Object as PropType<Item>,
		required: true,
	},
	secondOddTeacher: {
		type: Object as PropType<Item>,
		required: true,
	},
	firsrEvenTeacher: {
		type: Object as PropType<Item>,
		required: true,
	},
	secondEvenTeacher: {
		type: Object as PropType<Item>,
		required: true,
	},
});

const isOpenTeachers = ref(false);
const isEmptyTeachers = computed(
	() =>
		properties.firsrOddTeacher.name === 'пусто' &&
		properties.secondOddTeacher.name === 'пусто' &&
		properties.firsrEvenTeacher.name === 'пусто' &&
		properties.secondEvenTeacher.name === 'пусто',
);

const button = ref<HTMLButtonElement>();

const blurHandler = () => {
	if (isOpenTeachers.value && !isEmptyTeachers.value) {
		button.value?.focus();
	}
};
</script>

<style>
.lesson-wrapper {
	position: relative;
}

.lesson {
	position: relative;

	display: grid;
	grid-template-columns: 1.2ch 1fr 5.5ch;
	align-items: stretch;

	width: 100%;
	height: 3rem;
	margin: 0;
	padding: 0 0.5rem;

	color: var(--lesson-color);
	color: inherit;
	font-size: inherit;
	font-family: inherit;
	line-height: 1;
	letter-spacing: -0.01em;
	column-gap: 0.3rem;

	border: 0;

	background-color: transparent;

	cursor: pointer;

	user-select: none;
}

.lesson:focus {
	outline: none;
}

.lesson:focus-visible::before {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	content: '';
	z-index: 5;

	border-radius: 3px;

	box-shadow: 0 0 0 2px var(--lesson-focus-visible-shadow);
}

.lesson-wrapper:last-child .lesson {
	border-bottom-right-radius: 2px 8px;
	border-bottom-left-radius: 2px 8px;
}

.lesson-wrapper:nth-child(odd) .lesson {
	background-color: var(--lesson-background);
}

.lesson__number {
	justify-self: center;
	align-self: center;

	font-weight: 600;
	font-family: 'JetBrains Mono', monospace;

	user-select: none;
}
</style>
