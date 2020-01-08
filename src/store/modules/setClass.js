import { getAllClassRoom, addClassRoom, deleteClassRoom, getIfClassRoom, deleteClass} from'../../api/setClass'

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
    async deleteClass({commit}, palody){
        console.log(commit)
        // 删除班级
        await deleteClass(palody)
    },
    async getAllClassRoom({commit}){
        // 获取全部教室
        let res = await getAllClassRoom()
        if(res.data.code === 1){
            commit("setAllClassRoom", res.data.data)
        }
    },
    async deleteClassRoom({commit}, palody){
        //删除教室
        console.log(commit, 1111)
        await deleteClassRoom(palody)
        
    },
    async getIfClassRoom({commit}){
        let res = await getIfClassRoom()
        let num = 0
        console.log(res.data.data, num++);
        commit("setclassList", res.data.data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
