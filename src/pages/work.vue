<template>
	<div class="not-work">
		<div class="not-work__container">
			<img class="not-work__image" src="/images/Annoying_Dog-0.gif" alt="" />
			<h1 class="not-work__title">Закрыто</h1>
			<audio ref="audio" autoplay loop class="teleskop-music" src="/audio/Toby Fox - Another Medium.mp3"></audio>
		</div>
	</div>
</template>

<style>
.not-work {
	height: 100%;
	padding: 2rem 0;
}

.not-work__container {
	display: grid;
	gap: 20px;
	justify-items: center;
}

.not-work__title {
	margin: auto;

	font-size: 3rem;
	line-height: 1;

	user-select: none;
}

.not-work__image {
	display: block;

	max-width: 200px;
}
</style>

<route lang="yaml">
meta:
  layout: work
</route>
