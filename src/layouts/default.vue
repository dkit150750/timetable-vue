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
router.push('/doggo');
</script>

<style>
#default {
	background-color: black;
}
</style>
