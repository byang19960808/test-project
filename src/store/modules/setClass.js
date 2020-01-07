import { getAllClassRoom, addClassRoom, deleteClassRoom, getIfClassRoom} from'../../api/setClass'

const state = {
    AllClassRoom:[], //全部教室数据
    classList:[]
}

const mutations = {
    setAllClassRoom (state, palody) {
        // 全部教室
        state.AllClassRoom = palody
    },
    setclassList (state, palody) {
        state.classList = palody
    }
}

const actions = {
    async addClassRoom({commit}, palody){
        console.log(commit)
        //  添加教室
        await addClassRoom(palody)
    },
    async getAllClassRoom({commit}){
        // 获取全部教室
        let res = await getAllClassRoom()
        console.log(res.data.code);
        if(res.data.code === 1){
            commit("setAllClassRoom", res.data.data)
        }
    },
    async deleteClassRoom({commit}, palody){
        console.log(commit, palody)
        await deleteClassRoom(palody)
    },
    async getIfClassRoom({commit}){
        let res = await getIfClassRoom()
        console.log(res.data.data);
        commit("setclassList", res.data.data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
