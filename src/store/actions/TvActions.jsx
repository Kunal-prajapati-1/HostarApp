/* eslint-disable no-unused-vars */
export {removeTv} from '../reducers/tvSlice'
import {loadTv} from '../reducers/tvSlice'
import axios from '../../Utils/Axios'

const asyncTvLoad =(id)=>async (dispatch,getState)=>{
    try{
        const detail = await axios.get(`/tv/${id}`)
        const externalId  = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const video = await axios.get(`/tv/${id}/videos`)
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`)

        let ultimateData = {
            detail:detail.data,
            externalId:externalId.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,   
            video:video.data.results.find((v) => v.type === "Trailer"),
            watchProviders:watchProviders.data.results
        }
        dispatch(loadTv(ultimateData))
        // console.log(ultimateData)
    }catch(err){
        console.error(err)
    }
}

export default asyncTvLoad; 