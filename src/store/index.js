import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import setClass from './modules/setClass';
import addExam from './modules/addExam';
import FliRoute from './modules/FliRoute';
import FilterMethod from './modules/FilterMethod'

export default new Vuex.Store({ modules: {

    setClass,
    addExam,
    FliRoute,
    FilterMethod
} })
