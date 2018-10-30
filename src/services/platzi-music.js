import trae from 'trae'
import config from './config'

const platziMusicService = trae.create({
	baseUrl: config.apiUrl
})

export default platziMusicService
