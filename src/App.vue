<template>
  	<div id="app">
		<pm-header></pm-header>
		<router-view></router-view>		
		<pm-footer></pm-footer>
  	</div>
</template>

<script>
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'
export default {
	name: 'app',
	components: { PmHeader, PmFooter }
}
</script>

<style lang="scss">
	@import './scss/main.scss';

	.is-active {
		border: 3px solid #23d160;
	}

</style>
