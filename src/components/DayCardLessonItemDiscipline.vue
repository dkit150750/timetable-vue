<template>
	<div class="lesson-disciplines" :class="classLessonObject">
		<span
			v-if="oddDiscipline.name !== 'пусто'"
			class="lesson-disciplines__discipline lesson-disciplines__discipline--odd"
		>
			{{ formattedOddDiscipline.name }}
		</span>
		<span
			v-if="evenDiscipline.name !== 'пусто'"
			class="lesson-disciplines__discipline lesson-disciplines__discipline--even"
		>
			{{ formattedEvenDiscipline.name }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Item from '~/types/Item';

const properties = defineProps({
	oddDiscipline: {
		type: Object as PropType<Item>,
		required: true,
	},
	evenDiscipline: {
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

const formattedOddDiscipline = computed(() => getFormattedData(properties.oddDiscipline));
const formattedEvenDiscipline = computed(() => getFormattedData(properties.evenDiscipline));

const classLessonObject = computed(() => ({
	'lesson-disciplines--two': properties.evenDiscipline.name !== 'пусто',
}));
</script>

<style>
.lesson-disciplines {
	display: grid;
	justify-self: flex-start;
	align-items: center;

	width: 100%;
}

.lesson-disciplines--two {
	grid-template-rows: 1fr 1fr;
}

.lesson-disciplines__discipline {
	justify-self: flex-start;
	align-self: center;

	width: 100%;
	max-height: 3rem;
	padding: 0 0.2rem;

	text-align: initial;
	text-overflow: ellipsis;

	overflow: hidden;
}

.lesson-disciplines__discipline--even {
	grid-row: 2 / 3;

	color: var(--lesson-odd-color);

	border-radius: 3px;

	background-color: var(--lesson-odd-background);
}

.lesson-disciplines__discipline--odd {
	grid-row: 1 / 2;
}

.lesson-disciplines--two .lesson-disciplines__discipline--odd,
.lesson-disciplines--two .lesson-disciplines__discipline--even {
	height: 100%;

	line-height: 1.5;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
