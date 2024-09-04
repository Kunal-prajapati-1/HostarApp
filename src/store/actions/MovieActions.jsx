/* eslint-disable no-unused-vars */
export {removeMovie} from '../reducers/movieSlice'
import axios from '../../Utils/Axios'
import {loadMovie} from '../reducers/movieSlice'

const asyncMovieLoad = (id)=> async(dispatch,getState)=>{
    try{
        const detail = await axios.get(`/movie/${id}`)
        const externalId  = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const video = await axios.get(`/movie/${id}/videos`)
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`)
        
        let ultimateData = {
            detail:detail.data,
            externalId:externalId.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,   
            video:video.data.results.find((v) => v.type === "Trailer"),
            watchProviders:watchProviders.data.results
        }
        dispatch(loadMovie(ultimateData))
    }
    catch(error){
        console.log(error)
    }
}
export default asyncMovieLoad