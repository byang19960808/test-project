import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import setClass from './modules/setClass'

export default new Vuex.Store({ modules: {

    setClass

} })
