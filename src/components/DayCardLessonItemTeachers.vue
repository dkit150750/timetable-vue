<template>
	<div class="lesson-teachers" @click.self="$emit('update:modelValue', false)">
		<div class="lesson-teachers__inner">
			<div v-if="!isEmptyOdd" class="lesson-teachers__line">
				<span v-if="formattedFirstOddTeachers?.name" class="lesson-teachers__name">
					{{ formattedFirstOddTeachers.name }}
				</span>
				<span v-if="formattedSecondOddTeachers?.name" class="lesson-teachers__name">
					{{ formattedSecondOddTeachers.name }}
				</span>
			</div>
			<div v-if="!isEmptyEven" class="lesson-teachers__line">
				<span v-if="formattedFirstEvenTeachers?.name" class="lesson-teachers__name">
					{{ formattedFirstEvenTeachers.name }}
				</span>
				<span v-if="formattedSecondEvenTeachers?.name" class="lesson-teachers__name">
					{{ formattedSecondEvenTeachers.name }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

interface Item {
	id: number;
	name: string;
}

defineEmits({
	'update:modelValue': null,
});

const properties = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
	firsrEvenTeacher: {
		type: Object as PropType<Item>,
		default: () => ({ id: 1, name: 'пусто' }),
		required: false,
	},
	secondEvenTeacher: {
		type: Object as PropType<Item>,
		default: () => ({ id: 1, name: 'пусто' }),
		required: false,
	},
	firsrOddTeacher: {
		type: Object as PropType<Item>,
		default: () => ({ id: 1, name: 'пусто' }),
		required: false,
	},
	secondOddTeacher: {
		type: Object as PropType<Item>,
		default: () => ({ id: 1, name: 'пусто' }),
		required: false,
	},
});

const getFormattedTeachers = (object: Item) => ({
	id: object.id,
	name: object.name === 'пусто' ? null : object.name === 'нет' ? '—' : object.name,
});

const formattedFirstEvenTeachers = computed(() => getFormattedTeachers(properties.firsrEvenTeacher));
const formattedSecondEvenTeachers = computed(() => getFormattedTeachers(properties.secondEvenTeacher));
const formattedFirstOddTeachers = computed(() => getFormattedTeachers(properties.firsrOddTeacher));
const formattedSecondOddTeachers = computed(() => getFormattedTeachers(properties.secondOddTeacher));

const isEmptyEven = computed(() => !formattedFirstEvenTeachers.value.name && !formattedSecondEvenTeachers.value.name);
const isEmptyOdd = computed(() => !formattedFirstOddTeachers.value.name && !formattedSecondOddTeachers.value.name);
</script>

<style>
.lesson-teachers {
	position: absolute;
	top: calc(100% + 0.4rem);
	left: 1rem;
	z-index: 100;

	width: 90%;

	border-radius: 0.4rem;

	background-color: var(--teachers-background);

	box-shadow: var(--teachers-shadow);
}

.teachers-tooltip-enter-active {
	transition: all 0.1s ease-in;
}

.teachers-tooltip-leave-active {
	transition: all 0.15s ease-out;
}

.teachers-tooltip-enter-from,
.teachers-tooltip-leave-to {
	opacity: 0;
	transform: translateY(5px);
}

.lesson-teachers::before {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	content: '';
	z-index: -1;
}

.lesson-teachers__inner {
	display: grid;
	grid-auto-rows: 1.4rem;
	align-items: center;

	padding: 0.4rem 0;
}

.lesson-teachers__line {
	position: relative;

	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	gap: 1rem;

	margin: 0;
	padding: 0 0.6rem;
}

.lesson-teachers__name {
	user-select: none;
}

.lesson-teachers__line .lesson-teachers__name:nth-child(2)::before {
	position: absolute;
	top: 50%;
	left: 50%;
	content: '';

	display: block;

	width: 2px;
	height: 1rem;

	border-radius: 1rem;

	background-color: currentColor;

	transform: translate(-50%, -50%);
}
</style>
