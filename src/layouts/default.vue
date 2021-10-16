<template>
	<div id="default">
		<TheHeader />
		<TheMain>
			<router-view />
		</TheMain>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
router.push('/work');
</script>

<style>
#default {
	--max-width: 1520px;

	display: grid;
	grid-template-rows: max-content 1fr max-content;
	grid-template-columns: 1fr;

	min-height: 100vh;

	color: var(--page-color);
	font-family: Graphik, Arial, Helvetica, sans-serif;
	line-height: 1.2;

	background-color: var(--page-background);
}
</style>
