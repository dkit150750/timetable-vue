<template>
	<footer class="footer">
		<div class="footer__container">
			<button class="footer__copy" @click="openSpock" @focus="isOpenSpock = false">
				@teleskop150750 <span class="footer__copy--icon"></span>
			</button>
			<router-link class="footer__teleskop" to="/teleskop" aria-label="личная страница"
				><span class="footer__teleskop--icon"></span
			></router-link>
		</div>
	</footer>

	<div ref="target" class="spock-popup" :class="{ 'spock-popup--open': isOpenSpock }">
		<button class="spock-popup__button-close" aria-label="закрыть окно" @click="closeSpock()">
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

<route>
meta:
  layout: admin
</route>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const isOpenSpock = ref(false);
const target = ref();
const { activate, deactivate } = useFocusTrap(target);

const openSpock = async () => {
	isOpenSpock.value = true;
	activate();
};

const closeSpock = () => {
	isOpenSpock.value = false;
	deactivate();
};
</script>

<style>
.footer {
	padding: 2em 0;
}

.footer__container {
	display: flex;
	justify-content: space-between;
	align-items: center;

	max-width: var(--max-width);
	margin: 0 auto;
	padding: 0 1em;
}

.footer__copy {
	display: flex;
	gap: 1ch;

	margin: 0;
	padding: 0;

	color: inherit;
	font-size: 1.2em;
	font-family: inherit;
	line-height: 1;
	letter-spacing: inherit;

	border: 0;

	background-color: transparent;

	cursor: pointer;
}

.footer__copy:focus {
	outline: none;
}

.footer__copy:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

.footer__copy--icon {
	display: block;

	width: 1em;
	height: 1em;

	background-image: url('/images/icon-footer-1.png');
	background-repeat: no-repeat;
	background-size: contain;
}

.footer__teleskop {
	font-size: 1.2em;
	text-decoration: none;

	user-select: none;
}

.footer__teleskop--icon {
	display: block;

	width: 2.22em;
	height: 1em;

	background-image: url('/images/icon-footer-2.png');
	background-repeat: no-repeat;
	background-size: contain;
}

.footer__teleskop:focus {
	outline: none;
}

.footer__teleskop:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}

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

	opacity: 0;

	pointer-events: none;
}

.spock-popup--open {
	opacity: 1;

	pointer-events: all;
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
