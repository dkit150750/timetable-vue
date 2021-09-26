<template>
	<button class="theme-button" type="button" :aria-label="label" @click="toggleTheme">
		<span class="theme-button__icon" :class="classObject"></span>
	</button>
</template>

<script setup lang="ts">
const storage = useStorage<string | null>('color-scheme', null);

const label = computed(() =>
	storage.value === 'dark'
		? 'включить светлую тему'
		: storage.value === 'light'
		? 'включить системную тему'
		: 'включить темную тему',
);

const isServer = typeof window === 'undefined';
const darkSchemeMedia = isServer ? { matches: false } : window.matchMedia('(prefers-color-scheme: dark)');

function getSystemScheme() {
	const darkScheme = darkSchemeMedia.matches;
	return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
	return storage.value;
}

const medaiQuery = computed(() => {
	const query = {
		light: '[media*=prefers-color-scheme][media*=light]',
		dark: '[media*=prefers-color-scheme][media*=dark]',
	};
	const systenScheme = getSystemScheme();
	const savedScheme = getSavedScheme();

	if ((systenScheme === 'dark' && savedScheme === 'dark') || (systenScheme === 'light' && savedScheme === 'dark')) {
		query.light = '[media="not all"]';
		query.dark = '[media=all]';
		return query;
	}

	if ((systenScheme === 'light' && savedScheme === 'light') || (systenScheme === 'dark' && savedScheme === 'light')) {
		query.light = '[media=all]';
		query.dark = '[media="not all"]';
		return query;
	}

	return query;
});

let lightMeta: HTMLLinkElement[] = [];
let darkMeta: HTMLLinkElement[] = [];

if (!isServer) {
	// eslint-disable-next-line unicorn/prefer-spread
	lightMeta = Array.from(
		document.head.querySelectorAll(
			`meta[name=theme-color]${medaiQuery.value.light}, link[rel=stylesheet]${medaiQuery.value.light}`,
		),
	);
	// eslint-disable-next-line unicorn/prefer-spread
	darkMeta = Array.from(
		document.head.querySelectorAll(
			`meta[name=theme-color]${medaiQuery.value.dark}, link[rel=stylesheet]${medaiQuery.value.dark}`,
		),
	);
}

const saveScheme = (scheme: string) => {
	storage.value = scheme;
};

const clearScheme = () => {
	storage.value = null;
};

watch(
	() => storage.value,
	(theme) => {
		let lightMedia = '';
		let darkMedia = '';

		if (theme === null) {
			lightMedia = '(prefers-color-scheme: light)';
			darkMedia = '(prefers-color-scheme: dark)';
		} else {
			lightMedia = theme === 'light' ? 'all' : 'not all';
			darkMedia = theme === 'dark' ? 'all' : 'not all';
		}

		[...lightMeta].forEach((meta) => {
			meta.media = lightMedia;
		});

		[...darkMeta].forEach((meta) => {
			meta.media = darkMedia;
		});
	},
);

const setScheme = (scheme: string) => {
	if (scheme === 'auto') {
		clearScheme();
	} else {
		saveScheme(scheme);
	}
};

const toggleTheme = () => {
	switch (storage.value) {
		case 'dark': {
			setScheme('light');
			break;
		}
		case 'light': {
			setScheme('auto');
			break;
		}
		case null: {
			setScheme('dark');
			break;
		}
		default: {
			setScheme('auto');
			break;
		}
	}
};

const classObject = computed(() => ({
	'theme-button__icon--light': storage.value === 'light',
	'theme-button__icon--dark': storage.value === 'dark',
	'theme-button__icon--null': storage.value === null,
}));
</script>

<style>
.theme-button {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 3em;
	height: 3em;
	margin: 0;
	padding: 0;

	color: inherit;
	line-height: 1;

	border: 0;

	background-color: transparent;

	outline: none;

	cursor: pointer;
}

.theme-button:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.theme-button__icon {
	display: block;

	width: 2.2em;
	height: 2.2em;

	background-repeat: no-repeat;
	background-size: contain;
}

.theme-button__icon--null {
	background-image: url('/images/icon-header-1.png');
}

.theme-button__icon--light {
	background-image: url('/images/icon-header-3.png');
}

.theme-button__icon--dark {
	background-image: url('/images/icon-header-2.png');
}

@media screen and (min-width: 640px) {
	.theme-button__icon {
		width: 2.4em;
		height: 2.4em;
	}
}
</style>
