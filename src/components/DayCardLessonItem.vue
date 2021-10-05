<template>
	<div class="day-card__lesson">
		<button
			ref="button"
			class="lesson-info day-card__lesson-info"
			:class="classObject"
			type="button"
			@click="isOpenTeachers = !isOpenTeachers"
			@blur="blurHandler()"
		>
			<span class="lesson-info__number">{{ number }}</span>

			<span v-if="oddDiscipline.name !== 'пусто'" class="lesson-info__name lesson-info__name--odd">
				{{ formattedOddDiscipline.name }}
			</span>
			<span v-if="evenDiscipline.name !== 'пусто'" class="lesson-info__name lesson-info__name--even">
				{{ formattedEvenDiscipline.name }}
			</span>

			<span
				v-if="!isEmptyOddCabinets"
				class="lesson-info__cabinet lesson-info__cabinet--odd"
				:class="classOddCabinetObject"
			>
				<template v-if="formattedFirstOddCabinet.name">
					{{ formattedFirstOddCabinet.name }}
				</template>
				<template v-if="formattedSecondOddCabinets.name && !isEmptyEvenCabinets">/</template>
				<template v-if="formattedSecondOddCabinets.name && isEmptyEvenCabinets"><br /></template>
				<template v-if="formattedSecondOddCabinets.name">
					{{ formattedSecondOddCabinets.name }}
				</template>
			</span>

			<span
				v-if="!isEmptyEvenCabinets"
				class="lesson-info__cabinet lesson-info__cabinet--even"
				:class="classEvenCabinetObject"
			>
				<template v-if="formattedFirstEvenCabinet.name">
					{{ formattedFirstEvenCabinet.name }}
				</template>
				<template v-if="formattedSecondEvenCabinets.name && !isEmptyOddCabinets">/</template>
				<template v-if="formattedSecondEvenCabinets.name && isEmptyOddCabinets"><br /></template>
				<template v-if="formattedSecondEvenCabinets.name">
					{{ formattedSecondEvenCabinets.name }}
				</template>
			</span>
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

const getFormattedData = (object: Item) => {
	return {
		id: object.id,
		name: object.name === 'пусто' ? null : object.name === 'нет' ? '—' : object.name,
	};
};

const formattedOddDiscipline = computed(() => getFormattedData(properties.oddDiscipline));
const formattedEvenDiscipline = computed(() => getFormattedData(properties.evenDiscipline));
const formattedFirstEvenCabinet = computed(() => getFormattedData(properties.firstEvenCabinet));
const formattedSecondEvenCabinets = computed(() => getFormattedData(properties.secondEvenCabinet));
const formattedFirstOddCabinet = computed(() => getFormattedData(properties.firstOddCabinet));
const formattedSecondOddCabinets = computed(() => getFormattedData(properties.secondOddCabinet));

const isEmptyOddCabinets = computed(
	() => !formattedFirstOddCabinet.value.name && !formattedSecondOddCabinets.value.name,
);
const isFullOddCabinets = computed(() => formattedFirstOddCabinet.value.name && formattedSecondOddCabinets.value.name);

const isEmptyEvenCabinets = computed(
	() => !formattedFirstEvenCabinet.value.name && !formattedSecondEvenCabinets.value.name,
);
const isFullEvenCabinets = computed(
	() => formattedFirstEvenCabinet.value.name && formattedSecondEvenCabinets.value.name,
);
const classObject = computed(() => ({
	'lesson-info--two-name': properties.evenDiscipline.name !== 'пусто',
	'lesson-info--two-cabinet':
		(properties.firstOddCabinet.name !== 'пусто' || properties.secondOddCabinet.name !== 'пусто') &&
		(properties.firstEvenCabinet.name !== 'пусто' || properties.secondEvenCabinet.name !== 'пусто'),
}));

const classOddCabinetObject = computed(() => ({
	'lesson-info__cabinet--one-two': isEmptyEvenCabinets.value,
	'lesson-info__cabinet--two-two': isFullOddCabinets.value && !isEmptyEvenCabinets.value,
}));
const classEvenCabinetObject = computed(() => ({
	'lesson-info__cabinet--two-two': isFullEvenCabinets.value && !isEmptyOddCabinets.value,
}));

const isOpenTeachers = ref(false);
const isEmptyTeachers = computed(
	() =>
		properties.firsrOddTeacher.name === 'пусто' &&
		properties.secondOddTeacher.name === 'пусто' &&
		properties.firsrEvenTeacher.name === 'пусто' &&
		properties.secondEvenTeacher.name === 'пусто',
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const button: any = ref(null);

const blurHandler = () => {
	if (isOpenTeachers.value && !isEmptyTeachers.value) {
		button.value.focus();
	}
};
</script>

<style>
.day-card__lesson {
	position: relative;
}

.lesson-info {
	position: relative;

	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1.2ch 1fr 5.5ch;

	width: 100%;
	height: 3em;
	margin: 0;
	padding: 0 0.5em;

	color: var(--lesson-color);
	color: inherit;
	font-size: inherit;
	font-family: inherit;
	line-height: 1;
	letter-spacing: -0.01em;
	column-gap: 0.3em;

	border: 0;

	background-color: transparent;

	cursor: pointer;

	user-select: none;
}

.lesson-info:focus {
	outline: none;
}

.lesson-info:focus-visible::before {
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

.day-card__lesson:last-child .lesson-info {
	border-bottom-right-radius: 2px 8px;
	border-bottom-left-radius: 2px 8px;
}

.day-card__lesson:nth-child(odd) .lesson-info {
	background-color: var(--lesson-background);
}

.lesson-info__number {
	grid-row: 1 / 3;
	grid-column: 1 / 2;

	justify-self: center;
	align-self: center;

	font-weight: 600;

	user-select: none;
}

.lesson-info__name {
	grid-row: 1 / 3;
	grid-column: 2 / 3;

	justify-self: flex-start;
	align-self: center;

	width: 100%;
	max-height: 3rem;
	padding: 0 0.1em;

	text-align: initial;
	text-overflow: ellipsis;

	overflow: hidden;
}

.lesson-info__name--even {
	grid-row: 2 / 3;

	color: var(--lesson-odd-color);

	background-color: var(--lesson-odd-background);
}

.lesson-info--two-name .lesson-info__name--odd,
.lesson-info--two-name .lesson-info__name--even {
	height: 100%;

	line-height: 1.5em;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.lesson-info--two-name .lesson-info__name--odd {
	grid-row: 1 / 2;
}

.lesson-info__cabinet {
	grid-row: 1 / 3;
	grid-column: 3 / 4;

	justify-self: flex-end;
	align-self: center;

	line-height: 1.2;
	text-align: end;
}

.lesson-info__cabinet--two-two {
	font-size: 0.85em;
}

.lesson-info--two-cabinet .lesson-info__cabinet--odd {
	grid-row: 1 / 2;
	grid-column: 3 / 4;
}

.lesson-info--two-cabinet .lesson-info__cabinet--even {
	grid-row: 2 / 3;
	grid-column: 3 / 4;
}

.lesson-info__cabinet--one-two {
	grid-row: 1 / 3;

	line-height: 1.3;
}
</style>
