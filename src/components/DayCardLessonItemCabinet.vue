<template>
	<div class="lesson-cabinets" :class="classCabinetObject">
		<span
			v-if="!isEmptyOddCabinets"
			class="lesson-cabinets__line lesson-cabinets__line--odd"
			:class="classOddCabinetObject"
		>
			<span v-if="formattedFirstOddCabinet.name" class="lesson-cabinets__cabiten">
				{{ formattedFirstOddCabinet.name }}
			</span>
			<span v-if="formattedSecondOddCabinets.name && !isEmptyEvenCabinets" class="lesson-cabinets__separator">/</span>
			<span v-if="formattedSecondOddCabinets.name" class="lesson-cabinets__cabiten">
				{{ formattedSecondOddCabinets.name }}
			</span>
		</span>

		<span
			v-if="!isEmptyEvenCabinets"
			class="lesson-cabinets__line lesson-cabinets__line--even"
			:class="classEvenCabinetObject"
		>
			<span v-if="formattedFirstEvenCabinet.name" class="lesson-cabinets__cabiten">
				{{ formattedFirstEvenCabinet.name }}
			</span>
			<span v-if="formattedSecondEvenCabinets.name" class="lesson-cabinets__separator">/</span>
			<span v-if="formattedSecondEvenCabinets.name" class="lesson-cabinets__cabiten">
				{{ formattedSecondEvenCabinets.name }}
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Item from '~/types/Item';

const properties = defineProps({
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
});

const getFormattedData = (object: Item) => {
	return {
		id: object.id,
		name: object.name === 'пусто' ? null : object.name === 'нет' ? '——' : object.name,
	};
};

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
const classCabinetObject = computed(() => ({
	'lesson-cabinets--two':
		(properties.firstOddCabinet.name !== 'пусто' || properties.secondOddCabinet.name !== 'пусто') &&
		(properties.firstEvenCabinet.name !== 'пусто' || properties.secondEvenCabinet.name !== 'пусто'),
}));

const classOddCabinetObject = computed(() => ({
	'lesson-cabinets__line--two': isFullOddCabinets.value,
}));
const classEvenCabinetObject = computed(() => ({
	'lesson-cabinets__line--two': isFullEvenCabinets.value,
}));
</script>

<style>
.lesson-cabinets {
	display: grid;
	grid-auto-rows: 1fr;
	grid-template-rows: 1fr;
	justify-items: flex-end;
}

.lesson-cabinets--two {
	grid-template-rows: 1fr 1fr;
}

.lesson-cabinets__line {
	display: grid;
	align-items: center;

	font-family: 'JetBrains Mono', monospace;
	line-height: 1;
	text-align: end;
}

.lesson-cabinets__line--even {
	grid-row: 2 / 3;
}

.lesson-cabinets:not(.lesson-cabinets--two) .lesson-cabinets__line--even.lesson-cabinets__line--two,
.lesson-cabinets--two .lesson-cabinets__line--two {
	grid-template-columns: 3ch 1ch 3ch;
	justify-items: center;

	font-size: 0.85rem;
}
</style>
