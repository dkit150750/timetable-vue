<template>
	<div class="group-selection">
		<button class="group-selection__button" type="button" @click="openHandler()" @focus="isOpenDropdownMenu = false">
			<span class="group-selection__group-name">{{ groupSelected.name }}</span>
			<svg
				class="group-selection__button-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
				/>
			</svg>
		</button>
		<div v-if="groups.length > 1" ref="target" class="groups-dropdown-menu-wrapper">
			<div
				class="groups-dropdown-menu-overlay"
				:class="{ 'groups-dropdown-menu-overlay--open': isOpenDropdownMenu }"
				@click="closeHandler"
			></div>
			<div
				v-if="groups.length > 1"
				class="groups-dropdown-menu"
				:class="{ 'groups-dropdown-menu--open': isOpenDropdownMenu }"
			>
				<div class="groups-dropdown-menu__inner">
					<ul class="group-dropdown-menu__list">
						<li v-for="group in groups" :key="group.id" class="groups-dropdown-menu__item">
							<router-link
								class="groups-dropdown-menu__link"
								:to="`/courses/${group.course}/groups/${group.slug}`"
								:tabindex="isOpenDropdownMenu ? 1 : -1"
								@click="closeHandler"
								>{{ group.name }}</router-link
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import GroupInfo from '~/types/GroupInfo';

const properties = defineProps({
	slug: {
		type: String,
		required: false,
		default: '',
	},
	groups: {
		type: Array as PropType<GroupInfo[]>,
		required: true,
	},
});

const groupSelected = computed(() => {
	if (properties.slug !== '') {
		return properties.groups.find((item) => item.slug === properties.slug) || { id: 0, name: '', slug: '', course: 0 };
	}
	return properties.groups[0];
});

const target = ref();
const { activate, deactivate } = useFocusTrap(target);

const isOpenDropdownMenu = ref(false);

const openHandler = async () => {
	if (properties.groups.length <= 1) return;
	isOpenDropdownMenu.value = !isOpenDropdownMenu.value;
	await nextTick();
	activate();
};
const closeHandler = () => {
	isOpenDropdownMenu.value = false;
	deactivate();
};
</script>

<style>
.group-selection {
	position: relative;
	z-index: 10;

	font-size: 1.3rem;
	font-family: 'JetBrains Mono', monospace;
}

@media (min-width: 360px) {
	.group-selection {
		font-size: 1.5rem;
	}
}

.group-selection__button {
	display: grid;
	grid-template-columns: max-content min-content;
	gap: 0 0.3em;
	align-items: center;

	margin: 0;
	padding: 0;

	color: inherit;
	font-size: inherit;
	font-family: inherit;
	line-height: 1;

	border: 0;

	background-color: transparent;

	outline: none;

	cursor: pointer;

	user-select: none;
}

.group-selection__button:focus {
	outline: none;
}

.group-selection__button:focus-visible {
	box-shadow: var(--group-selection-shadow);
}

.group-selection__group-name {
	min-width: 72px;
}

.group-selection__button-icon {
	display: block;

	width: 13px;
	height: 13px;
}

.groups-dropdown-menu-overlay {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	content: '';
	z-index: 5;

	pointer-events: none;
}

.groups-dropdown-menu-overlay--open {
	pointer-events: all;
}

.groups-dropdown-menu {
	position: absolute;
	top: calc(100% + 0.5rem);
	left: -0.4rem;
	z-index: 10;

	border-radius: 0.4rem;

	background-color: var(--groups-dropdown-menu-background);

	box-shadow: var(--groups-dropdown-menu-shadow);

	opacity: 0;
	transform: translateY(5px);

	pointer-events: none;

	transition: all 0.15s ease-out;
}

.groups-dropdown-menu--open {
	opacity: 1;
	transform: translateY(0);

	pointer-events: all;
}

.groups-dropdown-menu__inner {
	padding: 0.2em 0;
}

.group-dropdown-menu__list {
	margin: 0;
	padding: 0;

	list-style: none;
}

.groups-dropdown-menu__link {
	display: block;

	padding: 0.25em 0.4em;

	color: inherit;
	line-height: 1;
	white-space: nowrap;
	text-decoration: none;

	outline: none;

	user-select: none;
}

.groups-dropdown-menu__link:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}
</style>
