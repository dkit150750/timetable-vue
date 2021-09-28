<template>
	<header class="header">
		<div class="header__top">
			<h1 class="header__title">Расписание <span class="header__title-span">занятий</span></h1>
			<TheHeaderThemeButton />
		</div>

		<nav class="nav header__nav">
			<ul class="nav__list">
				<li class="nav__item">
					<router-link class="nav__link" :class="{ 'nav__link--active': courseValue === '1' }" to="/courses/1"
						>1 курс</router-link
					>
				</li>
				<li class="nav__item">
					<router-link class="nav__link" :class="{ 'nav__link--active': courseValue === '2' }" to="/courses/2"
						>2 курс</router-link
					>
				</li>
				<li class="nav__item">
					<router-link class="nav__link" :class="{ 'nav__link--active': courseValue === '3' }" to="/courses/3"
						>3 курс</router-link
					>
				</li>
				<li class="nav__item">
					<router-link class="nav__link" :class="{ 'nav__link--active': courseValue === '4' }" to="/courses/4"
						>4 курс</router-link
					>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup lang="ts">
const route = useRoute();
const courseValue = ref(route.params.course || '1');

watch(
	() => route.params.course,
	(course, previousCourse) => {
		if (course !== previousCourse) {
			courseValue.value = course;
		}
	},
);
</script>

<style>
.header {
	display: grid;
	grid-template-columns: 1fr;
	gap: 2em;

	padding: 2em 0;
}

.header__top {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;
}

@media screen and (min-width: 340px) {
	.header__top {
		padding: 0 1.5em;
	}
}

@media screen and (min-width: 440px) {
	.header__top {
		padding: 0 2em;
	}
}

.header__title {
	margin: 0;

	font-weight: 600;
	font-size: 1.9em;
	line-height: 1;

	user-select: none;
}

@media screen and (min-width: 640px) {
	.header__title {
		font-size: 3em;
	}
}

@media screen and (max-width: 419px) {
	.header__title-span {
		display: none;
	}
}

.header__nav {
	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;
}

@media screen and (min-width: 340px) {
	.header__nav {
		padding: 0 1.5em;
	}
}

@media screen and (min-width: 440px) {
	.header__nav {
		padding: 0 2em;
	}
}

.nav__list {
	display: flex;
	gap: 0.9em;
	justify-content: flex-end;

	margin: 0;
	padding: 0;

	list-style: none;
}

.nav__link {
	position: relative;

	display: block;

	padding: 0.4em 0.2em;

	color: inherit;
	font-size: 1.1em;
	white-space: nowrap;
	text-decoration: none;

	outline: none;

	user-select: none;
}

@media screen and (min-width: 360px) {
	.nav__link {
		font-size: 1.2em;
	}
}

.nav__link:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.nav__link--active::before {
	position: absolute;
	left: 0;
	bottom: 0;
	content: '';

	width: 100%;
	height: 0.13rem;

	background-color: currentColor;
}
</style>
