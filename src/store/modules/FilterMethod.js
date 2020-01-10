import {filteRouter} from '../../router/filteRouter';
import {FilMethods} from '../../config/FilMethods';
import Router from '../../router/index';
const state = {
    defaultRouter:[]
}

const mutations = {
    setdefaultRouter(state, arr){
        state.defaultRouter = arr
    }
}

const actions = {
    filterMet({commit}, root){
        console.log(root, filteRouter)
        let defaultRouter = FilMethods(filteRouter, root);
        commit('setdefaultRouter', defaultRouter )
        Router.addRoutes(defaultRouter);
        Router.replace('/main')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
