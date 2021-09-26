<template>
	<div class="spock-popup">
		<button class="spock-popup__button-close" aria-label="закрыть окно" @click="clickHandler()">
			<carbon-close />
		</button>
		<div class="spock-popup__inner">
			<div class="spock-popup__img-wrapper">
				<div class="spock-popup__img-inner">
					<img class="spock-popup__img" src="@/spock-shadow.webp" alt="Спок" />
				</div>
			</div>
			<p class="spock-popup__text">Живи долго и процветай</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits({
	'update:modelValue': null,
	closing: null,
});

defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
});

const clickHandler = () => {
	emit('update:modelValue', false);
	emit('closing');
};
</script>

<style>
.spock-popup {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 20;

	display: flex;

	background-color: var(--spock-background-color);

	backdrop-filter: blur(10px);
}

.spock-popup__button-close {
	position: absolute;
	top: 1rem;
	right: 1rem;

	width: 40px;
	height: 40px;
	padding: 0;

	color: inherit;
	font-size: 2rem;

	border: 0;

	background-color: transparent;

	cursor: pointer;
}

.spock-popup__button-close:focus {
	outline: none;
}

.spock-popup__button-close:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.spock-popup__inner {
	margin: auto;
	padding: 1rem;
}

.spock-popup__img-wrapper {
	max-width: 400px;
	margin: 0 auto;
}

.spock-popup__img-inner {
	position: relative;

	padding-bottom: 100%;
}

.spock-popup__img {
	position: absolute;
	top: 0;
	left: 0;

	display: block;

	width: 100%;
	height: 100%;

	object-fit: cover;
}
.spock-popup__text {
	font-weight: 700;
	font-size: 2em;
	text-align: center;
}
</style>
