<template>
	<footer class="footer">
		<div class="footer__container">
			<button class="footer__copy" @click="openHandler">
				@teleskop150750 <span class="footer__copy--icon"></span>
			</button>
			<router-link class="footer__teleskop" to="/teleskop"><span class="footer__teleskop--icon"></span></router-link>
		</div>
	</footer>

	<div ref="target" class="spock-popup-wrapper">
		<TheFooterPopup v-show="isOpenSpock" v-model="isOpenSpock" @closing="closingdHandler" />
	</div>
</template>

<route>
meta:
  layout: admin
</route>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const emit = defineEmits({
	openingPopup: null,
	closingPopup: null,
});

const isOpenSpock = ref(false);

const target = ref();
const { activate, deactivate } = useFocusTrap(target);

const openHandler = async () => {
	isOpenSpock.value = true;
	emit('openingPopup');
	await nextTick();
	activate();
};

const closingdHandler = () => {
	deactivate();
	emit('closingPopup');
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

.spock-popup-wrapper {
	position: absolute;
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

.footer__teleskop:focus-visible {
	box-shadow: 0 0 0 2px var(--focus-visible-shadow);
}
</style>
