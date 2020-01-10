
import http from '../../util/axiosAgain';


export default {
    namespaced: true,
    state: {
        approval:[], //待批班级,
        pageList:[],
        list:[], // 数据
        achievement:[], //批卷
        pageSize:10, //显示几条
        currentPage:1, // 当前页
        total:null, // 总数
        grade_id:"", // 班级id
        Classroom:[], //批卷
        MarkingData:[]
    },
    mutations: {
        gitList(state, pal){ //待批班级
            state.approval = pal
            state.pageList = pal
            state.total = pal.length // 总数
            let start = ((state.currentPage - 1) * state.pageSize);
            state.list = state.pageList.slice(start, state.pageSize);
        },
        getPage(state, pal){
            state.pageSize = pal.pagesize//显示几条 
            state.currentPage = pal.currentpage // 当前页
            let start = ((state.currentPage - 1) * state.pageSize); // 开始
            let end = state.pageSize * state.currentPage // 结束
            state.list = state.pageList.slice(start, end);
        },
        getAchievement(state, pal){
            state.achievement = pal
        },
        getClassroom(state, pal){
            state.Classroom = pal

        },
        // MarkingList(state, pal){

        // }
    },
    actions: {
        getManger(context){//待批班级请求接口
            http.get("/manger/grade").then(res=>{
                context.commit("gitList", res.data.data)
            })
        },
        getAchieve(context, pal){ //获取班级
            http.get("/exam/student", {grade_id:pal}).then(res=>{
                context.commit("getAchievement", res.data.exam)
            })
        },
        gitStudent(context, pal){ // 批卷
            http.get(`/exam/student/${pal}`).then(res=>{
                context.commit("getClassroom", res.data.data)
            })
        },
        getMarking(context, pal){
            console.log(pal)
            http.put("/exam/student/t27znv-gu7azm-qpq9ai-laaf9m", {score:pal}).then(res=>{
                // context.commit("getClassroom", res.data.data)
                console.log(context, res.data, pal)
            })
        }


    }
}
