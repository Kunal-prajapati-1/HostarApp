/* eslint-disable no-unused-vars */
export {removePerson} from '../reducers/personSlice'
import axios from '../../Utils/Axios'
import {loadPerson} from '../reducers/personSlice'

const asyncPersonLoad = (id)=> async(dispatch,getState)=>{
    try{
        const detail = await axios.get(`/person/${id}`)
        const externalId  = await axios.get(`/person/${id}/external_ids`)
        const combined_credits  = await axios.get(`/person/${id}/combined_credits`)
        const tv_credits  = await axios.get(`/person/${id}/tv_credits`)
        const movie_credits  = await axios.get(`/person/${id}/movie_credits`)
        
        let ultimateData = {
            detail:detail.data,
            externalId:externalId.data,
            combined_credits:combined_credits.data,
            tv_credits:tv_credits.data,
            movie_credits:movie_credits.data
        }
        dispatch(loadPerson(ultimateData))
    }
    catch(error){
        console.log(error)
    }
}
export default asyncPersonLoad