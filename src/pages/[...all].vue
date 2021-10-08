<template>
	<div class="not-found">
		<div class="not-found__container">
			<h1 class="not-found__title">404</h1>
			<router-link to="/" class="not-found__home">Главная</router-link>
		</div>
	</div>
</template>

<style>
.not-found {
	height: 100%;
	padding: 2rem 0;
}

.not-found__container {
	display: flex;
	flex-direction: column;

	height: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1rem;
}

.not-found__title {
	margin: auto;

	font-size: 25vmin;
	line-height: 1;

	user-select: none;
}

.not-found__home {
	display: block;

	margin: 0 auto;
	padding: 0.4em 0.7em;

	color: var(--color-gray-100);
	font-size: 1.3rem;
	text-decoration: none;

	border-radius: 0.2em;

	background-color: var(--color-primary-700);

	user-select: none;
}
</style>
