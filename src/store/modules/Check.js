
import http from '../../util/axiosAgain';
export default {
    namespaced: true,
    state: {
        data:[],
        questionsList:[]
    },
    mutations: {
        gitData(state, pal){
            state.data = pal
        },
        getList(state, pal){
            state.questionsList = pal
        }
    },
    actions: {
        gitCheck(context){
            http.get("/exam/questions/new").then(res=>{
                context.commit("gitData", res.data.data)
            })
        },
        getQuestions(context, pal){
            http.get('/exam/questions/condition?', {questions_id:pal}).then(res=>{
                context.commit("getList", res.data.data[0])
            })
        }
    },

}
