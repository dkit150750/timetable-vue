<template>
	<div :class="classObject" class="time">
		<span class="time__item">{{ time.first }}</span>
		<span class="time__item">{{ time.second }}</span>
		<span class="time__item">{{ time.third }}</span>
		<span class="time__item">{{ time.fourth }}</span>
		<span class="time__item">{{ time.fifth }}</span>
	</div>
</template>

<script setup lang="ts">
const properties = defineProps({
	isTotal: {
		type: Boolean,
		required: false,
		default: false,
	},
	time: {
		type: Object,
		required: true,
	},
});

const classObject = computed(() => ({
	'time--total': properties.isTotal,
}));
</script>

<style>
.time {
	max-width: 340px;
	padding: 0.4rem 0;

	font-family: 'JetBrains Mono', monospace;

	border-radius: 0.8rem;

	background-color: var(--time-background);

	box-shadow: var(--day-card-shadow);

	overflow: hidden;
}

.time__item {
	display: flex;
	align-items: center;

	height: 3rem;
	padding: 0 1rem;

	user-select: none;
}

.time--total {
	width: 100%;
}

.time--total .time__item {
	height: 2rem;
}
</style>
