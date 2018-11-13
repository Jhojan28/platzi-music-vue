<template>
  	<main>
		<transition name="move">
			<pm-notification v-show="showNotification">
				<p slot="body">No se encontraron resultados</p>
			</pm-notification>
		</transition>
		
		<transition name="move">
			<pm-loader v-show="isLoading"></pm-loader>
		</transition>
		<section class="section" v-show="!isLoading">
			<nav class="nav had-shadow">
				<div class="container">
				    <input type="text" class="input is-large" placeholder="Buscar canciones" v-model="searchQuery" @keyup.enter="search">
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
						<pm-track :class="{ 'is-active': t.id == selectedTrack }" v-blur="t.preview_url" :track="t"  @select="setSelectedTrack"></pm-track>
					</div>
				</div>
			</div>
		</section>
  	</main>
</template>

<script>
import trackService from '@/services/track'

import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
	name: 'app',
	components: { PmTrack, PmLoader, PmNotification },
  	data () {
    	return {
			searchQuery: '',
			tracks: [],
			isLoading: false,
			showNotification: false,
			selectedTrack: ''
    	}
	},
	computed: {
		searchMessage () {
			return `Encontrados ${this.tracks.length}`
		}
	},
	watch: {
		showNotification () {
			if (this.showNotification) {
				setTimeout(() => {
					this.showNotification = false
				}, 3000)
			}
		}
	},
	methods: {
		search () {
			this.isLoading = true
			if (!this.searchQuery) return
			trackService.search(this.searchQuery).then(res => {
				this.showNotification = res.tracks.total === 0
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
	.is-active {
		border: 3px solid #23d160;
	}
</style>
