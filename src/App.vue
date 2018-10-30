<template>
  	<div id="app">
		<pm-header></pm-header>
		<pm-loader v-show="isLoading"></pm-loader>
		<section class="section" v-show="!isLoading">
			<nav class="nav had-shadow">
				<div class="container">
				    <input type="text" class="input is-large" placeholder="Buscar canciones" v-model="searchQuery">
					<a class="button is-info is-large" @click="search">Buscar</a>
					<a class="button is-danger is-large">&times;</a>
				</div>
			</nav>
			<div class="container">
				<p><small>{{ searchMessage }}</small></p>
			</div>
			<div class="container results">
				<div class="columns is-multiline">
					<div class="column is-one-quarter" :key="key" v-for="(t, key) in tracks">
						<pm-track :class="{ 'is-active': t.id == selectedTrack }" :track="t"  @select="setSelectedTrack"></pm-track>
					</div>
				</div>
			</div>
		</section>
		<pm-footer></pm-footer>
  	</div>
</template>

<script>
import trackService from '@/services/track'
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'

export default {
	name: 'app',
	components: { PmHeader, PmFooter, PmTrack, PmLoader },
  	data () {
    	return {
			searchQuery: '',
			tracks: [],
			isLoading: false,
			selectedTrack: ''
    	}
	},
	computed: {
		searchMessage () {
			return `Encontrados ${this.tracks.length}`
		}
	},
	methods: {
		search () {
			this.isLoading = true
			if (!this.searchQuery) return
			trackService.search(this.searchQuery).then(res => {
				this.tracks = res.tracks.items
				this.isLoading = false
			})
		},
		setSelectedTrack (id) {
			this.selectedTrack = id
		}
	}
}
</script>

<style lang="scss">
	@import './scss/main.scss';

	.is-active {
		border: 3px solid #23d160;
	}

</style>
