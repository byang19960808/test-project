import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import setClass from './modules/setClass';
<<<<<<< HEAD
import addExam from './modules/addExam';
=======
import addExam from './modules/addExam'
import Correction from "./modules/Correction";
import Check from "./modules/Check";
>>>>>>> 69bcc988605a76586b79e7803f913e2c4507a6b7
import FliRoute from './modules/FliRoute';
import FilterMethod from './modules/FilterMethod'

export default new Vuex.Store({ modules: {

    setClass,
    addExam,
<<<<<<< HEAD
    FliRoute,
    FilterMethod
=======
    Correction,
    Check,
    FliRoute,
    FilterMethod

>>>>>>> 69bcc988605a76586b79e7803f913e2c4507a6b7
} })
