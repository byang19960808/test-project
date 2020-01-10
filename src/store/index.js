import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import setClass from './modules/setClass';
import addExam from './modules/addExam'
import Correction from "./modules/Correction";
import Check from "./modules/Check";

export default new Vuex.Store({ modules: {

    setClass,
    addExam,
    Correction,
    Check

} })
