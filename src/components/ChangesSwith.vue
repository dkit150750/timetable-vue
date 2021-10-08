<template>
	<label class="changes-swith">
		<input
			class="changes-swith__input"
			type="checkbox"
			role="switch"
			:value="modelValue"
			@change="$emit('update:modelValue', !properties.modelValue)"
		/>
		<span class="changes-swith__label">Изменения</span>
	</label>
</template>

<script setup lang="ts">
defineEmits({
	'update:modelValue': null,
});

const properties = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
});
</script>

<style>
.changes-swith {
	--thumb-size: 1rem;
	--track-size: calc(var(--thumb-size) * 2);
	--track-padding: 2px;
	--thumb-color: var(--thumb);
	--thumb-color-highlight: var(--thumb-highlight);
	--track-color-inactive: var(--track-inactive);
	--track-color-active: var(--track-active);
	--isLTR: 1;

	display: flex;
	gap: 1ch;
	justify-content: space-between;
	align-items: center;

	cursor: pointer;

	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
}

.changes-swith:dir(rtl) {
	--isLTR: -1;
}

.changes-swith.-vertical {
	min-block-size: calc(var(--track-size) + calc(var(--track-padding) * 2));
}

.changes-swith > .changes-swith__input {
	--thumb-position: 0%;
	--thumb-transition-duration: 0.25s;

	display: grid;
	flex-shrink: 0;
	grid: [track] 1fr / [track] 1fr;
	align-items: center;

	padding: var(--track-padding);
	box-sizing: content-box;

	border: none;
	border-radius: var(--track-size);

	background: var(--track-color-inactive);

	outline: none;
	outline-offset: 5px;

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	pointer-events: none;
	touch-action: pan-y;

	transition: background-color 0.25s ease;
	inline-size: var(--track-size);
	block-size: var(--thumb-size);
}

.changes-swith.-vertical > .changes-swith__input {
	transform: rotate(calc(90deg * var(--isLTR) * -1));

	touch-action: pan-x;
}

.changes-swith > .changes-swith__input::before {
	--highlight-size: 0;

	grid-area: track;

	content: '';

	border-radius: 50%;

	background: var(--thumb-color);

	box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);

	cursor: pointer;

	transform: translateX(var(--thumb-position));

	pointer-events: auto;
	inline-size: var(--thumb-size);
	block-size: var(--thumb-size);
}

@media (prefers-reduced-motion: no-preference) {
	.changes-swith > .changes-swith__input::before {
		transition: transform var(--thumb-transition-duration) ease, box-shadow 0.25s ease;
	}
}

.changes-swith > .changes-swith__input:disabled::before {
	box-shadow: inset 0 0 0 2px var(--thumb-shadow);

	cursor: not-allowed;
}

.changes-swith > .changes-swith__input:not(:disabled):focus-visible::before,
.changes-swith > .changes-swith__input:not(:disabled):hover::before {
	--highlight-size: 0.5rem;
}

.changes-swith > .changes-swith__input:checked {
	--thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));

	background: var(--track-color-active);
}

.changes-swith > .changes-swith__input:indeterminate {
	--thumb-position: calc(calc(calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2)) * var(--isLTR));
}

.changes-swith > .changes-swith__input:disabled {
	--thumb-color: transparent;

	cursor: not-allowed;
}

.changes-swith__label {
	font-weight: 500;
	font-size: 1.2rem;
}
</style>
