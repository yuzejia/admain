<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	#app {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	body {
		margin: 0
	}
</style>
