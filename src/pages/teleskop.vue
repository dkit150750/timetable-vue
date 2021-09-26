<template>
	<div class="teleskop-content">
		<img class="teleskop-image" src="/images/undertale.jpg" alt="" />
		<p class="teleskop-text">27.12.21г. ...</p>
		<audio ref="audio" autoplay loop class="teleskop-music" src="/audio/undertale_001. Once Upon a Time.mp3"></audio>
	</div>
</template>

<style>
.teleskop-content {
	margin: auto;
}

.teleskop-image {
	display: block;

	max-width: 100%;
}

@media (orientation: landscape) {
	.teleskop-image {
		max-width: 900px;
	}
}

.teleskop-text {
	font-weight: 900;
	font-family: monospace;
}
</style>

<route lang="yaml">
meta:
  layout: teleskop
</route>
