import axios from '../../util/axiosAgain.js'


const state = {

}

const mutations = {
 
}

const actions = {
    async userInfo({dispatch}){
        let userinfo = await axios.get('/user/userInfo').then(res=>{
            return res.data.data.identity_text
        })
        dispatch('FilterMethod/filterMet', userinfo, {root:true})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
